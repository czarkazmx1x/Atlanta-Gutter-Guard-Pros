// Form handling and tracking
document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submission
    const form = document.getElementById('quote-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send to your backend
            // For now, just show success message
            alert('Thank you! We\'ll contact you within 15 minutes during business hours.');
            
            // Track conversion (if using analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    'event_category': 'engagement',
                    'event_label': 'quote_form'
                });
            }
            
            // Reset form
            form.reset();
        });
    }
    
    // Track phone clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click_to_call', {
                    'event_category': 'engagement',
                    'event_label': 'phone_number'
                });
            }
        });
    });
});