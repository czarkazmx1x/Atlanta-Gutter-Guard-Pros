// Session Memory Fix for Atlanta Gutter Guard Pros N8N Chatbot
// Fixes the conversation loop issue by maintaining session state

(function() {
    'use strict';
    
    // Generate unique session ID for this browser session
    const sessionId = 'atlanta_gutter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    
    // Store in sessionStorage so it persists during page session
    if (!sessionStorage.getItem('atlantaGutterChatSessionId')) {
        sessionStorage.setItem('atlantaGutterChatSessionId', sessionId);
    }
    
    const currentSessionId = sessionStorage.getItem('atlantaGutterChatSessionId');
    console.log('🏠 Atlanta Gutter Guard Pros - Chat Session ID:', currentSessionId);
    
    // Wait for page to load, then enhance the chatbot
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(enhanceChatbot, 2000); // Wait for n8n chat to load
    });
    
    function enhanceChatbot() {
        // Override global fetch to inject sessionId into N8N webhook calls
        const originalFetch = window.fetch;
        
        window.fetch = function(url, options) {
            // Only modify requests to N8N webhooks
            if (options && 
                options.method === 'POST' && 
                (url.includes('webhook') || url.includes('n8n'))) {
                
                try {
                    const body = JSON.parse(options.body);
                    
                    // Add sessionId for Window Buffer Memory
                    const enhancedBody = {
                        ...body,
                        sessionId: currentSessionId,
                        chatInput: body.message // Maintain compatibility with existing setup
                    };
                    
                    options.body = JSON.stringify(enhancedBody);
                    
                    // Debug logging
                    console.log('📤 Sending to N8N (Atlanta Gutter):', {
                        message: body.message,
                        sessionId: currentSessionId
                    });
                    
                } catch (error) {
                    console.warn('⚠️ Failed to enhance message:', error);
                }
            }
            
            // Call original fetch
            return originalFetch.apply(this, arguments);
        };
        
        console.log('✅ Atlanta Gutter Guard Pros chatbot enhanced with session memory');
    }
    
    // Utility functions for debugging
    window.atlantaGutterChatDebug = {
        getSessionId: () => currentSessionId,
        resetSession: () => {
            sessionStorage.removeItem('atlantaGutterChatSessionId');
            location.reload();
        },
        log: (message) => console.log('🏠 Atlanta Gutter Chat:', message)
    };
    
})();
