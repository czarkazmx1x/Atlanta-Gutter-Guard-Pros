// ==================================================================
// ATLANTA GUTTER GUARD PROS - N8N AI CHATBOT - CORS FIXED VERSION
// ==================================================================
// Professional AI chatbot for gutter guard lead generation
// Uses Cloudflare Worker proxy to bypass CORS issues
// ==================================================================

(function() {
    'use strict';
    
    // Configuration - CORS Proxy URL (FIXES CORS ISSUES!)
    const CORS_PROXY_URL = 'https://atlanta-gutter-n8n-proxy.acostajohn-qe.workers.dev';
    const N8N_WEBHOOK_PARAM = '?webhook=n8n';
    
    // Session management for conversation memory
    const sessionId = 'atlanta_gutter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    
    console.log('🏠 Atlanta Gutter Guard Pros - Chat Session ID:', sessionId);
    console.log('✅ Using CORS proxy for N8N communication');
    
    // Remove any existing chat widgets (but preserve our own)
    function removeExistingChats() {
        const selectors = [
            '#chatwood-launcher',
            '#chatwoot-widget', 
            '.chatwoot-widget',
            '.chat-widget:not(#n8n-gutter-chat):not(#gutter-chat-launcher)'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el.id !== 'n8n-gutter-chat' && el.id !== 'gutter-chat-launcher') {
                    console.log('Removing conflicting chat element:', el);
                    el.remove();
                }
            });
        });
    }
    
    // CORS-free message sending via Cloudflare Worker proxy
    async function sendMessageToChatbot(message) {
        try {
            console.log('📤 Sending to N8N via CORS proxy:', {
                message: message,
                sessionId: sessionId
            });
            
            const requestData = {
                message: message,
                sessionId: sessionId,
                chatInput: message,
                timestamp: new Date().toISOString(),
                source: 'atlantagutterguardpros.com'
            };
            
            // Use CORS proxy to reach N8N
            const response = await fetch(CORS_PROXY_URL + N8N_WEBHOOK_PARAM, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const responseData = await response.json();
            console.log('📥 Received from N8N:', responseData);
            
            return {
                message: responseData.message || responseData.response || "Thanks for your message! I'm here to help with gutter guards.",
                timestamp: new Date().toISOString(),
                sessionId: sessionId
            };
            
        } catch (error) {
            console.error('❌ Chat error:', error);
            return {
                message: "I'm having trouble connecting right now. Please call us at (470) 851-6780 for immediate assistance with gutter guards!",
                timestamp: new Date().toISOString(),
                sessionId: sessionId,
                error: true
            };
        }
    }
    
    // Create modern AI chat interface
    function createGutterChatWidget() {
        // Create chat container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'n8n-gutter-chat';
        chatContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 360px;
            height: 520px;
            z-index: 999999;
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
            background: white;
            display: none;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        
        // Chat header
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 16px;
            border-radius: 16px 16px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        header.innerHTML = `
            <div>
                <div style="font-weight: 600; font-size: 16px;">Atlanta Gutter Guard Pros</div>
                <div style="font-size: 12px; opacity: 0.9;">Get Your Free Quote in 60 Seconds!</div>
            </div>
            <button id="close-chat" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">×</button>
        `;
        
        // Messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.id = 'chat-messages';
        messagesContainer.style.cssText = `
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background: #f8fafc;
        `;
        
        // Initial welcome message
        const welcomeMessage = document.createElement('div');
        welcomeMessage.style.cssText = `
            background: white;
            padding: 12px;
            border-radius: 12px;
            margin-bottom: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        `;
        welcomeMessage.innerHTML = `
            <div style="font-size: 14px; color: #374151; line-height: 1.4;">
                Hi! I'm Sarah from Atlanta Gutter Guard Pros. I'm here to help protect your home with premium gutter guards. What's your name?
            </div>
            <div style="font-size: 11px; color: #9ca3af; margin-top: 8px;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        messagesContainer.appendChild(welcomeMessage);
        
        // Input container
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            padding: 16px;
            background: white;
            border-radius: 0 0 16px 16px;
            border-top: 1px solid #e5e7eb;
        `;
        
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = 'Type your message here...';
        inputBox.style.cssText = `
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            box-sizing: border-box;
        `;
        
        inputContainer.appendChild(inputBox);
        
        // Assemble chat widget
        chatContainer.appendChild(header);
        chatContainer.appendChild(messagesContainer);
        chatContainer.appendChild(inputContainer);
        
        // Create chat launcher button
        const launcher = document.createElement('button');
        launcher.id = 'gutter-chat-launcher';
        launcher.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 999998;
            box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
            transition: transform 0.2s ease;
        `;
        launcher.innerHTML = '💬';
        
        // Add hover effect
        launcher.addEventListener('mouseenter', () => {
            launcher.style.transform = 'scale(1.1)';
        });
        launcher.addEventListener('mouseleave', () => {
            launcher.style.transform = 'scale(1)';
        });
        
        // Toggle chat visibility
        launcher.addEventListener('click', () => {
            const isVisible = chatContainer.style.display === 'flex';
            chatContainer.style.display = isVisible ? 'none' : 'flex';
            launcher.style.display = isVisible ? 'block' : 'none';
        });
        
        // Close chat
        header.querySelector('#close-chat').addEventListener('click', () => {
            chatContainer.style.display = 'none';
            launcher.style.display = 'block';
        });
        
        // Handle message sending
        async function sendMessage() {
            const message = inputBox.value.trim();
            if (!message) return;
            
            // Add user message to chat
            addMessageToChat(message, 'user');
            inputBox.value = '';
            
            // Show typing indicator
            const typingDiv = addMessageToChat('Sarah is typing...', 'bot', true);
            
            try {
                // Send to N8N via proxy
                const response = await sendMessageToChatbot(message);
                
                // Remove typing indicator
                typingDiv.remove();
                
                // Add bot response
                addMessageToChat(response.message, 'bot');
                
            } catch (error) {
                typingDiv.remove();
                addMessageToChat('Sorry, I\'m having trouble right now. Please call (470) 851-6780!', 'bot');
            }
        }
        
        // Add message to chat interface
        function addMessageToChat(message, sender, isTyping = false) {
            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `
                background: ${sender === 'user' ? '#2563eb' : 'white'};
                color: ${sender === 'user' ? 'white' : '#374151'};
                padding: 12px;
                border-radius: 12px;
                margin-bottom: 12px;
                max-width: 85%;
                margin-left: ${sender === 'user' ? 'auto' : '0'};
                margin-right: ${sender === 'user' ? '0' : 'auto'};
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                ${isTyping ? 'opacity: 0.7; font-style: italic;' : ''}
            `;
            
            messageDiv.innerHTML = `
                <div style="font-size: 14px; line-height: 1.4;">${message}</div>
                <div style="font-size: 11px; opacity: 0.7; margin-top: 8px;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            return messageDiv;
        }
        
        // Send message on Enter key
        inputBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Add to page
        document.body.appendChild(chatContainer);
        document.body.appendChild(launcher);
        
        console.log('✅ Atlanta Gutter Guard Pros chatbot widget created successfully');
    }
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChat);
    } else {
        initializeChat();
    }
    
    function initializeChat() {
        removeExistingChats();
        createGutterChatWidget();
        console.log('🚀 Atlanta Gutter Guard Pros AI Chat loaded successfully!');
        console.log('🔗 Connected to n8n AI system - ready for live conversations!');
    }
    
})();
