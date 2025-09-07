// Example fix for widget.js on superhuman.services
// This shows what needs to be changed in the widget code

// CURRENT (BROKEN) - widget.js probably has something like:
const config = window.ServiceBotConfig || {};
const tenant = config.tenant || 'demo';

// SHOULD BE CHANGED TO:
// Get tenant from multiple sources
function getTenant() {
    // 1. Check URL parameter in script tag
    const scriptTag = document.currentScript || document.querySelector('script[src*="widget.js"]');
    if (scriptTag && scriptTag.src) {
        const url = new URL(scriptTag.src);
        const urlTenant = url.searchParams.get('tenant');
        if (urlTenant) return urlTenant;
    }
    
    // 2. Check window config
    if (window.ServiceBotConfig && window.ServiceBotConfig.tenant) {
        return window.ServiceBotConfig.tenant;
    }
    
    // 3. Check data attribute
    if (scriptTag && scriptTag.dataset.tenant) {
        return scriptTag.dataset.tenant;
    }
    
    // 4. Default fallback
    return 'demo';
}

const tenant = getTenant();
console.log('Service Bot loading for tenant:', tenant);

// Then use this tenant value when making API calls:
fetch(`https://superhuman.services/api/config/${tenant}`)
    .then(res => res.json())
    .then(config => {
        // This should return Alex for atlantagutter
        initializeWidget(config);
    });
