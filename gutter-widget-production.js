/**
 * Atlanta Gutter Guard Pros - Production Chat Widget
 * Works on all pages with Cloudflare Pages Functions backend
 */

(function() {
  // Production configuration
  const defaultConfig = {
    serverUrl: '', // Use relative URLs for same-domain API calls
    botName: 'Alex - Your Gutter Guard Expert',
    accentColor: '#2c3e50',
    position: 'right',
    mistralApiKey: '', // Customer can add their own API key here
    initialMessage: `Hi! I'm Alex from Atlanta Gutter Guard Pros. I help homeowners protect their homes from water damage with our premium gutter guard systems. 

What can I help you with today?

<div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px;">
  <button onclick="window.startGutterConversation && window.startGutterConversation('I need gutter guards installed')" style="background: #2c3e50; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
    🛡️ Get Gutter Guards Quote
  </button>
  <button onclick="window.startGutterConversation && window.startGutterConversation('I need gutter cleaning')" style="background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
    🧹 Schedule Gutter Cleaning
  </button>
  <button onclick="window.startGutterConversation && window.startGutterConversation('Emergency gutter repair needed')" style="background: #e74c3c; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
    🚨 Emergency Repair
  </button>
  <a href="tel:(323-325-1319" style="display: inline-block; background: #27ae60; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; text-align: center; font-weight: 600;">
    📞 Call Now: (323-325-1319
  </a>
</div>
    
<p style="margin-top: 15px; font-size: 14px; color: #666;">We serve all of Metro Atlanta with free estimates and lifetime warranties!</p>`,
    useFallbackApi: false
  };
  
  // Allow override from window object
  const config = window.GUTTER_BOT_CONFIG ? { ...defaultConfig, ...window.GUTTER_BOT_CONFIG } : defaultConfig;

  // Session management
  let sessionId = localStorage.getItem('gutter-bot-session') || `session-${Date.now()}`;
  let conversationHistory = JSON.parse(localStorage.getItem('gutter-bot-history') || '[]');
  
  // Use secure-chat endpoint for Cloudflare Functions
  let apiUrl = '/api/secure-chat';
  
  // Save session
  localStorage.setItem('gutter-bot-session', sessionId);

  // Helper function for quick start conversations
  window.startGutterConversation = function(message) {
    const input = document.getElementById('gutter-bot-input');
    if (input) {
      input.value = message;
      sendMessage();
    }
  };

  // Create widget HTML
  const widgetHtml = `
    <style>
      #gutter-bot-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: none;
        flex-direction: column;
        overflow: hidden;
      }
      
      #gutter-bot-header {
        background: ${config.accentColor};
        color: white;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      #gutter-bot-title {
        font-weight: 600;
        font-size: 16px;
      }
      
      #gutter-bot-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      #gutter-bot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        background: #f8f9fa;
      }
      
      .gutter-bot-message {
        margin-bottom: 15px;
        animation: fadeIn 0.3s ease-in;
      }
      
      .gutter-bot-message.bot {
        text-align: left;
      }
      
      .gutter-bot-message.user {
        text-align: right;
      }
      
      .gutter-bot-message-content {
        display: inline-block;
        padding: 12px 16px;
        border-radius: 18px;
        max-width: 80%;
        line-height: 1.4;
      }
      
      .gutter-bot-message.bot .gutter-bot-message-content {
        background: white;
        color: #333;
        border-bottom-left-radius: 8px;
      }
      
      .gutter-bot-message.user .gutter-bot-message-content {
        background: ${config.accentColor};
        color: white;
        border-bottom-right-radius: 8px;
      }
      
      #gutter-bot-input-area {
        padding: 15px;
        background: white;
        border-top: 1px solid #eee;
        display: flex;
        gap: 10px;
      }
      
      #gutter-bot-input {
        flex: 1;
        border: 1px solid #ddd;
        border-radius: 20px;
        padding: 10px 15px;
        outline: none;
        font-size: 14px;
      }
      
      #gutter-bot-send {
        background: ${config.accentColor};
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      #gutter-bot-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: ${config.accentColor};
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        font-size: 24px;
        z-index: 999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
      }
      
      #gutter-bot-toggle:hover {
        transform: scale(1.1);
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @media (max-width: 480px) {
        #gutter-bot-widget {
          bottom: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          border-radius: 0;
        }
        
        #gutter-bot-toggle {
          bottom: 15px;
          right: 15px;
        }
      }
    </style>
    
    <button id="gutter-bot-toggle">💬</button>
    
    <div id="gutter-bot-widget">
      <div id="gutter-bot-header">
        <div id="gutter-bot-title">${config.botName}</div>
        <button id="gutter-bot-close">×</button>
      </div>
      
      <div id="gutter-bot-messages"></div>
      
      <div id="gutter-bot-input-area">
        <input type="text" id="gutter-bot-input" placeholder="Ask about gutter guards, cleaning, or repairs...">
        <button id="gutter-bot-send">➤</button>
      </div>
    </div>
  `;

  // Add widget to page
  document.body.insertAdjacentHTML('beforeend', widgetHtml);

  // Widget elements
  const widget = document.getElementById('gutter-bot-widget');
  const toggle = document.getElementById('gutter-bot-toggle');
  const closeBtn = document.getElementById('gutter-bot-close');
  const messages = document.getElementById('gutter-bot-messages');
  const input = document.getElementById('gutter-bot-input');
  const sendBtn = document.getElementById('gutter-bot-send');

  // Event listeners
  toggle.addEventListener('click', () => {
    widget.style.display = widget.style.display === 'flex' ? 'none' : 'flex';
    if (widget.style.display === 'flex' && messages.children.length === 0) {
      addMessage(config.initialMessage, 'bot');
    }
  });

  closeBtn.addEventListener('click', () => {
    widget.style.display = 'none';
  });

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Add message to chat
  function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `gutter-bot-message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'gutter-bot-message-content';
    contentDiv.innerHTML = content;
    
    messageDiv.appendChild(contentDiv);
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
    
    // Save to history
    conversationHistory.push({ content, sender, timestamp: new Date().toISOString() });
    localStorage.setItem('gutter-bot-history', JSON.stringify(conversationHistory));
  }

  // Send message with secure server API
  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    input.value = '';

    try {
      // Call secure server API (API key stays on server)
      const response = await fetch(config.serverUrl || '/api/secure-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          sessionId,
          history: conversationHistory.slice(-5) // Last 5 messages for context
        })
      });

      if (response.ok) {
        const data = await response.json();
        addMessage(data.reply, 'bot');
        return;
      }

      // If server fails, use smart fallback responses
      throw new Error(`Server error: ${response.status}`);
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Smart fallback responses (no API needed)
      const smartResponses = {
        'gutter guard': 'Great choice! Our gutter guards prevent clogs and protect your home. We offer LeafFilter and micro-mesh systems starting around $8-15 per foot with lifetime warranties. When would you like a free estimate? Call (323-325-1319.',
        'cleaning': 'We provide thorough gutter cleaning services throughout Metro Atlanta for $150-300 depending on your home size. This includes inspection and minor repairs. Would you like to schedule? Call (323-325-1319.',
        'emergency': 'For emergency gutter issues, please call us immediately at (323-325-1319. We offer same-day service for overflowing gutters and urgent repairs to prevent water damage.',
        'cost': 'Gutter guard installation typically costs $8-15 per linear foot depending on the system. We provide free estimates and lifetime warranties. What\'s your address for an accurate quote?',
        'repair': 'We handle all gutter repairs including sagging, leaks, and downspout issues. Most repairs cost $5-12 per foot. For a free estimate, call (323-325-1319 or provide your address.',
        'pine': 'Pine needles are a major problem in Georgia! Our micro-mesh gutter guards are specifically designed to keep out pine needles while allowing water flow. Perfect for Atlanta homes. Free estimate?'
      };

      // Find best response
      const lowerMessage = message.toLowerCase();
      for (let key in smartResponses) {
        if (lowerMessage.includes(key)) {
          addMessage(smartResponses[key], 'bot');
          return;
        }
      }

      // Default response
      addMessage('Hi! I\'m Alex from Atlanta Gutter Guard Pros. I can help with gutter guards, cleaning, repairs, and emergency services. What specific questions do you have? For immediate assistance, call (323-325-1319.', 'bot');
    }
  }

  // Load previous conversation
  if (conversationHistory.length > 0) {
    // Don't auto-load, let user open chat first
  }

})();