/**
 * Atlanta Gutter Guard Pros - Widget Override Script
 * Forces correct tenant configuration
 */

(function() {
    // Remove any existing widget first
    const existingElements = [
        '#service-bot-widget',
        '#service-bot-toggle',
        '#service-bot-frame',
        '.service-bot-container'
    ];
    
    existingElements.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.remove();
    });
    
    // Clear any existing config
    delete window.ServiceBotConfig;
    delete window.ServiceBot;
    
    // Set the correct configuration
    window.ServiceBotConfig = {
        tenant: 'atlantagutter',
        tenantId: 'atlantagutter',
        businessName: 'Atlanta Gutter Guard Pros',
        assistantName: 'Alex',
        primaryColor: '#2c3e50',
        phoneNumber: '(323) 325-1319',
        apiUrl: 'https://superhuman.services',
        industry: 'gutter',
        services: ['Gutter Guards', 'Gutter Cleaning', 'Gutter Repair', 'Emergency Service'],
        responseStyle: 'professional',
        overrideDefaults: true
    };
    
    // Force load the widget with correct config
    const loadWidget = () => {
        const script = document.createElement('script');
        script.src = 'https://superhuman.services/widget.js?tenant=atlantagutter&t=' + Date.now();
        script.dataset.tenant = 'atlantagutter';
        script.dataset.business = 'Atlanta Gutter Guard Pros';
        
        script.onload = () => {
            console.log('Widget loaded for Atlanta Gutter Guard Pros');
            
            // Double-check configuration after load
            if (window.ServiceBot && window.ServiceBot.config) {
                window.ServiceBot.config.tenant = 'atlantagutter';
                window.ServiceBot.config.businessName = 'Atlanta Gutter Guard Pros';
                window.ServiceBot.config.assistantName = 'Alex';
            }
        };
        
        document.head.appendChild(script);
    };
    
    // Load immediately and after DOM ready
    loadWidget();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadWidget);
    }
})();
