document.addEventListener('DOMContentLoaded', function() {
    const films = [
        {
            title: 'CKK PARTY',
            thumbnail: 'videos/CKK_party.webp',
            src: 'videos/CKK_party.webm',
            mp4: 'videos/CKK_party.mp4'
        },
        {
            title: 'UNTITLED 6',
            thumbnail: 'videos/untitled6.webp',
            src: 'videos/untitled6.webm',
            mp4: 'videos/untitled6.mp4'
        },
        {
            title: 'UNTITLED 7',
            thumbnail: 'videos/untitled7.webp',
            src: 'videos/untitled7.webm',
            mp4: 'videos/untitled7.mp4'
        },
        {
            title: 'UNTITLED 8',
            thumbnail: 'videos/untitled8.webp',
            src: 'videos/untitled8.webm',
            mp4: 'videos/untitled8.mp4'
        },
        {
            title: '30 PERCENT',
            thumbnail: 'videos/30Percent_thumb.webp',
            src: 'videos/30Percent.webp'
        },
        {
            title: 'BIGGER PROBLEMS - TEYO 1',
            thumbnail: 'videos/BiggerProblems_TeYo1_thumb.webp',
            src: 'videos/BiggerProblems_TeYo1.webp'
        },
        {
            title: 'BIGGER PROBLEMS - TEYO 2',
            thumbnail: 'videos/BiggerProblems_TeYo2_thumb.webp',
            src: 'videos/BiggerProblems_TeYo2.webp'
        },
        {
            title: 'DIASPORA - SHORT FILM 1',
            thumbnail: 'videos/DIASPORA_shortfilm1_thumb.webp',
            src: 'videos/DIASPORA_shortfilm1.webp'
        },
        {
            title: 'DIASPORA - SHORT FILM 2',
            thumbnail: 'videos/DIASPORA_shortfilm2_thumb.webp',
            src: 'videos/DIASPORA_shortfilm2.webp'
        },
        {
            title: 'DIASPORA - SHORT FILM 3',
            thumbnail: 'videos/DIASPORA_shortfilm3_thumb.webp',
            src: 'videos/DIASPORA_shortfilm3.webp'
        },
        {
            title: 'DIASPORA - PREVIS',
            thumbnail: 'videos/Diaspora_PreVis_thumb.webp',
            src: 'videos/Diaspora_PreVis.webp'
        },
        {
            title: 'DIASPORA - PROMO',
            thumbnail: 'videos/Diaspora_Promo_thumb.webp',
            src: 'videos/Diaspora_Promo.webp'
        },
        {
            title: 'DOWN IN LA',
            thumbnail: 'videos/DowninLA_thumb.webp',
            src: 'videos/DowninLA.webp'
        },
        {
            title: 'GIRLS IN LA',
            thumbnail: 'videos/GirlsInLA_thumb.webp',
            src: 'videos/GirlsInLA.webp'
        },
        {
            title: 'KILLER SERVE',
            thumbnail: 'videos/KillerServe_thumb.webp',
            src: 'videos/KillerServe.webp'
        },
        {
            title: 'MARADO - BAD MV 1',
            thumbnail: 'videos/Marado_BAD_mv1_thumb.webp',
            src: 'videos/Marado_BAD_mv1.webp'
        },
        {
            title: 'MARADO - BAD MV 2',
            thumbnail: 'videos/Marado_BAD_mv2_thumb.webp',
            src: 'videos/Marado_BAD_mv2.webp'
        },
        {
            title: 'MARADO - MV TEST',
            thumbnail: 'videos/Marado_MV_test_thumb.webp',
            src: 'videos/Marado_MV_test.webp'
        },
        {
            title: 'NOCTURNAL 1',
            thumbnail: 'videos/NOCTURNAL1_thumb.webp',
            src: 'videos/NOCTURNAL1.webp'
        },
        {
            title: 'NOCTURNAL 2',
            thumbnail: 'videos/NOCTURNAL2_thumb.webp',
            src: 'videos/NOCTURNAL2.webp'
        },
        {
            title: 'OLDIES BUT GOLDIES',
            thumbnail: 'videos/OldiesButGoldies_thumb.webp',
            src: 'videos/OldiesButGoldies.webp'
        },
        {
            title: 'SIMILIS',
            thumbnail: 'videos/SIMILIS_thumb.webp',
            src: 'videos/SIMILIS.webp'
        },
        {
            title: 'YALA - SPEC AD',
            thumbnail: 'videos/yala_specad_thumb.webp',
            src: 'videos/yala_specad.webp'
        },
        {
            title: 'UNTITLED 1',
            thumbnail: 'videos/untitled1_thumb.webp',
            src: 'videos/untitled1.webp'
        },
        {
            title: 'UNTITLED 2',
            thumbnail: 'videos/untitled2_thumb.webp',
            src: 'videos/untitled2.webp'
        },
        {
            title: 'UNTITLED 3',
            thumbnail: 'videos/untitled3_thumb.webp',
            src: 'videos/untitled3.webp'
        },
        {
            title: 'UNTITLED 4',
            thumbnail: 'videos/untitled4_thumb.webp',
            src: 'videos/untitled4.webp'
        },
        {
            title: 'UNTITLED 5',
            thumbnail: 'videos/untitled5_thumb.webp',
            src: 'videos/untitled5.webp'
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

        // Send custom event to Google Analytics when a user views a slide
        if (typeof gtag === 'function') {
            gtag('event', 'view_film', {
                'film_title': films[index].title,
                'slide_index': index + 1
            });
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

            // Send custom event to Google Analytics for the initial slide view
            if (typeof gtag === 'function') {
                gtag('event', 'view_film', {
                    'film_title': films[0].title,
                    'slide_index': 1
                });
            }
            
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
        const hash = window.location.hash || '#projects';
        if (hash !== '#projects') {
            return; // Allow natural scrolling
        }
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
        const hash = window.location.hash || '#projects';
        if (hash !== '#projects') {
            return; // Allow natural swipe scrolling
        }
        
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

    // Prevent default scroll behavior only on projects slideshow
    window.addEventListener('scroll', function(e) {
        const hash = window.location.hash || '#projects';
        if (hash === '#projects') {
            e.preventDefault();
            window.scrollTo(0, 0);
        }
    }, { passive: false });

    // Menu Drawer Toggle Logic
    const toggleButton = document.getElementById('menu-toggle');
    const drawer = document.getElementById('menu-drawer');
    const label = toggleButton.querySelector('.toggle-text');

    if (toggleButton && drawer && label) {
        toggleButton.addEventListener('click', () => {
            const isOpen = drawer.classList.toggle('open');
            toggleButton.classList.toggle('active');
            
            // Staggered cross-fade for the label text
            label.style.opacity = '0';
            setTimeout(() => {
                label.textContent = isOpen ? 'CLOSE' : 'MENU';
                label.style.opacity = '1';
            }, 150);
        });

        // Close menu when clicking a link
        const links = drawer.querySelectorAll('.drawer-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.remove('open');
                toggleButton.classList.remove('active');
                label.style.opacity = '0';
                setTimeout(() => {
                    label.textContent = 'MENU';
                    label.style.opacity = '1';
                }, 150);
            });
        });
    }

    // --- All Films Rendering & Sorting & Page Navigation Logic ---
    let currentSort = 'newest';

    function renderAllFilmsGrid() {
        const gridContainer = document.querySelector('.all-films-grid');
        if (!gridContainer) return;
        
        gridContainer.innerHTML = '';
        
        // Clone films array to avoid modifying the original order
        let filmsToRender = [...films].map((film, index) => ({...film, originalIndex: index}));
        
        if (currentSort === 'alphabetical') {
            filmsToRender.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        filmsToRender.forEach((film) => {
            const card = document.createElement('article');
            card.classList.add('film-card');
            card.dataset.index = film.originalIndex;
            
            // Render card content
            card.innerHTML = `
                <div class="film-card-image-wrapper">
                    <img src="${film.thumbnail}" alt="${film.title}" loading="lazy">
                </div>
                <div class="film-card-info">
                    <span class="film-card-year">2026</span>
                    <h3 class="film-card-title">${film.title}</h3>
                </div>
            `;
            
            // Navigate to projects view on click, and activate this specific film
            card.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = film.originalIndex;
                updateContent(currentIndex);
                window.location.hash = '#projects';
            });
            
            gridContainer.appendChild(card);
        });
    }

    // Set up sort buttons
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sortButtons.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            currentSort = btn.dataset.sort;
            renderAllFilmsGrid();
        });
    });

    // Routing handler
    function handleRouting() {
        const hash = window.location.hash || '#projects';
        
        // Reset scroll header state
        const header = document.querySelector('header');
        if (header) header.classList.remove('scrolled');
        
        // Remove active class from all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Scroll to top of the document
        window.scrollTo(0, 0);

        if (hash === '#projects') {
            document.documentElement.classList.add('projects-active');
            document.body.classList.add('projects-active');
            
            const projectsView = document.getElementById('projects-view');
            if (projectsView) projectsView.classList.add('active');
            // Resume video playback for current slide
            if (videoElement && videoElement.classList.contains('playing')) {
                videoElement.play().catch(e => console.warn(e));
            }
        } else {
            document.documentElement.classList.remove('projects-active');
            document.body.classList.remove('projects-active');
            
            if (hash === '#all-films') {
                const allFilmsView = document.getElementById('all-films-view');
                if (allFilmsView) allFilmsView.classList.add('active');
                // Pause hero video
                if (videoElement) videoElement.pause();
                // Render grid
                renderAllFilmsGrid();
            } else if (hash === '#about') {
                const aboutView = document.getElementById('about-view');
                if (aboutView) aboutView.classList.add('active');
                // Pause hero video
                if (videoElement) videoElement.pause();
            } else if (hash === '#contact') {
                const contactView = document.getElementById('contact-view');
                if (contactView) contactView.classList.add('active');
                // Pause hero video
                if (videoElement) videoElement.pause();
            }
        }
    }

    window.addEventListener('hashchange', handleRouting);
    
    // Add blurred radial header background effect on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (!header) return;
        
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Run router on load
    handleRouting();
});
