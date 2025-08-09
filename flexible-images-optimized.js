// Optimized Flexible Images - Lazy loading and WebP support
(function() {
    'use strict';
    
    // WebP support detection
    function supportsWebP() {
        if (window.webpSupported !== undefined) return window.webpSupported;
        
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        window.webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        return window.webpSupported;
    }
    
    // Intersection Observer for lazy loading
    let imageObserver;
    
    function initializeImageObserver() {
        if ('IntersectionObserver' in window) {
            imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
        }
    }
    
    function loadImage(img) {
        // Handle picture elements with WebP
        const picture = img.closest('picture');
        if (picture) {
            const sources = picture.querySelectorAll('source');
            sources.forEach(source => {
                if (source.srcset && supportsWebP() && source.type === 'image/webp') {
                    img.src = source.srcset;
                    return;
                }
            });
        }
        
        // Fallback to original src if no picture element or WebP not supported
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    }
    
    function processImages() {
        const images = document.querySelectorAll('img[loading="lazy"], [data-flexible="true"]');
        
        images.forEach(img => {
            // Add CSS for smooth loading
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            if (imageObserver) {
                // Use Intersection Observer for lazy loading
                if (img.loading === 'lazy') {
                    imageObserver.observe(img);
                } else {
                    // Load immediately for eager images
                    loadImage(img);
                }
            } else {
                // Fallback for browsers without Intersection Observer
                loadImage(img);
            }
        });
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializeImageObserver();
            processImages();
        });
    } else {
        initializeImageObserver();
        processImages();
    }
})();
