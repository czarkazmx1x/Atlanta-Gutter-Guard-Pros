// ==================================================================
// ATLANTA GUTTER GUARD PROS - RESILIENT AI CHATBOT SYSTEM
// ==================================================================
// Multiple backup strategies to ensure chat always works
// ==================================================================

(function() {
    'use strict';
    
    // MULTI-WEBHOOK FAILOVER SYSTEM
    const WEBHOOK_URLS = [
        'https://czarkamxxx.app.n8n.cloud/webhook/ca436bba-e4cf-43d0-afa4-d80541d06722/chat', // Primary
        'https://czarkamxxx.app.n8n.cloud/webhook/65afb57e-1c89-44a3-b9bb-84013a4511d7/chat', // Backup 1
        // Add more backup webhooks here as needed
    ];
    
    // BACKUP RESPONSE SYSTEM
    const SMART_BACKUP_RESPONSES = {
        greeting: [
            "Hi! I'm the Atlanta Gutter Guard Pros assistant. What's your name?",
            "Hello! I help with gutter guard quotes and installations. May I get your name?",
            "Welcome! I'm here to help with your gutter needs. What's your name?"
        ],
        needsName: [
            "Thanks! What's your email address so I can send you information?",
            "Great to meet you! Could I get your email to send quotes and details?",
            "Perfect! What's your email so I can follow up with you?"
        ],
        needsEmail: [
            "Excellent! What's going on with your gutters? Clogs, overflows, or just tired of cleaning?",
            "Perfect! Tell me about your gutter situation - what problems are you having?",
            "Great! What gutter issues can I help you solve today?"
        ],
        quote: [
            "I'd love to give you a quote! Is your home 1 or 2 stories? This helps me calculate the right price.",
            "For an accurate quote, I need to know - is your house single story or two stories?",
            "To calculate your quote: How many stories is your home?"
        ],
        schedule: [
            "Perfect! I can schedule your free inspection. What day works best? We're available Monday-Friday, 8 AM to 6 PM.",
            "Great! When would you like your free inspection? We have openings Monday through Friday.",
            "Excellent! Let's book your free estimate. What day works for you this week?"
        ],
        fallback: [
            "I understand you need help with gutter guards. Can you tell me more about what you're looking for?",
            "I'm here to help with gutter guards, quotes, and scheduling. What specific information do you need?",
            "Let me help you with your gutter guard needs. What questions do you have for me?"
        ],
        technical: [
            "I'm having a brief connection issue, but I'm still here to help! For immediate assistance, call us at (470) 851-6780.",
            "There's a small technical hiccup, but let me still help you. What gutter problems are you dealing with?",
            "I'm experiencing a minor connection delay. Meanwhile, what can I help you with regarding gutter guards?"
        ]
    };
    
    // CONVERSATION CONTEXT TRACKING
    let conversationState = {
        hasName: false,
        hasEmail: false,
        userName: '',
        userEmail: '',
        messageCount: 0,
        lastMessageTime: Date.now(),
        conversationHistory: []
    };
    
    // WEBHOOK FAILOVER MANAGER
    class WebhookFailover {
        constructor(urls) {
            this.urls = urls;
            this.currentIndex = 0;
            this.failureCount = 0;
            this.lastFailureTime = 0;
        }
        
        async sendMessage(message, context) {
            for (let attempt = 0; attempt < this.urls.length; attempt++) {
                try {
                    const response = await this.tryWebhook(this.urls[this.currentIndex], message, context);
                    this.failureCount = 0; // Reset on success
                    return response;
                } catch (error) {
                    console.warn(`Webhook ${this.currentIndex + 1} failed:`, error);
                    this.failureCount++;
                    this.lastFailureTime = Date.now();
                    this.currentIndex = (this.currentIndex + 1) % this.urls.length;
                }
            }
            
            // All webhooks failed - use intelligent backup
            return this.generateBackupResponse(message, context);
        }
        
        async tryWebhook(url, message, context) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
            
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chatInput: message,
                        sessionId: 'atlanta-gutter-' + Date.now(),
                        context: context,
                        timestamp: new Date().toISOString()
                    }),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const data = await response.json();
                return data.output || data.response || data.message;
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        }
        
        generateBackupResponse(message, context) {
            const msg = message.toLowerCase();
            const state = conversationState;
            
            // Determine conversation stage and generate appropriate response
            if (state.messageCount === 0 || msg.includes('hi') || msg.includes('hello')) {
                return this.getRandomResponse('greeting');
            }
            
            if (!state.hasName) {
                state.hasName = true;
                state.userName = message.split(' ')[0]; // Extract first word as name
                return this.getRandomResponse('needsName');
            }
            
            if (!state.hasEmail && (msg.includes('@') || msg.includes('email'))) {
                state.hasEmail = true;
                state.userEmail = message;
                return this.getRandomResponse('needsEmail');
            }
            
            if (!state.hasEmail) {
                return this.getRandomResponse('needsName');
            }
            
            if (msg.includes('quote') || msg.includes('price') || msg.includes('cost')) {
                return this.getRandomResponse('quote');
            }
            
            if (msg.includes('schedule') || msg.includes('appointment') || msg.includes('inspection')) {
                return this.getRandomResponse('schedule');
            }
            
            if (msg.includes('clog') || msg.includes('leaf') || msg.includes('clean') || msg.includes('overflow')) {
                return "Clogged gutters are exactly what our gutter guards solve! Our micro-mesh technology keeps leaves and debris out while allowing water to flow freely. Would you like a quote for installation?";
            }
            
            if (msg.includes('1') || msg.includes('one') || msg.includes('single')) {
                return `Perfect! For a single-story home in the Atlanta area, our gutter guard installation typically runs $800-$1,200 depending on your home's size. This includes premium micro-mesh guards with our lifetime warranty. I'll send detailed pricing to ${state.userEmail || 'your email'}. Would you like to schedule a free inspection?`;
            }
            
            if (msg.includes('2') || msg.includes('two') || msg.includes('story') || msg.includes('stories')) {
                return `Excellent! For a two-story home, our gutter guard installation typically runs $1,400-$2,000 depending on your home's size and complexity. This includes our premium micro-mesh system with lifetime warranty. I'll send detailed pricing to ${state.userEmail || 'your email'}. Ready to schedule your free inspection?`;
            }
            
            // Technical issue response
            if (this.failureCount > 2) {
                return this.getRandomResponse('technical');
            }
            
            return this.getRandomResponse('fallback');
        }
        
        getRandomResponse(category) {
            const responses = SMART_BACKUP_RESPONSES[category] || SMART_BACKUP_RESPONSES.fallback;
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // Initialize failover system
    const webhookFailover = new WebhookFailover(WEBHOOK_URLS);
    
    // ENHANCED CHAT FUNCTIONALITY WITH PERSISTENCE
    function setupChatFunctionality() {
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        // Load conversation state from localStorage
        try {
            const saved = localStorage.getItem('atlanta-gutter-chat-state');
            if (saved) {
                conversationState = { ...conversationState, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn('Could not load chat state:', e);
        }
        
        function saveConversationState() {
            try {
                localStorage.setItem('atlanta-gutter-chat-state', JSON.stringify(conversationState));
            } catch (e) {
                console.warn('Could not save chat state:', e);
            }
        }
        
        function addMessage(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `
                max-width: 85%;
                word-wrap: break-word;
                line-height: 1.4;
                margin-bottom: 12px;
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
            
            // Save to conversation history
            conversationState.conversationHistory.push({
                content: content,
                isUser: isUser,
                timestamp: Date.now()
            });
            
            saveConversationState();
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
                margin-bottom: 12px;
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
            
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return typingDiv;
        }
        
        async function sendMessage(message) {
            if (!message.trim()) return;
            
            // Update conversation state
            conversationState.messageCount++;
            conversationState.lastMessageTime = Date.now();
            
            // Add user message
            addMessage(message, true);
            chatInput.value = '';
            
            // Show typing indicator
            const typingIndicator = showTypingIndicator();
            
            try {
                // Use failover webhook system
                const aiResponse = await webhookFailover.sendMessage(message, conversationState);
                typingIndicator.remove();
                
                // Add AI response
                addMessage(aiResponse);
                
            } catch (error) {
                console.error('All chat systems failed:', error);
                typingIndicator.remove();
                
                // Ultimate fallback with phone number
                addMessage(`I'm experiencing technical difficulties right now, but I'm still here to help! For immediate assistance with your gutter guard needs, please call us directly at <strong style="color: #2e7d32;">(470) 851-6780</strong>. We're available Monday-Friday, 8 AM to 6 PM, and we'd love to give you a free quote!`);
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
        
        // Restore conversation history if exists
        if (conversationState.conversationHistory.length > 0) {
            conversationState.conversationHistory.forEach(msg => {
                if (msg.content && msg.content !== "Hi! I'm here to help you with gutter guards, instant quotes, and scheduling. What's your name?") {
                    addMessage(msg.content, msg.isUser);
                }
            });
        }
    }
    
    // HEALTH CHECK SYSTEM
    function startHealthCheck() {
        // Check webhook health every 5 minutes
        setInterval(async () => {
            try {
                await webhookFailover.tryWebhook(WEBHOOK_URLS[0], 'health-check', {});
                console.log('✅ Primary webhook healthy');
            } catch (error) {
                console.warn('⚠️ Primary webhook health check failed, failover ready');
            }
        }, 300000); // 5 minutes
    }
    
    // ENHANCED INITIALIZATION
    function initialize() {
        try {
            console.log('🏠 Atlanta Gutter Guard Pros AI Chat initializing...');
            console.log('📡 Failover system enabled with', WEBHOOK_URLS.length, 'backup webhooks');
            
            // Remove old chat widgets
            removeExistingChats();
            
            // Create new AI chat widget
            createGutterChatWidget();
            
            // Start health monitoring
            startHealthCheck();
            
            setTimeout(() => {
                const launcher = document.getElementById('gutter-chat-launcher');
                const container = document.getElementById('n8n-gutter-chat');
                
                if (launcher && container) {
                    console.log('✅ Resilient chat system loaded successfully!');
                    console.log('🛡️ Multiple backup systems active - chat will always work!');
                } else {
                    console.error('❌ Chat widget creation failed');
                }
            }, 100);
            
        } catch (error) {
            console.error('❌ Error initializing chat widget:', error);
        }
    }
    
    // Keep all the existing UI creation functions (createGutterChatWidget, removeExistingChats)
    // [Previous UI code would go here - keeping it exactly the same]
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
                <p style="margin:4px 0 0 0;font-size:13px;opacity:0.95;">🛡️ Always-On AI Assistant</p>
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
                    <span style="font-size: 12px; background: #e8f5e8; color: #2e7d32; padding: 2px 6px; border-radius: 10px;">🛡️ Always Online</span>
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
        
        // Create floating launcher button with resilience indicator
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
            position: relative;
        `;
        launcher.innerHTML = '💬';
        launcher.title = '🛡️ Always-On Chat with Atlanta Gutter Guard Pros - Multiple Backup Systems Active!';
        
        // Add resilience indicator
        const resilienceIndicator = document.createElement('div');
        resilienceIndicator.style.cssText = `
            position: absolute;
            top: -2px;
            right: -2px;
            width: 20px;
            height: 20px;
            background: #4caf50;
            border: 2px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        `;
        resilienceIndicator.innerHTML = '🛡️';
        resilienceIndicator.title = 'Multiple backup systems active';
        launcher.appendChild(resilienceIndicator);
        
        // Add enhanced CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gentle-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes typing-bounce {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
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
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();