document.addEventListener('DOMContentLoaded', function() {
    const films = [
        {
            title: 'NORTH VALLEY',
            thumbnail: 'videos/film1.png', // Using a static image for thumbnail
            src: 'videos/film1.webm',
            mp4: 'videos/film1.mp4'
        },
        {
            title: 'POSTCARDS OF SF',
            thumbnail: 'videos/film2.png', // Using a static image for thumbnail
            src: 'videos/film2.webm',
            mp4: 'videos/film2.mp4'
        },
        {
            title: 'KILLER SERVE',
            thumbnail: 'videos/killerserve.webp',
            src: 'videos/killerserve.webm',
            mp4: 'videos/killerserve.mp4'
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
            if (film.mp4) {
                filmContent.dataset.mp4 = film.mp4;
            }
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


    const posterElement = document.getElementById('film-poster');
    const videoElement = document.getElementById('film-video');
    const filmContents = document.querySelectorAll('.film-content');
    let currentIndex = 0;
    
    // Priority-based loading system
    const loadingQueue = {
        thumbnails: [], // High priority - load immediately
        visibleImages: [], // Medium priority - load when visible
        backgroundImages: [] // Low priority - load in background
    };
    
    const thumbnailCache = {};
    const mediaCache = {}; // Cache for images (Image elements) and video Object URLs
    let isThumbnailsLoaded = false;

    // Helper to fetch video as Blob and cache Object URL for instant playback
    async function preloadVideo(url) {
        if (mediaCache[url]) return mediaCache[url];
        try {
            console.log('Preloading video into cache:', url);
            const response = await fetch(url);
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);
            mediaCache[url] = objectURL;
            return objectURL;
        } catch (e) {
            console.warn('Failed to fetch video blob for caching:', url, e);
            // Fallback: return original URL
            return url;
        }
    }
    
    // Initialize loading queue
    function initializeLoadingQueue() {
        filmContents.forEach((content, index) => {
            const thumbnailSrc = content.dataset.thumbnail;
            const fullSrc = content.dataset.src;
            const mp4Src = content.dataset.mp4;
            
            // Add thumbnails to high priority queue
            if (thumbnailSrc) {
                loadingQueue.thumbnails.push({
                    src: thumbnailSrc,
                    index: index,
                    type: 'image'
                });
            }
            
            // Add full media to appropriate queues
            if (fullSrc) {
                const isVideo = fullSrc.endsWith('.webm') || fullSrc.endsWith('.mp4');
                const queueItem = {
                    src: fullSrc,
                    mp4: mp4Src,
                    index: index,
                    type: isVideo ? 'video' : 'image'
                };
                
                if (index === 0) {
                    loadingQueue.visibleImages.push(queueItem);
                } else {
                    loadingQueue.backgroundImages.push(queueItem);
                }
            }
        });
    }
    
    // Load thumbnails first (highest priority)
    async function loadThumbnails() {
        console.log('Loading thumbnails...');
        
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
                    if (fullSrc && !fullSrc.endsWith('.webm') && !fullSrc.endsWith('.mp4')) {
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
            if (item.type === 'video') {
                return preloadVideo(item.src).then(res => {
                    if (item.mp4) {
                        return preloadVideo(item.mp4).then(() => item);
                    }
                    return item;
                });
            } else {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        mediaCache[item.src] = img;
                        console.log('Visible image loaded:', item.src);
                        resolve(item);
                    };
                    img.onerror = () => {
                        console.warn('Visible image failed:', item.src);
                        mediaCache[item.src] = null;
                        resolve(item);
                    };
                    img.src = item.src;
                });
            }
        });
        
        await Promise.all(visiblePromises);
        console.log('Visible images loaded');
        
        // Start background loading
        loadBackgroundImages();
    }
    
    // Load background images/videos with lower priority
    async function loadBackgroundImages() {
        console.log('Loading background images...');
        for (const item of loadingQueue.backgroundImages) {
            await new Promise((resolve) => {
                if (item.type === 'video') {
                    preloadVideo(item.src).then(() => {
                        if (item.mp4) {
                            preloadVideo(item.mp4).then(resolve);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    const img = new Image();
                    img.onload = () => {
                        mediaCache[item.src] = img;
                        console.log('Background image loaded:', item.src);
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn('Background image failed:', item.src);
                        mediaCache[item.src] = null;
                        resolve();
                    };
                    img.src = item.src;
                }
            });
            // Add small delay between loads to be gentle on the connection
            await new Promise(r => setTimeout(r, 100));
        }
        console.log('All background media loaded');
    }
    
    // Initialize and start loading
    initializeLoadingQueue();
    loadThumbnails();
    
    // Add loading indicator
    function showLoadingProgress() {
        const totalImages = loadingQueue.thumbnails.length + loadingQueue.visibleImages.length + loadingQueue.backgroundImages.length;
        const loadedImages = Object.keys(thumbnailCache).length + Object.keys(mediaCache).length;
        const progress = Math.round((loadedImages / totalImages) * 100);
        
        console.log(`Loading progress: ${progress}% (${loadedImages}/${totalImages})`);
        
        if (progress < 100) {
            setTimeout(showLoadingProgress, 500);
        }
    }
    
    setTimeout(showLoadingProgress, 1000);

    // Function to update content with thumbnail-first loading
    function updateContent(index) {
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
        const mp4Src = filmContents[index].dataset.mp4;
        const isVideo = fullSrc && (fullSrc.endsWith('.webm') || fullSrc.endsWith('.mp4'));
        
        if (posterElement && thumbnailSrc && fullSrc) {
            // ALWAYS show thumbnail instantly
            posterElement.classList.add('loading');
            posterElement.src = thumbnailSrc;
            posterElement.style.opacity = '1';
            
            const thumbnailTime = performance.now() - startTime;
            console.log(`🚀 INSTANT: Thumbnail displayed in ${thumbnailTime.toFixed(2)}ms for slide ${index + 1}`);
            
            if (isVideo) {
                // Video slide
                const cachedWebm = mediaCache[fullSrc];
                const cachedMp4 = mp4Src ? mediaCache[mp4Src] : null;

                // Stop any playing video, clear playing class
                videoElement.classList.remove('playing');
                videoElement.pause();
                
                // Set video sources (use cached blob URLs if available)
                videoElement.innerHTML = `
                    <source src="${cachedWebm || fullSrc}" type="video/webm">
                    ${mp4Src ? `<source src="${cachedMp4 || mp4Src}" type="video/mp4">` : ''}
                `;
                videoElement.load();
                
                // Cross-fade when playing begins
                videoElement.onplaying = () => {
                    videoElement.classList.add('playing');
                    posterElement.style.opacity = '0';
                    posterElement.classList.remove('loading');
                    const totalTime = performance.now() - startTime;
                    console.log(`✨ UPGRADED: Video started playing in ${totalTime.toFixed(2)}ms for slide ${index + 1}`);
                };

                videoElement.play().catch(err => {
                    console.warn('Video playback was interrupted or failed:', err);
                    // Fade out poster anyway to show fallback or black if it failed completely
                    setTimeout(() => {
                        if (currentIndex === index) {
                            posterElement.classList.remove('loading');
                        }
                    }, 1000);
                });
            } else {
                // Static image slide
                videoElement.classList.remove('playing');
                videoElement.pause();
                
                if (mediaCache[fullSrc]) {
                    // Full image is already cached
                    setTimeout(() => {
                        posterElement.src = fullSrc;
                        posterElement.classList.remove('loading');
                        const totalTime = performance.now() - startTime;
                        console.log(`✨ UPGRADED: Switched to full image in ${totalTime.toFixed(2)}ms for slide ${index + 1}`);
                    }, 300);
                } else {
                    // Load full image in background
                    const img = new Image();
                    img.onload = () => {
                        mediaCache[fullSrc] = img;
                        if (currentIndex === index) {
                            posterElement.src = fullSrc;
                            posterElement.classList.remove('loading');
                            const totalTime = performance.now() - startTime;
                            console.log(`🎯 UPGRADED: Full image loaded in ${totalTime.toFixed(2)}ms for slide ${index + 1}`);
                        }
                    };
                    img.onerror = () => {
                        console.error('Failed to load image:', fullSrc);
                        if (currentIndex === index) {
                            posterElement.classList.remove('loading');
                        }
                    };
                    img.src = fullSrc;
                }
            }
        }
    }

    // Initial load - show first thumbnail then full video/image
    function initialLoad() {
        const firstContent = filmContents[0];
        const thumbnailSrc = firstContent.dataset.thumbnail;
        const fullSrc = firstContent.dataset.src;
        const mp4Src = firstContent.dataset.mp4;
        const isVideo = fullSrc && (fullSrc.endsWith('.webm') || fullSrc.endsWith('.mp4'));
        
        if (posterElement && thumbnailSrc && fullSrc) {
            posterElement.classList.add('loading');
            
            if (thumbnailCache[thumbnailSrc]) {
                posterElement.src = thumbnailSrc;
            } else {
                posterElement.src = fullSrc;
            }
            posterElement.style.opacity = '1';
            videoElement.classList.remove('playing');
            
            const checkAndLoad = () => {
                const isCached = isVideo ? mediaCache[fullSrc] : mediaCache[fullSrc];
                
                if (isCached || isThumbnailsLoaded) {
                    if (isVideo) {
                        const cachedWebm = mediaCache[fullSrc];
                        const cachedMp4 = mp4Src ? mediaCache[mp4Src] : null;

                        videoElement.innerHTML = `
                            <source src="${cachedWebm || fullSrc}" type="video/webm">
                            ${mp4Src ? `<source src="${cachedMp4 || mp4Src}" type="video/mp4">` : ''}
                        `;
                        videoElement.load();
                        
                        videoElement.onplaying = () => {
                            videoElement.classList.add('playing');
                            posterElement.style.opacity = '0';
                            posterElement.classList.remove('loading');
                        };
                        videoElement.play().catch(err => console.warn(err));
                    } else {
                        posterElement.src = fullSrc;
                        posterElement.classList.remove('loading');
                    }
                } else {
                    // Check again in a bit
                    setTimeout(checkAndLoad, 100);
                }
            };
            
            checkAndLoad();
        }
    }
    
    initialLoad();

    let isScrolling = false; // Global flag to control page transitions
    let scrollCooldownTimeout = null; // Global timeout to manage cooldown

    // Handle scroll events (desktop)
    window.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        if (isScrolling) { return; } // If already scrolling, do nothing

        isScrolling = true; // Lock scrolling immediately

        if (e.deltaY > 0 && currentIndex < filmContents.length - 1) {
            // Scrolling down
            currentIndex++;
            updateContent(currentIndex);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            // Scrolling up
            currentIndex--;
            updateContent(currentIndex);
        }
        
        // Set a cooldown period after the scroll action is processed
        clearTimeout(scrollCooldownTimeout);
        scrollCooldownTimeout = setTimeout(() => {
            isScrolling = false; // Re-enable scrolling after cooldown
        }, 800); // This duration should be slightly longer than your page transition animation
    }, { passive: false });

    // Handle touch events (mobile)
    let touchStartY = 0;
    let touchEndY = 0;
    
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        
        if (isScrolling) { return; } // If already scrolling, do nothing
        isScrolling = true; // Lock scrolling immediately for touch

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

        // Set a cooldown period after the swipe action is processed
        clearTimeout(scrollCooldownTimeout);
        scrollCooldownTimeout = setTimeout(() => {
            isScrolling = false; // Re-enable scrolling after cooldown
        }, 800); // This duration should be slightly longer than your page transition animation
    }, { passive: true });

    // Prevent default scroll behavior
    window.addEventListener('scroll', function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }, { passive: false });
});