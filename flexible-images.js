// Flexible Images Script - Handles image loading with fallbacks
document.addEventListener('DOMContentLoaded', function() {
    const flexibleImages = document.querySelectorAll('[data-flexible="true"]');
    
    flexibleImages.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, hide it
            this.style.display = 'none';
            console.log('Image failed to load:', this.src);
        });
        
        img.addEventListener('load', function() {
            // Image loaded successfully
            this.style.opacity = '1';
        });
    });
});
