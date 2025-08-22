// Flexible Images Script for Atlanta Gutter Guard Pros
// Handles responsive image loading and optimization

document.addEventListener('DOMContentLoaded', function() {
    console.log('Flexible images script loaded');
    
    // Handle lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
    
    // Handle image error loading
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // You could set a placeholder image here
            // this.src = '/images/placeholder.jpg';
        });
    });
});
