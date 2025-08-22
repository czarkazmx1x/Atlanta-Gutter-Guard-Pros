// ==================================================================
// ATLANTA GUTTER GUARD PROS - N8N AI CHATBOT
// ==================================================================
// Professional AI chatbot for gutter guard lead generation
// Replaces Chatwoot with intelligent conversation and quote generation
// ==================================================================

(function() {
    'use strict';
    
    // Configuration - N8N WEBHOOK URL (UPDATED!)
    const N8N_WEBHOOK_URL = 'https://czarkamxxx.app.n8n.cloud/webhook/ca436bba-e4cf-43d0-afa4-d80541d06722/chat';
    
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
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            border: 1px solid #e0e0e0;
        `;
        
        // Create chat header with Atlanta Gutter branding
        const chatHeader = document.createElement('div');
        chatHeader.style.cssText = `
            background: linear-gradient(135deg, #2e7d32, #4caf50);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
        `;
        chatHeader.innerHTML = `
            <div>
                <h3 style="margin:0;font-size:18px;font-weight:700;">🏠 Atlanta Gutter Guard Pros</h3>
                <p style="margin:4px 0 0 0;font-size:13px;opacity:0.95;">Get Your Free Quote in Minutes!</p>
            </div>
            <button id="close-chat" style="background:rgba(255,255,255,0.2);border:none;color:white;font-size:24px;cursor:pointer;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 0.2s;">×</button>
        `;
        
        // Create messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.id = 'chat-messages';
        messagesContainer.style.cssText = `
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #fafafa;
            display: flex;
            flex-direction: column;
            gap: 16px;
        `;
        
        // Add welcome message
        messagesContainer.innerHTML = `
            <div style="background: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-left: 4px solid #4caf50;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 20px;">🤖</span>
                    <strong style="color: #2e7d32;">Atlanta Gutter AI Assistant</strong>
                </div>
                <p style="margin: 0; color: #555; line-height: 1.4;">
                    Hi! I'm here to help you with gutter guards, instant quotes, and scheduling. 
                    <strong>What's your name?</strong>
                </p>
            </div>
        `;
        
        // Create input area
        const inputArea = document.createElement('div');
        inputArea.style.cssText = `
            padding: 20px;
            border-top: 1px solid #e0e0e0;
            background: white;
        `;
        inputArea.innerHTML = `
            <div style="display: flex; gap: 12px; align-items: flex-end;">
                <input type="text" id="chat-input" placeholder="Type your message..." 
                       style="flex: 1; padding: 14px 16px; border: 2px solid #e0e0e0; border-radius: 25px; outline: none; font-size: 14px; resize: none; transition: border-color 0.2s;">
                <button id="send-btn" style="background: #2e7d32; color: white; border: none; padding: 14px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; box-shadow: 0 2px 8px rgba(46,125,50,0.3);">
                    Send
                </button>
            </div>
        `;
        
        // Create floating launcher button
        const launcher = document.createElement('button');
        launcher.id = 'gutter-chat-launcher';
        launcher.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2e7d32, #4caf50);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(46,125,50,0.4);
            z-index: 999998;
            font-size: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: gentle-pulse 3s infinite;
        `;
        launcher.innerHTML = '💬';
        launcher.title = 'Chat with Atlanta Gutter Guard Pros - Get Your Free Quote!';
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gentle-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            #gutter-chat-launcher:hover {
                transform: scale(1.1) !important;
                box-shadow: 0 8px 25px rgba(46,125,50,0.5) !important;
            }
            #chat-input:focus {
                border-color: #4caf50 !important;
            }
            #send-btn:hover {
                background: #1b5e20 !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(46,125,50,0.4) !important;
            }
            #close-chat:hover {
                background: rgba(255,255,255,0.3) !important;
            }
        `;
        document.head.appendChild(style);
        
        // Event handlers
        launcher.addEventListener('click', () => {
            chatContainer.style.display = 'flex';
            launcher.style.display = 'none';
            setTimeout(() => {
                const input = document.getElementById('chat-input');
                if (input) input.focus();
            }, 100);
        });
        
        chatHeader.querySelector('#close-chat').addEventListener('click', () => {
            chatContainer.style.display = 'none';
            launcher.style.display = 'flex';
        });
        
        // Assemble widget
        chatContainer.appendChild(chatHeader);
        chatContainer.appendChild(messagesContainer);
        chatContainer.appendChild(inputArea);
        
        // Add to page
        document.body.appendChild(chatContainer);
        document.body.appendChild(launcher);
        
        // Set up chat functionality
        setupChatFunctionality();
    }
    
    // Chat functionality
    function setupChatFunctionality() {
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        let sessionId = 'atlanta-gutter-' + Date.now();
        let conversationContext = [];
        
        function addMessage(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `
                max-width: 85%;
                word-wrap: break-word;
                line-height: 1.4;
                ${isUser ? 
                    'background: linear-gradient(135deg, #2e7d32, #4caf50); color: white; margin-left: auto; align-self: flex-end; padding: 12px 16px; border-radius: 18px 18px 6px 18px;' : 
                    'background: white; color: #333; margin-right: auto; align-self: flex-start; padding: 16px; border-radius: 6px 18px 18px 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'
                }
            `;
            
            if (!isUser) {
                messageDiv.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <span style="font-size: 16px;">🏠</span>
                        <strong style="color: #2e7d32; font-size: 12px;">Atlanta Gutter Guard Pros</strong>
                    </div>
                    <div>${content}</div>
                `;
            } else {
                messageDiv.innerHTML = content;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.id = 'typing-indicator';
            typingDiv.style.cssText = `
                background: white; 
                padding: 16px; 
                border-radius: 6px 18px 18px 18px; 
                margin-right: auto; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                max-width: 85%;
            `;
            typingDiv.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 16px;">🏠</span>
                    <strong style="color: #2e7d32; font-size: 12px;">Atlanta Gutter Guard Pros</strong>
                </div>
                <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px; color: #666;">
                    <div style="display: flex; gap: 4px;">
                        <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%; animation: typing-bounce 1.4s infinite ease-in-out both; animation-delay: 0s;"></div>
                        <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%; animation: typing-bounce 1.4s infinite ease-in-out both; animation-delay: 0.16s;"></div>
                        <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%; animation: typing-bounce 1.4s infinite ease-in-out both; animation-delay: 0.32s;"></div>
                    </div>
                    <span style="font-size: 12px;">Typing...</span>
                </div>
            `;
            
            // Add bounce animation
            if (!document.getElementById('typing-animation-style')) {
                const style = document.createElement('style');
                style.id = 'typing-animation-style';
                style.textContent = `
                    @keyframes typing-bounce {
                        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                        40% { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return typingDiv;
        }
        
        async function sendMessage(message) {
            if (!message.trim()) return;
            
            // Add user message
            addMessage(message, true);
            conversationContext.push({role: 'user', content: message});
            chatInput.value = '';
            
            // Show typing indicator
            const typingIndicator = showTypingIndicator();
            
            try {
                // Send to n8n webhook - LIVE AI CONNECTION
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chatInput: message,
                        sessionId: sessionId,
                        context: conversationContext
                    })
                });
                
                const data = await response.json();
                typingIndicator.remove();
                
                const aiResponse = data.output || data.response || 'Thanks for your message! How can I help you with your gutter guard needs?';
                addMessage(aiResponse);
                conversationContext.push({role: 'assistant', content: aiResponse});
                
            } catch (error) {
                console.error('Chat error:', error);
                typingIndicator.remove();
                
                addMessage(`I'm having trouble connecting right now. Please call us directly at <strong>(470) 851-6780</strong> for immediate assistance with your gutter guard needs!`);
            }
        }
        
        // Demo response generator (for testing without n8n)
        function generateDemoResponse(message, context) {
            const msg = message.toLowerCase();
            const hasName = context.some(c => c.role === 'assistant' && c.content.includes('What\'s your email'));
            const hasEmail = context.some(c => c.role === 'assistant' && c.content.includes('What\'s going on with your gutters'));
            
            if (!hasName && (msg.includes('hi') || msg.includes('hello') || !context.length)) {
                return "Hello! I'm your AI assistant for Atlanta Gutter Guard Pros. What's your name?";
            } else if (!hasEmail && hasName) {
                return `Thanks! What's your email address so I can send you information?`;
            } else if (!hasEmail) {
                return `Nice to meet you! What's your email address?`;
            } else if (msg.includes('quote') || msg.includes('price') || msg.includes('cost')) {
                return `I'd be happy to create a quote for you! Is your home 1 or 2 stories? This helps me calculate the right price for your gutter guard installation.`;
            } else if (msg.includes('schedule') || msg.includes('appointment') || msg.includes('inspection')) {
                return `Perfect! I can schedule your free inspection. What day works best for you? We're available Monday through Friday, 8 AM to 6 PM.`;
            } else if (msg.includes('clog') || msg.includes('leaf') || msg.includes('clean')) {
                return `Clogged gutters are exactly what our gutter guards solve! Our micro-mesh guards keep leaves and debris out while allowing water to flow freely. Would you like a free quote for installation?`;
            } else {
                return `What's going on with your gutters? Are you dealing with clogs, overflows, or just tired of cleaning them? I can help you find the perfect gutter guard solution!`;
            }
        }
        
        // Event listeners
        sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage(chatInput.value);
            }
        });
        
        // Auto-focus input
        chatInput.focus();
    }
    
    // Initialize everything
    function initialize() {
        try {
            console.log('🏠 Atlanta Gutter Guard Pros AI Chat initializing...');
            console.log('Document ready state:', document.readyState);
            console.log('Body exists:', !!document.body);
            
            // Remove old chat widgets
            removeExistingChats();
            
            // Create new AI chat widget
            createGutterChatWidget();
            
            // Verify creation
            setTimeout(() => {
                const launcher = document.getElementById('gutter-chat-launcher');
                const container = document.getElementById('n8n-gutter-chat');
                
                if (launcher && container) {
                    console.log('✅ Atlanta Gutter Guard Pros AI Chat loaded successfully!');
                    console.log('🤖 Connected to n8n AI system - ready for live conversations!');
                } else {
                    console.error('❌ Chat widget creation failed');
                    console.log('Launcher:', launcher);
                    console.log('Container:', container);
                }
            }, 100);
            
        } catch (error) {
            console.error('❌ Error initializing chat widget:', error);
        }
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();