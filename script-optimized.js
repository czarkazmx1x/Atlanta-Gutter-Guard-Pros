// Optimized Script - Minimal and efficient
(function() {
    'use strict';
    
    // Form handling with debouncing
    function handleForm() {
        const form = document.getElementById('quote-form');
        if (!form) return;
        
        let submitTimeout;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Prevent rapid submissions
            if (submitTimeout) return;
            
            submitTimeout = setTimeout(() => {
                submitTimeout = null;
            }, 2000);
            
            // Get form data efficiently
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success message
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Submitted!';
            button.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! We\'ll contact you within 15 minutes during business hours.');
                form.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 500);
            
            // Track conversion
            if (window.gtag) {
                gtag('event', 'generate_lead', {
                    'event_category': 'engagement',
                    'event_label': 'quote_form'
                });
            }
        });
    }
    
    // Track phone clicks efficiently
    function trackPhoneCalls() {
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href^="tel:"]')) {
                if (window.gtag) {
                    gtag('event', 'click_to_call', {
                        'event_category': 'engagement',
                        'event_label': 'phone_number'
                    });
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            handleForm();
            trackPhoneCalls();
        });
    } else {
        handleForm();
        trackPhoneCalls();
    }
})();
