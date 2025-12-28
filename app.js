/**
 * Avancement à la classe 1 — Zineddine Chergui
 * JavaScript — Navigation, recherche et interactions
 * 
 * Features:
 * 1. Sticky Table of Contents with active state
 * 2. Smooth scroll to anchors
 * 3. Expand/Collapse for sections
 * 4. Print functionality
 * 5. Client-side search filtering
 * 6. Mobile navigation toggle
 * 7. Image placeholder handling
 */

(function() {
    'use strict';

    // ==========================================================================
    // DOM Elements
    // ==========================================================================
    
    const elements = {
        toc: document.getElementById('toc'),
        tocToggle: document.getElementById('toc-toggle'),
        tocList: document.getElementById('toc-list'),
        tocLinks: document.querySelectorAll('.toc-list a'),
        searchInput: document.getElementById('search-input'),
        printBtn: document.getElementById('print-btn'),
        sections: document.querySelectorAll('.section'),
        collapsibles: document.querySelectorAll('.collapsible-toggle'),
        illustrationPlaceholders: document.querySelectorAll('.illustration-placeholder')
    };

    // ==========================================================================
    // Configuration
    // ==========================================================================
    
    const config = {
        scrollOffset: 100,           // Offset for scroll position
        intersectionThreshold: 0.2,  // Threshold for section visibility
        debounceDelay: 100,          // Debounce delay for scroll events
        searchMinLength: 2           // Minimum search query length
    };

    // ==========================================================================
    // Utility Functions
    // ==========================================================================
    
    /**
     * Debounce function to limit execution rate
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Normalize text for search comparison
     * @param {string} text - Text to normalize
     * @returns {string} Normalized text
     */
    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .trim();
    }

    // ==========================================================================
    // Table of Contents - Active State
    // ==========================================================================
    
    /**
     * Update active state in TOC based on scroll position
     */
    function updateTocActiveState() {
        const scrollPosition = window.scrollY + config.scrollOffset;
        
        let currentSection = null;
        
        elements.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Update active class on TOC links
        elements.tocLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Initialize Intersection Observer for TOC active state
     */
    function initTocObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    elements.tocLinks.forEach(link => {
                        const href = link.getAttribute('href').substring(1);
                        
                        if (href === id) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        elements.sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ==========================================================================
    // Smooth Scroll
    // ==========================================================================
    
    /**
     * Initialize smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile TOC if open
                    if (elements.toc.classList.contains('open')) {
                        closeMobileToc();
                    }
                    
                    // Scroll to element
                    const targetPosition = targetElement.offsetTop - config.scrollOffset + 50;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);
                    
                    // Focus the target for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus({ preventScroll: true });
                }
            });
        });
    }

    // ==========================================================================
    // Mobile Navigation
    // ==========================================================================
    
    /**
     * Toggle mobile TOC
     */
    function toggleMobileToc() {
        const isOpen = elements.toc.classList.toggle('open');
        elements.tocToggle.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            // Trap focus inside TOC when open
            elements.searchInput.focus();
        }
    }

    /**
     * Close mobile TOC
     */
    function closeMobileToc() {
        elements.toc.classList.remove('open');
        elements.tocToggle.setAttribute('aria-expanded', 'false');
    }

    /**
     * Initialize mobile navigation
     */
    function initMobileNav() {
        if (elements.tocToggle) {
            elements.tocToggle.addEventListener('click', toggleMobileToc);
        }
        
        // Close TOC when clicking outside
        document.addEventListener('click', (e) => {
            if (elements.toc.classList.contains('open') && 
                !elements.toc.contains(e.target) && 
                !elements.tocToggle.contains(e.target)) {
                closeMobileToc();
            }
        });
        
        // Close TOC on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.toc.classList.contains('open')) {
                closeMobileToc();
                elements.tocToggle.focus();
            }
        });
    }

    // ==========================================================================
    // Collapsible Sections
    // ==========================================================================
    
    /**
     * Toggle collapsible section
     * @param {HTMLElement} toggle - Toggle button element
     */
    function toggleCollapsible(toggle) {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        const contentId = toggle.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        
        if (content) {
            toggle.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('collapsed', isExpanded);
        }
    }

    /**
     * Initialize collapsible sections
     */
    function initCollapsibles() {
        elements.collapsibles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggleCollapsible(toggle);
            });
            
            // Keyboard support
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCollapsible(toggle);
                }
            });
        });
    }

    // ==========================================================================
    // Print Functionality
    // ==========================================================================
    
    /**
     * Initialize print button
     */
    function initPrint() {
        if (elements.printBtn) {
            elements.printBtn.addEventListener('click', () => {
                // Expand all collapsibles before printing
                elements.collapsibles.forEach(toggle => {
                    const contentId = toggle.getAttribute('aria-controls');
                    const content = document.getElementById(contentId);
                    
                    if (content && content.classList.contains('collapsed')) {
                        toggle.setAttribute('aria-expanded', 'true');
                        content.classList.remove('collapsed');
                    }
                });
                
                // Trigger print dialog
                window.print();
            });
        }
    }

    // ==========================================================================
    // Search Functionality
    // ==========================================================================
    
    /**
     * Search and filter sections based on query
     * @param {string} query - Search query
     */
    function searchSections(query) {
        const normalizedQuery = normalizeText(query);
        
        if (normalizedQuery.length < config.searchMinLength) {
            // Show all sections if query is too short
            elements.sections.forEach(section => {
                section.classList.remove('search-hidden');
            });
            
            elements.tocLinks.forEach(link => {
                link.parentElement.classList.remove('search-hidden');
            });
            
            return;
        }
        
        // Search through sections
        elements.sections.forEach(section => {
            const sectionTitle = section.querySelector('.section-title');
            const sectionContent = section.querySelector('.section-content');
            
            const titleText = sectionTitle ? normalizeText(sectionTitle.textContent) : '';
            const contentText = sectionContent ? normalizeText(sectionContent.textContent) : '';
            
            const matches = titleText.includes(normalizedQuery) || contentText.includes(normalizedQuery);
            
            section.classList.toggle('search-hidden', !matches);
        });
        
        // Update TOC visibility
        elements.tocLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            const section = document.getElementById(href);
            
            if (section) {
                const isHidden = section.classList.contains('search-hidden');
                link.parentElement.classList.toggle('search-hidden', isHidden);
            }
        });
    }

    /**
     * Initialize search functionality
     */
    function initSearch() {
        if (elements.searchInput) {
            const debouncedSearch = debounce((e) => {
                searchSections(e.target.value);
            }, config.debounceDelay);
            
            elements.searchInput.addEventListener('input', debouncedSearch);
            
            // Clear search on Escape
            elements.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    e.target.value = '';
                    searchSections('');
                }
            });
        }
    }

    // ==========================================================================
    // Image Placeholder Handling
    // ==========================================================================
    
    /**
     * Try to load actual images for placeholders
     */
    function initImagePlaceholders() {
        elements.illustrationPlaceholders.forEach(placeholder => {
            const imageSrc = placeholder.dataset.src;
            
            if (imageSrc) {
                const img = new Image();
                
                img.onload = function() {
                    // Image exists, replace placeholder content
                    placeholder.innerHTML = '';
                    placeholder.appendChild(img);
                    placeholder.classList.add('has-image');
                };
                
                img.onerror = function() {
                    // Image doesn't exist, keep placeholder
                    console.log(`Image not found: ${imageSrc}`);
                };
                
                img.src = imageSrc;
                img.alt = placeholder.querySelector('.placeholder-text')?.textContent || 'Illustration';
            }
        });
    }

    // ==========================================================================
    // Lightbox (Image Zoom)
    // ==========================================================================
    
    let currentGalleryImages = [];
    let currentImageIndex = 0;
    
    /**
     * Open lightbox with image
     * @param {string} src - Image source
     * @param {string} caption - Image caption
     * @param {Array} galleryImages - Array of all images in the gallery
     * @param {number} index - Current image index in gallery
     */
    function openLightbox(src, caption, galleryImages = [], index = 0) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        if (!lightbox || !lightboxImg) return;
        
        currentGalleryImages = galleryImages;
        currentImageIndex = index;
        
        lightboxImg.src = src;
        lightboxImg.alt = caption || 'Image agrandie';
        lightboxCaption.textContent = caption || '';
        
        // Show/hide navigation buttons
        if (galleryImages.length > 1) {
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus close button for accessibility
        document.getElementById('lightbox-close').focus();
    }
    
    /**
     * Close lightbox
     */
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Navigate to previous image
     */
    function prevImage() {
        if (currentGalleryImages.length === 0) return;
        
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        updateLightboxImage();
    }
    
    /**
     * Navigate to next image
     */
    function nextImage() {
        if (currentGalleryImages.length === 0) return;
        
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        updateLightboxImage();
    }
    
    /**
     * Update lightbox image based on current index
     */
    function updateLightboxImage() {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        if (!lightboxImg || currentGalleryImages.length === 0) return;
        
        const currentImg = currentGalleryImages[currentImageIndex];
        lightboxImg.src = currentImg.src;
        lightboxImg.alt = currentImg.caption || 'Image agrandie';
        lightboxCaption.textContent = currentImg.caption || '';
        
        // Re-trigger animation
        lightboxImg.style.animation = 'none';
        lightboxImg.offsetHeight; // Trigger reflow
        lightboxImg.style.animation = 'lightbox-zoom-in 0.3s ease';
    }
    
    /**
     * Initialize lightbox functionality
     */
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        if (!lightbox) return;
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', prevImage);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextImage);
        }
        
        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        });
        
        // Attach click handlers to all illustration images
        document.querySelectorAll('.illustration-item img').forEach(img => {
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', () => {
                // Get all images in the same gallery
                const gallery = img.closest('.illustrations-grid');
                const galleryImgs = gallery ? gallery.querySelectorAll('.illustration-item img') : [img];
                
                const galleryImages = Array.from(galleryImgs).map(gImg => ({
                    src: gImg.src,
                    caption: gImg.closest('figure')?.querySelector('figcaption')?.textContent || gImg.alt
                }));
                
                const index = Array.from(galleryImgs).indexOf(img);
                const caption = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt;
                
                openLightbox(img.src, caption, galleryImages, index);
            });
        });
    }

    // ==========================================================================
    // Keyboard Navigation
    // ==========================================================================
    
    /**
     * Initialize keyboard navigation enhancements
     */
    function initKeyboardNav() {
        // Handle keyboard navigation in TOC
        elements.tocLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                let targetIndex = index;
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        targetIndex = Math.min(index + 1, elements.tocLinks.length - 1);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        targetIndex = Math.max(index - 1, 0);
                        break;
                    case 'Home':
                        e.preventDefault();
                        targetIndex = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        targetIndex = elements.tocLinks.length - 1;
                        break;
                    default:
                        return;
                }
                
                elements.tocLinks[targetIndex].focus();
            });
        });
    }

    // ==========================================================================
    // Scroll Progress Indicator (Optional Enhancement)
    // ==========================================================================
    
    /**
     * Update scroll progress indicator
     */
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Could be used to update a progress bar if added to the UI
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    }

    // ==========================================================================
    // URL Hash Handling
    // ==========================================================================
    
    /**
     * Handle initial URL hash
     */
    function handleInitialHash() {
        const hash = window.location.hash;
        
        if (hash) {
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                // Delay scroll to ensure page is fully loaded
                setTimeout(() => {
                    const targetPosition = targetElement.offsetTop - config.scrollOffset + 50;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }

    // ==========================================================================
    // Accessibility Enhancements
    // ==========================================================================
    
    /**
     * Initialize accessibility features
     */
    function initAccessibility() {
        // Add focus visible styles support
        document.body.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });
        
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
        
        // Announce page title to screen readers
        const pageTitle = document.querySelector('.site-title');
        if (pageTitle) {
            pageTitle.setAttribute('role', 'heading');
            pageTitle.setAttribute('aria-level', '1');
        }
    }

    // ==========================================================================
    // Performance Optimizations
    // ==========================================================================
    
    /**
     * Lazy load sections that are below the fold
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                        lazyObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '100px'
            });
            
            elements.sections.forEach(section => {
                lazyObserver.observe(section);
            });
        }
    }

    // ==========================================================================
    // Initialize Application
    // ==========================================================================
    
    /**
     * Main initialization function
     */
    function init() {
        // Core features
        initSmoothScroll();
        initTocObserver();
        initMobileNav();
        initCollapsibles();
        initPrint();
        initSearch();
        initImagePlaceholders();
        initLightbox();
        initKeyboardNav();
        initAccessibility();
        initLazyLoading();
        
        // Handle initial hash
        handleInitialHash();
        
        // Scroll event listeners (debounced)
        const debouncedScrollHandler = debounce(() => {
            updateTocActiveState();
            updateScrollProgress();
        }, 10);
        
        window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
        
        // Initial state
        updateTocActiveState();
        
        console.log('Avancement à la classe 1 — Site initialized');
    }

    // ==========================================================================
    // DOM Ready
    // ==========================================================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

