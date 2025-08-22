// ==================================================================
// TEMPLATE: N8N CHATBOT FOR NEW BUSINESS - QUICK SETUP
// ==================================================================
// 1. Replace all placeholder values below with your business info
// 2. Deploy the Cloudflare Worker (see instructions)
// 3. Add this script to your website
// ==================================================================

(function() {
    'use strict';
    
    // ======================================
    // 🔧 CUSTOMIZE THESE VALUES FOR YOUR BUSINESS
    // ======================================
    const BUSINESS_CONFIG = {
        name: "YOUR_BUSINESS_NAME",                    // e.g., "Smith Plumbing Services"
        agentName: "YOUR_AGENT_NAME",                  // e.g., "Sarah"
        phone: "YOUR_PHONE_NUMBER",                    // e.g., "(555) 123-4567"
        services: "YOUR_SERVICES",                     // e.g., "plumbing services"
        domain: "yourdomain.com",                      // e.g., "smithplumbing.com"
        corsProxyUrl: "https://your-worker.your-account.workers.dev"  // Your Cloudflare Worker URL
    };
    
    // ======================================
    // 🎨 OPTIONAL: CUSTOMIZE CHAT APPEARANCE
    // ======================================
    const CHAT_STYLING = {
        primaryColor: "#007bff",        // Main chat color
        secondaryColor: "#6c757d",      // Secondary elements
        fontFamily: "Arial, sans-serif", // Chat font
        position: "bottom-right"        // Chat position: bottom-right, bottom-left
    };
    
    // ======================================
    // ⚙️ SYSTEM CODE (DON'T MODIFY BELOW THIS LINE)
    // ======================================
    
    const sessionId = BUSINESS_CONFIG.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    
    console.log(`🏠 ${BUSINESS_CONFIG.name} - Chat Session ID:`, sessionId);
    console.log('✅ Using CORS proxy for N8N communication');
    
    // Remove any existing chat widgets
    function removeExistingChats() {
        const selectors = [
            '#chatwood-launcher',
            '#chatwoot-widget', 
            '.chatwoot-widget',
            '.chat-widget:not(#n8n-business-chat):not(#business-chat-launcher)'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el.id !== 'n8n-business-chat' && el.id !== 'business-chat-launcher') {
                    console.log('Removing conflicting chat element:', el);
                    el.remove();
                }
            });
        });
    }
    
    // Send message to N8N via CORS proxy
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
                source: BUSINESS_CONFIG.domain
            };
            
            const response = await fetch(BUSINESS_CONFIG.corsProxyUrl, {
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
            
            // N8N returns data in 'output' property - use that first!
            const aiMessage = responseData.output || 
                             responseData.message || 
                             responseData.response || 
                             responseData.text ||
                             `Thanks for your message! I'm here to help with ${BUSINESS_CONFIG.services}.`;
            
            return {
                message: aiMessage,
                timestamp: new Date().toISOString(),
                sessionId: sessionId
            };
            
        } catch (error) {
            console.error('❌ Chat error:', error);
            return {
                message: `I'm having trouble connecting right now. Please call us at ${BUSINESS_CONFIG.phone} for immediate assistance with ${BUSINESS_CONFIG.services}!`,
                timestamp: new Date().toISOString(),
                sessionId: sessionId,
                error: true
            };
        }
    }
    
    // Create chat interface
    function createBusinessChatWidget() {
        const position = CHAT_STYLING.position === 'bottom-left' ? 'left: 20px;' : 'right: 20px;';
        
        const chatContainer = document.createElement('div');
        chatContainer.id = 'n8n-business-chat';
        chatContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            ${position}
            width: 360px;
            height: 520px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 999999;
            font-family: ${CHAT_STYLING.fontFamily};
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #e0e0e0;
        `;
        
        // Chat header
        const chatHeader = document.createElement('div');
        chatHeader.style.cssText = `
            background: ${CHAT_STYLING.primaryColor};
            color: white;
            padding: 15px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        chatHeader.innerHTML = `
            <div>
                <div style="font-size: 16px;">${BUSINESS_CONFIG.agentName} from ${BUSINESS_CONFIG.name}</div>
                <div style="font-size: 12px; opacity: 0.9;">Ask about our ${BUSINESS_CONFIG.services}!</div>
            </div>
            <button id="close-chat" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px;">×</button>
        `;
        
        // Chat messages area
        const messagesArea = document.createElement('div');
        messagesArea.id = 'chat-messages';
        messagesArea.style.cssText = `
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: #f8f9fa;
        `;
        
        // Initial message
        messagesArea.innerHTML = `
            <div style="background: white; padding: 12px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <strong>${BUSINESS_CONFIG.agentName}:</strong> Hi! I'm ${BUSINESS_CONFIG.agentName} from ${BUSINESS_CONFIG.name}. How can I help you with ${BUSINESS_CONFIG.services} today?
            </div>
        `;
        
        // Input area
        const inputArea = document.createElement('div');
        inputArea.style.cssText = `
            padding: 15px;
            border-top: 1px solid #e0e0e0;
            background: white;
        `;
        
        inputArea.innerHTML = `
            <div style="display: flex; gap: 8px;">
                <input type="text" id="chat-input" placeholder="Type your message..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                <button id="send-message" style="background: ${CHAT_STYLING.primaryColor}; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px;">Send</button>
            </div>
        `;
        
        // Assemble chat widget
        chatContainer.appendChild(chatHeader);
        chatContainer.appendChild(messagesArea);
        chatContainer.appendChild(inputArea);
        
        // Chat launcher button
        const launcher = document.createElement('div');
        launcher.id = 'business-chat-launcher';
        launcher.style.cssText = `
            position: fixed;
            bottom: 20px;
            ${position}
            width: 60px;
            height: 60px;
            background: ${CHAT_STYLING.primaryColor};
            border-radius: 50%;
            cursor: pointer;
            z-index: 999998;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        `;
        
        launcher.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
        `;
        
        // Add hover effect
        launcher.addEventListener('mouseenter', () => {
            launcher.style.transform = 'scale(1.1)';
        });
        launcher.addEventListener('mouseleave', () => {
            launcher.style.transform = 'scale(1)';
        });
        
        // Event listeners
        launcher.addEventListener('click', () => {
            chatContainer.style.display = 'flex';
            launcher.style.display = 'none';
            document.getElementById('chat-input').focus();
        });
        
        document.getElementById('close-chat').addEventListener('click', () => {
            chatContainer.style.display = 'none';
            launcher.style.display = 'flex';
        });
        
        // Message sending
        async function sendMessage() {
            const inputBox = document.getElementById('chat-input');
            const message = inputBox.value.trim();
            if (!message) return;
            
            // Add user message
            addMessageToChat(message, 'user');
            inputBox.value = '';
            
            // Show typing indicator
            const typingDiv = addMessageToChat(`${BUSINESS_CONFIG.agentName} is typing...`, 'bot', true);
            
            try {
                const response = await sendMessageToChatbot(message);
                typingDiv.remove();
                addMessageToChat(response.message, 'bot');
            } catch (error) {
                typingDiv.remove();
                addMessageToChat(`Sorry, I'm having trouble right now. Please call us at ${BUSINESS_CONFIG.phone}!`, 'bot');
            }
        }
        
        document.getElementById('send-message').addEventListener('click', sendMessage);
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Add to page
        document.body.appendChild(launcher);
        document.body.appendChild(chatContainer);
        
        console.log('✅ Business chat widget loaded successfully');
    }
    
    // Add message to chat
    function addMessageToChat(message, sender, isTyping = false) {
        const messagesArea = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        
        const senderColor = sender === 'user' ? CHAT_STYLING.primaryColor : '#white';
        const alignment = sender === 'user' ? 'margin-left: 40px; text-align: right;' : 'margin-right: 40px;';
        const background = sender === 'user' ? CHAT_STYLING.primaryColor : 'white';
        const textColor = sender === 'user' ? 'white' : '#333';
        
        messageDiv.style.cssText = `
            background: ${background};
            color: ${textColor};
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 10px;
            ${alignment}
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            ${isTyping ? 'font-style: italic; opacity: 0.7;' : ''}
        `;
        
        if (sender === 'bot' && !isTyping) {
            messageDiv.innerHTML = `<strong>${BUSINESS_CONFIG.agentName}:</strong> ${message}`;
        } else {
            messageDiv.textContent = message;
        }
        
        messagesArea.appendChild(messageDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
        
        return messageDiv;
    }
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            removeExistingChats();
            createBusinessChatWidget();
        });
    } else {
        removeExistingChats();
        createBusinessChatWidget();
    }
    
})();
