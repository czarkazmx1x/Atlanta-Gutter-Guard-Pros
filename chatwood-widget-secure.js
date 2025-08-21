// ==================================================================
// IMPORTANT: Chatwoot Integration Instructions
// ==================================================================
// 
// The current implementation is being blocked due to mixed content
// (HTTPS website trying to load HTTP resources).
//
// To fix this, you need to:
//
// 1. Set up SSL for your Chatwoot server at chatwood.superhuman.services
// 2. Update all widget URLs to use HTTPS
// 3. Or use the iframe-bypass method below
//
// ==================================================================

// TEMPORARY SOLUTION - Pure JavaScript Chat Button
// This creates a chat button without loading external resources

function addChatwootWidget() {
    // Remove any existing launcher
    const existingLauncher = document.getElementById('chatwood-launcher');
    if (existingLauncher) {
        existingLauncher.remove();
    }
    
    // Create the launcher button
    const launcher = document.createElement('button');
    launcher.id = 'chatwood-launcher';
    launcher.innerHTML = '💬';
    launcher.setAttribute('aria-label', 'Chat with Atlanta Gutter Guard Pros');
    
    // Add inline styles to avoid external CSS
    launcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #2e7d32;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
        z-index: 99999;
        font-size: 28px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add hover effect
    launcher.onmouseover = function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(46, 125, 50, 0.4)';
    };
    
    launcher.onmouseout = function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(46, 125, 50, 0.3)';
    };
    
    // Configuration
    const CHATWOOD_URL = 'http://142.93.194.30:3000';
    const WIDGET_TOKEN = 'vK8J1K7q3xvDcXBnfenqVhaG';
    
    // Click handler - opens in popup window
    launcher.addEventListener('click', function() {
        const width = 400;
        const height = 600;
        const left = window.innerWidth - width - 40;
        const top = 80;
        
        // Open in a new window to bypass mixed content restrictions
        const chatWindow = window.open(
            `${CHATWOOD_URL}/widget?website_token=${WIDGET_TOKEN}`,
            'chatwood-widget',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
        
        // Focus the window if it was already open
        if (chatWindow) {
            chatWindow.focus();
        }
    });
    
    // Add to page
    document.body.appendChild(launcher);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addChatwootWidget);
} else {
    addChatwootWidget();
}
