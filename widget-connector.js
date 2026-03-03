/**
 * Atlanta Gutter Guard Pros - Widget Connector
 * Connects to your existing superhuman.services platform
 */

(function() {
  // Remove any existing widget to prevent duplicates
  const existingWidget = document.getElementById('service-bot-widget');
  if (existingWidget) {
    existingWidget.remove();
  }

  // Configure for Atlanta Gutter tenant
  window.ServiceBotConfig = {
    tenant: 'atlantagutter',
    businessName: 'Atlanta Gutter Guard Pros',
    serverUrl: 'https://superhuman.services',
    primaryColor: '#2c3e50',
    phoneNumber: '(323) 325-1319'
  };

  // Load the widget from your platform
  const script = document.createElement('script');
  script.src = 'https://superhuman.services/widget.js';
  script.async = true;
  
  // Handle loading errors
  script.onerror = function() {
    console.error('Failed to load Service Bot widget. Trying fallback...');
    // Try alternate loading method
    loadFallbackWidget();
  };
  
  document.head.appendChild(script);
  
  // Fallback method if direct script loading fails
  function loadFallbackWidget() {
    // Create iframe widget as backup
    const iframe = document.createElement('iframe');
    iframe.id = 'service-bot-frame';
    iframe.src = 'https://atlantagutter.superhuman.services/widget';
    iframe.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999999;
      display: none;
    `;
    
    // Add toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'service-bot-toggle';
    toggleBtn.innerHTML = '💬';
    toggleBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #2c3e50;
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999998;
    `;
    
    toggleBtn.onclick = function() {
      const frame = document.getElementById('service-bot-frame');
      if (frame.style.display === 'none') {
        frame.style.display = 'block';
        toggleBtn.style.display = 'none';
      }
    };
    
    document.body.appendChild(iframe);
    document.body.appendChild(toggleBtn);
  }
  
  // Add custom CSS for better integration
  const style = document.createElement('style');
  style.textContent = `
    /* Service Bot Widget Customization */
    #service-bot-widget {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    /* Mobile responsive */
    @media (max-width: 768px) {
      #service-bot-frame {
        width: 100vw !important;
        height: 100vh !important;
        bottom: 0 !important;
        right: 0 !important;
        border-radius: 0 !important;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Analytics tracking
  window.ServiceBotAnalytics = {
    track: function(event, data) {
      if (window.gtag) {
        window.gtag('event', 'service_bot_' + event, data);
      }
    }
  };
  
})();
