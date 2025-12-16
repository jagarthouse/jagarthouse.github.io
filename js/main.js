document.addEventListener('DOMContentLoaded', function() {
    const films = [
        {
            title: 'NORTH VALLEY',
            thumbnail: 'videos/film1.png', // Using a static image for thumbnail
            src: 'videos/film1.gif'
        },
        {
            title: 'POSTCARDS OF SF',
            thumbnail: 'videos/film2.png', // Using a static image for thumbnail
            src: 'videos/film2.gif'
        },
        {
            title: 'Coming Soon™',
            thumbnail: 'videos/comingsoon.jpg',
            src: 'videos/comingsoon.jpg',
            isComingSoon: true
        }
    ];

    const filmsContainer = document.querySelector('.films-container');

    function renderFilms() {
        filmsContainer.innerHTML = ''; // Clear existing content
        films.forEach((film, index) => {
            const filmContent = document.createElement('div');
            filmContent.classList.add('film-content');
            if (index === 0) filmContent.classList.add('active');
            if (index === 1) filmContent.classList.add('next');
            
            filmContent.dataset.src = film.src;
            filmContent.dataset.thumbnail = film.thumbnail;

            if (film.isComingSoon) {
                filmContent.innerHTML = `
                    <div class="coming-soon-container">
                        <h1 class="coming-soon-title">${film.title}</h1>
                    </div>
                `;
            } else {
                filmContent.innerHTML = `<h1 class="film-title">${film.title}</h1>`;
            }
            filmsContainer.appendChild(filmContent);
        });
    }

    renderFilms();


    const imageElement = document.getElementById('film-gif');
    const filmContents = document.querySelectorAll('.film-content');
    let currentIndex = 0;
    let scrollTimeout = null;
    
    // Priority-based loading system
    const loadingQueue = {
        thumbnails: [], // High priority - load immediately
        visibleImages: [], // Medium priority - load when visible
        backgroundImages: [] // Low priority - load in background
    };
    
    const thumbnailCache = {};
    const fullImageCache = {};
    let isThumbnailsLoaded = false;
    
    // Initialize loading queue
    function initializeLoadingQueue() {
        filmContents.forEach((content, index) => {
            const thumbnailSrc = content.dataset.thumbnail;
            const fullSrc = content.dataset.src;
            
            // Add thumbnails to high priority queue
            if (thumbnailSrc) {
                loadingQueue.thumbnails.push({
                    src: thumbnailSrc,
                    index: index,
                    priority: 'high'
                });
            }
            
            // Add full images to appropriate queues
            if (fullSrc) {
                if (index === 0) {
                    // First image - load immediately after thumbnails
                    loadingQueue.visibleImages.push({
                        src: fullSrc,
                        index: index,
                        priority: 'medium'
                    });
                } else {
                    // Other images - load in background
                    loadingQueue.backgroundImages.push({
                        src: fullSrc,
                        index: index,
                        priority: 'low'
                    });
                }
            }
        });
    }
    
    // Load thumbnails first (highest priority)
    async function loadThumbnails() {
        console.log('Loading thumbnails...');
        
        // Load thumbnails with highest priority - no delays
        const thumbnailPromises = loadingQueue.thumbnails.map(item => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    thumbnailCache[item.src] = img;
                    console.log('Thumbnail loaded:', item.src);
                    resolve(item);
                };
                img.onerror = () => {
                    console.warn('Thumbnail failed:', item.src);
                    // Create a fallback - use the full image as thumbnail
                    const fullSrc = filmContents[item.index].dataset.src;
                    if (fullSrc) {
                        const fallbackImg = new Image();
                        fallbackImg.onload = () => {
                            thumbnailCache[item.src] = fallbackImg;
                            console.log('Using full image as thumbnail fallback:', fullSrc);
                            resolve(item);
                        };
                        fallbackImg.onerror = () => {
                            console.error('Fallback also failed:', fullSrc);
                            thumbnailCache[item.src] = null;
                            resolve(item);
                        };
                        fallbackImg.src = fullSrc;
                    } else {
                        thumbnailCache[item.src] = null;
                        resolve(item);
                    }
                };
                img.src = item.src;
            });
        });
        
        await Promise.all(thumbnailPromises);
        isThumbnailsLoaded = true;
        console.log('All thumbnails loaded');
        
        // Start loading visible images
        loadVisibleImages();
    }
    
    // Load images that are currently visible or likely to be seen soon
    async function loadVisibleImages() {
        console.log('Loading visible images...');
        const visiblePromises = loadingQueue.visibleImages.map(item => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    fullImageCache[item.src] = img;
                    console.log('Visible image loaded:', item.src);
                    resolve(item);
                };
                img.onerror = () => {
                    console.warn('Visible image failed:', item.src);
                    fullImageCache[item.src] = null;
                    resolve(item);
                };
                img.src = item.src;
            });
        });
        
        await Promise.all(visiblePromises);
        console.log('Visible images loaded');
        
        // Start background loading
        loadBackgroundImages();
    }
    
    // Load background images with lower priority
    async function loadBackgroundImages() {
        console.log('Loading background images...');
        // Load background images one at a time to avoid overwhelming the connection
        for (const item of loadingQueue.backgroundImages) {
            await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    fullImageCache[item.src] = img;
                    console.log('Background image loaded:', item.src);
                    resolve();
                };
                img.onerror = () => {
                    console.warn('Background image failed:', item.src);
                    fullImageCache[item.src] = null;
                    resolve();
                };
                img.src = item.src;
                
                // Add small delay between loads to be gentle on the connection
                setTimeout(resolve, 100);
            });
        }
        console.log('All background images loaded');
    }
    
    // Initialize and start loading
    initializeLoadingQueue();
    loadThumbnails();
    
    // Add loading indicator
    function showLoadingProgress() {
        const totalImages = loadingQueue.thumbnails.length + loadingQueue.visibleImages.length + loadingQueue.backgroundImages.length;
        const loadedImages = Object.keys(thumbnailCache).length + Object.keys(fullImageCache).length;
        const progress = Math.round((loadedImages / totalImages) * 100);
        
        console.log(`Loading progress: ${progress}% (${loadedImages}/${totalImages})`);
        
        // You can add a visual progress bar here if desired
        if (progress < 100) {
            setTimeout(showLoadingProgress, 500);
        }
    }
    
    // Start progress monitoring
    setTimeout(showLoadingProgress, 1000);

    // Function to update content with thumbnail-first loading
    function updateContent(index) {
        // Performance tracking
        const startTime = performance.now();

        // Remove active and next classes from all contents
        filmContents.forEach(content => {
            content.classList.remove('active', 'next');
        });
        
        // Add active class to current content
        filmContents[index].classList.add('active');
        
        // Add next class to the next content if it exists
        if (index < filmContents.length - 1) {
            filmContents[index + 1].classList.add('next');
        }
        
        // Get thumbnail and full image sources
        const thumbnailSrc = filmContents[index].dataset.thumbnail;
        const fullSrc = filmContents[index].dataset.src;
        
        if (imageElement && thumbnailSrc && fullSrc) {
            // ALWAYS show thumbnail instantly - this is the key to speed!
            imageElement.classList.add('loading');
            imageElement.src = thumbnailSrc;
            
            // Calculate and log thumbnail display speed
            const thumbnailTime = performance.now() - startTime;
            console.log(`🚀 INSTANT: Thumbnail displayed in ${thumbnailTime.toFixed(2)}ms for slide ${index + 1}`);
            
            // Now load the full image in the background without blocking
            if (fullImageCache[fullSrc]) {
                // Full image is already cached, switch to it after a brief delay
                setTimeout(() => {
                    imageElement.src = fullSrc;
                    imageElement.classList.remove('loading');
                    imageElement.classList.add('loaded');
                    const totalTime = performance.now() - startTime;
                    console.log(`✨ UPGRADED: Switched to full image in ${totalTime.toFixed(2)}ms for slide ${index + 1}`);
                }, 300); // Slightly longer delay for better UX
            } else {
                // Load full image in background, don't wait for it
                const img = new Image();
                img.onload = () => {
                    fullImageCache[fullSrc] = img;
                    // Only switch if user is still on this slide
                    if (currentIndex === index) {
                        imageElement.src = fullSrc;
                        imageElement.classList.remove('loading');
                        imageElement.classList.add('loaded');
                        const totalTime = performance.now() - startTime;
                        console.log(`🎯 UPGRADED: Full image loaded in ${totalTime.toFixed(2)}ms for slide ${index + 1}`);
                    }
                };
                img.onerror = () => {
                    console.error('Failed to load image:', fullSrc);
                    // Don't change the display, just log the error
                };
                img.src = fullSrc;
                
                // Remove loading state after a reasonable time even if full image fails
                setTimeout(() => {
                    if (currentIndex === index) {
                        imageElement.classList.remove('loading');
                        imageElement.classList.add('loaded');
                    }
                }, 1000);
            }
        }
    }

    // Initial load - show first thumbnail then full image
    function initialLoad() {
        const firstContent = filmContents[0];
        const thumbnailSrc = firstContent.dataset.thumbnail;
        const fullSrc = firstContent.dataset.src;
        
        if (imageElement && thumbnailSrc && fullSrc) {
            // Show thumbnail first
            imageElement.classList.add('loading');
            
            if (thumbnailCache[thumbnailSrc]) {
                imageElement.src = thumbnailSrc;
            }
            else {
                // Fallback to full image if thumbnail failed
                imageElement.src = fullSrc;
            }
            
            // Wait for thumbnails to load, then show full image
            const checkAndLoad = () => {
                if (fullImageCache[fullSrc]) {
                    imageElement.src = fullSrc;
                    imageElement.classList.remove('loading');
                    imageElement.classList.add('loaded');
                } else if (isThumbnailsLoaded) {
                    // Thumbnails are loaded but full image isn't ready yet
                    // Load it on demand
                    const img = new Image();
                    img.onload = () => {
                        fullImageCache[fullSrc] = img;
                        imageElement.src = fullSrc;
                        imageElement.classList.remove('loading');
                        imageElement.classList.add('loaded');
                    };
                    img.onerror = () => {
                        console.error('Failed to load initial image:', fullSrc);
                        imageElement.classList.remove('loading');
                        imageElement.classList.add('loaded');
                    };
                    img.src = fullSrc;
                } else {
                    // Still loading thumbnails, check again in a bit
                    setTimeout(checkAndLoad, 100);
                }
            };
            
            checkAndLoad();
        }
    }
    
    // Start initial load
    initialLoad();

    let scrolling = false;
    let wheelEventEndTimeout = null;
    // Handle scroll events (desktop) with debouncing
    function scrollBehavior(e) {
        e.preventDefault();
        
        console.log("scrolling start");
        
        if (!scrolling) {
            window.removeEventListener("wheel", scrollBehavior)

            clearTimeout(wheelEventEndTimeout);
            wheelEventEndTimeout = setTimeout(() => {
                console.log("scroll end")
                window.addEventListener('wheel', scrollBehavior, { passive: false });
                scrolling = false;
            }, 2000);    

            scrolling = true;

            if (e.deltaY > 0 && currentIndex < filmContents.length - 1) {
                
                // Scrolling down
                currentIndex++;
                updateContent(currentIndex);
            } else if (e.deltaY < 0 && currentIndex > 0) {
                // Scrolling up
                currentIndex--;
                updateContent(currentIndex);
            }

        } 
    }

    window.addEventListener('wheel', scrollBehavior, { passive: false });

    // Handle touch events (mobile)
    let touchStartY = 0;
    let touchEndY = 0;
    
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleTouchSwipe();
    }, { passive: true });
    
    function handleTouchSwipe() {
        
        const swipeThreshold = 50; // Minimum swipe distance
        const swipeDistance = touchStartY - touchEndY;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && currentIndex < filmContents.length - 1) {
                // Swipe up (next)
                currentIndex++;
                updateContent(currentIndex);
            } else if (swipeDistance < 0 && currentIndex > 0) {
                // Swipe down (previous)
                currentIndex--;
                updateContent(currentIndex);
            }
        }
    }

    // Prevent default scroll behavior
    window.addEventListener('scroll', function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }, { passive: false });
});