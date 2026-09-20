document.addEventListener('DOMContentLoaded', function() {
    // Optional per-scene mobileOffsetX: horizontal framing shift in pixels; omitted means centered.
    const films = [
        {
            title: 'DIASPORA',
            thumbnail: 'videos/DIASPORA_shortfilm1_thumb.webp',
            src: 'videos/DIASPORA_shortfilm1.webp',
            year: '2026',
            genre: 'Short Film',
            description: 'An atmospheric short film exploring displacement, identity, and personal heritage.'
        },
        {
            title: 'NOCTURNAL',
            thumbnail: 'videos/NOCTURNAL1_thumb.webp',
            src: 'videos/NOCTURNAL1.webp',
            year: '2026',
            genre: 'Visual Art / Experimental',
            description: 'A dark, moody cinematic study of urban nightlife and high-contrast composition.'
        },
        {
            title: 'NOCTURNAL ',
            thumbnail: 'videos/NOCTURNAL2_thumb.webp',
            src: 'videos/NOCTURNAL2.webp',
            year: '2026',
            genre: 'Visual Art / Experimental',
            description: 'A dark, moody cinematic study of urban nightlife and high-contrast composition.'
        },
        {
            title: 'PINKWALL',
            thumbnail: 'videos/GirlsInLA_thumb.webp',
            src: 'videos/GirlsInLA.webp',
            year: '2026',
            genre: 'Music Video / Fashion Film',
            mobileOffsetX: -300,
            description: 'A vibrant music video/fashion film exploring youth culture and pop color styles.'
        },
        {
            title: 'KILLER SERVE',
            thumbnail: 'videos/KillerServe_thumb.webp',
            src: 'videos/killerserve.webp',
            year: '2026',
            genre: 'Commercial / Sports Film',
            description: 'High-energy sports commercial showcasing athletic action and precision.'
        },
        {
            title: 'BIGGER PROBLEMS',
            thumbnail: 'videos/BiggerProblems_TeYo1_thumb.webp',
            src: 'videos/BiggerProblems_TeYo1.webp',
            year: '2026',
            genre: 'Music Video / Narrative',
            description: 'A narrative music video blending intimate performances with dramatic lighting.'
        },
        {
            title: 'HALLOWEEKEND',
            thumbnail: 'videos/CKK_party.webp',
            src: 'videos/CKK_party.webm',
            mp4: 'videos/CKK_party.mp4',
            year: '2026',
            genre: 'Event / Aftermovie',
            mobileOffsetX: 60,
            description: 'High-energy event aftermovie capturing nighttime party vibes.'
        },
        {
            title: 'MAGNOLIA',
            thumbnail: 'videos/untitled8.webp',
            src: 'videos/untitled8.webm',
            mp4: 'videos/untitled8.mp4',
            year: '2026',
            genre: 'Commercial / Narrative',
            mobileOffsetX: -180,
            description: 'Emotive short commercial focusing on natural aesthetics and human emotion.'
        },
        {
            title: 'NEW NUISANCE',
            thumbnail: 'videos/untitled5_thumb.webp',
            src: 'videos/untitled5.webp',
            year: '2026',
            genre: 'Experimental / Short Film',
            mobileOffsetX: -150,
            description: 'A gritty, low-fidelity film study of urban isolation.'
        },
        {
            title: 'BAD',
            thumbnail: 'videos/Marado_BAD_mv1_thumb.webp',
            src: 'videos/Marado_BAD_mv1.webp',
            year: '2026',
            genre: 'Music Video',
            mobileOffsetX: -220,
            description: 'Stylish music video using fast camera movements and choreography.'
        },
        {
            title: 'BAD ',
            thumbnail: 'videos/Marado_BAD_mv2_thumb.webp',
            src: 'videos/Marado_BAD_mv2.webp',
            year: '2026',
            genre: 'Music Video',
            description: 'Stylish music video using fast camera movements and choreography.'
        },
        {
            title: 'DOWN IN LA',
            thumbnail: 'videos/DowninLA_thumb.webp',
            src: 'videos/DowninLA.webp',
            year: '2026',
            genre: 'Visual Poem',
            mobileOffsetX: 100,
            description: 'A visual poem capturing architectural landscapes and warm tones in Los Angeles.'
        },
        {
            title: 'SANTA SUSANA',
            thumbnail: 'videos/untitled7.webp',
            src: 'videos/untitled7.webm',
            mp4: 'videos/untitled7.mp4',
            year: '2026',
            genre: 'Narrative / Drama',
            description: 'A dramatic narrative short set against vast nature backgrounds.'
        },
        {
            title: 'HEIGHTS of MARINA',
            thumbnail: 'videos/Diaspora_Promo_thumb.webp',
            src: 'videos/Diaspora_Promo.webp',
            year: '2026',
            genre: 'Commercial / Architectural',
            mobileOffsetX: 120,
            description: 'Real estate commercial showing interior design and fluid camera movement.'
        },
        {
            title: 'OLDIES BUT GOLDIES',
            thumbnail: 'videos/OldiesButGoldies_thumb.webp',
            src: 'videos/OldiesButGoldies.webp',
            year: '2025',
            genre: 'Visual Art / Retrospective',
            description: 'Nostalgic retrospective styled with classic vintage color grading.'
        },
        {
            title: 'MARADO PreVis',
            thumbnail: 'videos/Marado_MV_test_thumb.webp',
            src: 'videos/Marado_MV_test.webp',
            year: '2026',
            genre: 'Behind the Scenes / Pre-visualization',
            mobileOffsetX: 80,
            description: 'Behind-the-scenes layout planning and early visual concept tests.'
        },
        {
            title: 'DIASPORA PreVis',
            thumbnail: 'videos/Diaspora_PreVis_thumb.webp',
            src: 'videos/Diaspora_PreVis.webp',
            year: '2026',
            genre: 'Behind the Scenes / Pre-visualization',
            mobileOffsetX: -100,
            description: 'Early shot-composition drafting and location test reel.'
        },
        {
            title: 'SIMILIS',
            thumbnail: 'videos/SIMILIS_thumb.webp',
            src: 'videos/SIMILIS.webp',
            year: '2026',
            genre: 'Short Film / Sci-Fi',
            mobileOffsetX: 30,
            description: 'Moody science fiction short focusing on geometric patterns and reflection.'
        },
        {
            title: 'YALA Spec Ad',
            thumbnail: 'videos/yala_specad_thumb.webp',
            src: 'videos/yala_specad.webp',
            year: '2026',
            genre: 'Commercial / Spec Ad',
            description: 'A modern product spec commercial highlighting visual contrast.'
        },
        {
            title: 'CALL ME WHEN YOU CAN',
            thumbnail: 'videos/untitled1_thumb.webp',
            src: 'videos/untitled1.webp',
            year: '2026',
            genre: 'Narrative / Drama',
            description: 'Tension-filled short thriller revolving around a telephone call.'
        },
        {
            title: 'YERBA ISLE',
            thumbnail: 'videos/untitled2_thumb.webp',
            src: 'videos/untitled2.webp',
            year: '2026',
            genre: 'Visual Poem / Travel',
            mobileOffsetX: 180,
            description: 'Clean landscape shots capturing coastal imagery and relaxation.'
        },
        {
            title: 'SAY, DELILAH',
            thumbnail: 'videos/untitled3_thumb.webp',
            src: 'videos/untitled3.webp',
            year: '2026',
            genre: 'Music Video / Romance',
            mobileOffsetX: 250,
            description: 'A narrative-focused music video showcasing romantic storytelling.'
        },
        {
            title: 'JAY SOMBER of WHITHER',
            thumbnail: 'videos/untitled4_thumb.webp',
            src: 'videos/untitled4.webp',
            year: '2026',
            genre: 'Portrait / Documentary',
            mobileOffsetX: -100,
            description: 'Documentary interview exploring visual artwork design.'
        },
        {
            title: 'BIGGER PROBLEMS ',
            thumbnail: 'videos/BiggerProblems_TeYo2_thumb.webp',
            src: 'videos/BiggerProblems_TeYo2.webp',
            year: '2026',
            genre: 'Music Video / Narrative',
            mobileOffsetX: 120,
            description: 'A narrative music video blending intimate performances with dramatic lighting.'
        },
        {
            title: 'DIASPORA ',
            thumbnail: 'videos/DIASPORA_shortfilm2_thumb.webp',
            src: 'videos/DIASPORA_shortfilm2.webp',
            year: '2026',
            genre: 'Short Film',
            mobileOffsetX: 80,
            description: 'An atmospheric short film exploring displacement, identity, and personal heritage.'
        },
        {
            title: 'DIASPORA  ',
            thumbnail: 'videos/DIASPORA_shortfilm3_thumb.webp',
            src: 'videos/DIASPORA_shortfilm3.webp',
            year: '2026',
            genre: 'Short Film',
            mobileOffsetX: 20,
            description: 'An atmospheric short film exploring displacement, identity, and personal heritage.'
        },
        {
            title: 'LOVE STORY ON THE PIER',
            thumbnail: 'videos/untitled6.webp',
            src: 'videos/untitled6.webm',
            mp4: 'videos/untitled6.mp4',
            year: '2026',
            genre: 'Romance / Narrative',
            mobileOffsetX: -350,
            description: 'Golden hour romance visual narrative captured candidly.'
        },
        {
            title: '30 PERCENT',
            thumbnail: 'videos/30Percent_thumb.webp',
            src: 'videos/30Percent.webp',
            year: '2026',
            genre: 'Commercial / Short',
            description: 'Clean minimalist advertising sequence utilizing high contrast.'
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
    const videoContainer = document.querySelector('#projects-view .video-container');
    const filmSnapTrack = document.getElementById('film-snap-track');
    const filmPagination = document.getElementById('film-pagination');
    const filmContents = document.querySelectorAll('.film-content');
    let currentIndex = 0;
    let previousPaginationIndex = null;

    films.forEach((film, index) => {
        const stop = document.createElement('div');
        stop.className = 'film-snap-stop';
        stop.setAttribute('role', 'group');
        stop.setAttribute('aria-label', `Film ${index + 1} of ${films.length}: ${film.title.trim()}`);
        filmSnapTrack.appendChild(stop);
    });

    function goToFilm(index) {
        if (index < 0 || index >= films.length) return;
        currentIndex = index;
        updateContent(index);
        filmSnapTrack.scrollTop = index * filmSnapTrack.clientHeight;
    }

    function applyMobileFraming(index) {
        const offset = films[index].mobileOffsetX ?? 0;
        videoContainer.style.setProperty('--mobile-scene-x', `${Number.isFinite(offset) ? offset : 0}px`);
    }

    function renderFilmPagination(index) {
        const dots = [];
        const previousDots = new Map();
        const start = Math.max(0, index - 2);
        const end = Math.min(films.length - 1, index + 2);

        for (const button of filmPagination.children) {
            previousDots.set(Number(button.dataset.page), {
                button,
                rect: button.getBoundingClientRect()
            });
            button.getAnimations().forEach(animation => animation.cancel());
        }

        for (let page = start; page <= end; page++) {
            const existing = previousDots.get(page);
            const button = existing ? existing.button : document.createElement('button');

            if (!existing) {
                const dot = document.createElement('span');
                button.type = 'button';
                button.className = 'film-page-button';
                button.dataset.page = page;
                button.setAttribute('aria-label', `Film ${page + 1} of ${films.length}: ${films[page].title.trim()}`);
                button.addEventListener('click', () => {
                    if (page === currentIndex) return;
                    goToFilm(page);
                });
                dot.className = 'film-page-dot';
                dot.setAttribute('aria-hidden', 'true');
                button.appendChild(dot);
            }

            button.classList.toggle('active', page === index);
            if (page === index) {
                button.setAttribute('aria-current', 'page');
            } else {
                button.removeAttribute('aria-current');
            }
            dots.push(button);
        }

        filmPagination.replaceChildren(...dots);

        if (previousPaginationIndex !== null && previousPaginationIndex !== index &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            for (const button of dots) {
                const oldRect = previousDots.get(Number(button.dataset.page))?.rect;
                const newRect = button.getBoundingClientRect();
                const from = oldRect
                    ? { transform: `translate(${oldRect.left - newRect.left}px, ${oldRect.top - newRect.top}px)` }
                    : { transform: `translateY(${index > previousPaginationIndex ? 8 : -8}px)`, opacity: 0 };
                button.animate([from, { transform: 'translate(0, 0)', opacity: 1 }], {
                    duration: 300,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });
            }
        }
        previousPaginationIndex = index;
    }
    
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
        applyMobileFraming(index);
        renderFilmPagination(index);

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
            posterElement.alt = `Film poster for ${films[index].title.trim()} by film director Jag Manalang`;
            
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
        applyMobileFraming(0);
        renderFilmPagination(0);
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
            posterElement.alt = `Film poster for ${films[0].title.trim()} by film director Jag Manalang`;
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

    const scrollDebugEnabled = new URLSearchParams(window.location.search).get('scrollDebug') === '1';
    const scrollTelemetry = [];
    let scrollDebugPanel = null;
    let scrollDebugCanvas = null;
    let lastWheelAt = null;
    let lastWheelMagnitude = 0;
    let lastWheelSlope = 0;

    if (scrollDebugEnabled) {
        scrollDebugPanel = document.createElement('aside');
        scrollDebugPanel.className = 'scroll-debug-panel';
        scrollDebugPanel.setAttribute('aria-label', 'Scroll telemetry');
        scrollDebugPanel.innerHTML = [
            '<div class="scroll-debug-header"><span>SCROLL / DEBUG</span>',
            '<button type="button" data-action="export">EXPORT</button>',
            '<button type="button" data-action="clear">CLEAR</button></div>',
            '<canvas width="320" height="90" aria-label="Recent signed wheel deltas"></canvas>',
            '<div class="scroll-debug-values">Δ — · slope — · curvature —</div>',
            '<div class="scroll-debug-state">native snap · film ' + (currentIndex + 1) + '</div>',
            '<div class="scroll-debug-decision">Waiting for wheel input</div>'
        ].join('');
        document.body.appendChild(scrollDebugPanel);
        scrollDebugCanvas = scrollDebugPanel.querySelector('canvas');
        window.__scrollTelemetry = scrollTelemetry;

        scrollDebugPanel.querySelector('[data-action="clear"]').addEventListener('click', () => {
            scrollTelemetry.length = 0;
            lastWheelAt = null;
            lastWheelMagnitude = 0;
            lastWheelSlope = 0;
            drawScrollTelemetry();
            scrollDebugPanel.querySelector('.scroll-debug-values').textContent = 'Δ — · slope — · curvature —';
            scrollDebugPanel.querySelector('.scroll-debug-state').textContent = 'native snap · film ' + (currentIndex + 1);
            scrollDebugPanel.querySelector('.scroll-debug-decision').textContent = 'Trace cleared';
        });
        scrollDebugPanel.querySelector('[data-action="export"]').addEventListener('click', () => {
            const blob = new Blob([JSON.stringify(scrollTelemetry, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'scroll-telemetry.json';
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
    }

    function drawScrollTelemetry() {
        if (!scrollDebugCanvas) return;
        const ctx = scrollDebugCanvas.getContext('2d');
        const width = scrollDebugCanvas.width;
        const height = scrollDebugCanvas.height;
        const recent = scrollTelemetry.filter(event => event.source === 'wheel').slice(-60);
        const maxDelta = Math.max(24, ...recent.map(event => Math.abs(event.delta)));
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        if (!recent.length) return;
        ctx.strokeStyle = '#d0d0d0';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        recent.forEach((event, index) => {
            const x = (index / Math.max(1, recent.length - 1)) * width;
            const y = height / 2 - (event.delta / maxDelta) * (height / 2 - 7);
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
    }

    function recordScrollTelemetry(event) {
        if (!scrollDebugEnabled) return;
        scrollTelemetry.push(event);
        if (scrollTelemetry.length > 1000) scrollTelemetry.shift();
        scrollDebugPanel.querySelector('.scroll-debug-values').textContent =
            'Δ ' + event.delta + ' · slope ' + event.slopePerMs + '/ms · curvature ' + event.curvaturePerMs2 + '/ms²';
        scrollDebugPanel.querySelector('.scroll-debug-state').textContent =
            'native snap · film ' + event.film + ' · scroll ' + Math.round(event.scrollTop) + 'px';
        scrollDebugPanel.querySelector('.scroll-debug-decision').textContent =
            event.decision + ' · ' + scrollTelemetry.length + ' events';
        drawScrollTelemetry();
    }

    filmSnapTrack.addEventListener('scroll', () => {
        const height = filmSnapTrack.clientHeight;
        if (!height) return;
        const nextIndex = Math.max(0, Math.min(films.length - 1, Math.round(filmSnapTrack.scrollTop / height)));
        if (nextIndex === currentIndex) return;
        currentIndex = nextIndex;
        updateContent(nextIndex);
        recordScrollTelemetry({
            timeMs: Math.round(performance.now()),
            source: 'snap',
            rawDeltaY: null,
            deltaMode: null,
            delta: 0,
            slopePerMs: 0,
            curvaturePerMs2: 0,
            scrollTop: filmSnapTrack.scrollTop,
            film: currentIndex + 1,
            decision: 'snap-change'
        });
    }, { passive: true });

    if (scrollDebugEnabled) {
        filmSnapTrack.addEventListener('wheel', e => {
            const now = performance.now();
            const delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
            const magnitude = Math.abs(delta);
            const gap = lastWheelAt === null ? null : now - lastWheelAt;
            const contiguous = gap !== null && gap < 250;
            const slope = contiguous ? (magnitude - lastWheelMagnitude) / Math.max(1, gap) : 0;
            const curvature = contiguous ? (slope - lastWheelSlope) / Math.max(1, gap) : 0;
            lastWheelAt = now;
            lastWheelMagnitude = magnitude;
            lastWheelSlope = slope;
            recordScrollTelemetry({
                timeMs: Math.round(now),
                gapMs: gap === null ? null : Math.round(gap),
                source: 'wheel',
                rawDeltaY: e.deltaY,
                deltaMode: e.deltaMode,
                delta: Number(delta.toFixed(2)),
                slopePerMs: Number(slope.toFixed(3)),
                curvaturePerMs2: Number(curvature.toFixed(4)),
                scrollTop: filmSnapTrack.scrollTop,
                film: currentIndex + 1,
                decision: 'native-scroll'
            });
        }, { passive: true });
    }

    window.addEventListener('resize', () => {
        filmSnapTrack.scrollTop = currentIndex * filmSnapTrack.clientHeight;
    });

    // Keep the header visible over films; other pages scroll normally.
    window.addEventListener('scroll', function() {
        const hash = window.location.hash || '#projects';
        const header = document.querySelector('header');
        
        if (hash === '#projects') {
            if (header) {
                header.classList.remove('hidden');
            }
        } else {
            if (header) {
                if (window.scrollY > 20) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            }
        }
    }, { passive: true });

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
                    <img src="${film.thumbnail}" alt="${film.title.trim()}" loading="lazy">
                </div>
                <div class="film-card-info">
                    <span class="film-card-year">${film.year || '2026'}</span>
                    <h3 class="film-card-title">${film.title.trim()}</h3>
                </div>
            `;
            
            // Navigate to projects view on click, and activate this specific film
            card.addEventListener('click', (e) => {
                e.preventDefault();
                goToFilm(film.originalIndex);
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
        
        // Remove active class from all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Reset header hidden state on route change
        const header = document.querySelector('header');
        if (header) {
            header.classList.remove('hidden');
        }
        
        // Scroll to top of the document
        window.scrollTo(0, 0);

        if (hash === '#projects') {
            document.documentElement.classList.add('projects-active');
            document.body.classList.add('projects-active');
            
            const projectsView = document.getElementById('projects-view');
            if (projectsView) projectsView.classList.add('active');
            filmSnapTrack.scrollTop = currentIndex * filmSnapTrack.clientHeight;
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
    
    // Run router on load
    handleRouting();
});

// Website performance load timing analytics
window.addEventListener('load', function() {
    // Wait a brief moment to ensure all performance metrics are fully computed and populated by the browser
    setTimeout(function() {
        if (typeof gtag !== 'function') return;
        
        try {
            const navEntry = performance.getEntriesByType('navigation')[0];
            if (!navEntry) return;

            // Page Load Time (navigation start to load event end)
            const loadTime = Math.round(navEntry.loadEventEnd);
            // DOM Content Loaded (navigation start to domContentLoaded end)
            const domLoaded = Math.round(navEntry.domContentLoadedEventEnd);
            // Connection time (TCP + SSL + DNS)
            const connectionTime = Math.round(navEntry.connectEnd - navEntry.connectStart);

            const performancePayload = {
                'page_load_time_ms': loadTime,
                'dom_content_loaded_ms': domLoaded,
                'connection_time_ms': connectionTime,
                'page_path': window.location.pathname
            };

            // Capture First Contentful Paint (FCP) if supported
            const paintEntries = performance.getEntriesByType('paint');
            const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
                performancePayload['first_contentful_paint_ms'] = Math.round(fcpEntry.startTime);
            }

            // Report to Google Analytics 4
            gtag('event', 'performance_timing', performancePayload);
            console.log('Performance metrics reported to GA4:', performancePayload);
        } catch (error) {
            console.warn('Unable to log performance metrics:', error);
        }
    }, 1000);
});
