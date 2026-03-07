/**
 * Lead Tracking & Conversion Script
 * Atlanta Gutter Guard Pros & Gulf Armor Roofing
 */

(function () {
    'use strict';

    // 1. GA4 Configuration (User ID added)
    const GA_MEASUREMENT_ID = 'G-MEDDES5FFS';

    if (GA_MEASUREMENT_ID !== 'G-XXXXXXX') {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
    } else {
        // Fallback for logging if no ID is present
        window.gtag = function (type, action, data) {
            console.log(`[Tracking] ${type} - ${action}:`, data);
        };
    }

    // 2. Event Interceptors
    document.addEventListener('DOMContentLoaded', () => {
        // Track Phone Number Clicks
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                gtag('event', 'lead_call_click', {
                    'phone_number': link.href.replace('tel:', ''),
                    'page_location': window.location.pathname
                });
            });
        });

        // Track Contact Form Clicks (if ID exists)
        const contactBtn = document.querySelector('.btn-primary, .cta-button');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                gtag('event', 'conversion_intent_click', {
                    'button_text': contactBtn.innerText,
                    'page_location': window.location.pathname
                });
            });
        }
    });

    // 3. Global Tracking Functions (Exposed for Calculators)
    window.trackCalculatorUsage = function (site, tool, data) {
        gtag('event', 'calculator_use', {
            'site_name': site,
            'tool_name': tool,
            'input_data': data
        });
    };

    window.trackLeadConversion = function (type, method) {
        gtag('event', 'generate_lead', {
            'lead_type': type,
            'lead_method': method
        });
    };

    console.log('✅ Lead Tracking Framework Active');
})();
