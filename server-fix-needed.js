// PROBLEM: widget.js is ignoring the tenant parameter
// Here's what needs to be fixed on the server

// FILE: widget.js (on superhuman.services)
// CURRENT PROBLEM - it probably looks like this:

const widgetConfig = {
    name: 'Sam',
    title: 'Your HVAC Assistant',
    tenant: 'demo'  // <-- This is hardcoded!
};

// FIX NEEDED - Change to this:

// 1. Get the script tag that loaded widget.js
const currentScript = document.currentScript || 
    document.querySelector('script[src*="widget.js"]');

// 2. Parse the tenant from URL
let tenant = 'demo'; // default
if (currentScript && currentScript.src) {
    const url = new URL(currentScript.src);
    tenant = url.searchParams.get('tenant') || 'demo';
}

// 3. Fetch the correct config based on tenant
fetch(`/api/tenants/${tenant}/config`)
    .then(res => res.json())
    .then(config => {
        // This should return:
        // For atlantagutter: { name: 'Alex', title: 'Your Gutter Guard Expert' }
        // For demo: { name: 'Sam', title: 'Your HVAC Assistant' }
        initializeWidget(config);
    });

// OR - Quick hardcoded fix for now:
const tenantConfigs = {
    'atlantagutter': {
        name: 'Alex',
        title: 'Your Gutter Guard Expert',
        businessName: 'Atlanta Gutter Guard Pros',
        primaryColor: '#2c3e50',
        phoneNumber: '(323) 325-1319'
    },
    'demo': {
        name: 'Sam',
        title: 'Your HVAC Assistant',
        businessName: 'Demo HVAC Company',
        primaryColor: '#3b82f6',
        phoneNumber: '1-800-DEMO'
    }
};

// Use the correct config
const config = tenantConfigs[tenant] || tenantConfigs['demo'];
