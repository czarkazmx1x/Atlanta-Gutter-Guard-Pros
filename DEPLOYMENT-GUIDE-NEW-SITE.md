# 🚀 N8N CHATBOT DEPLOYMENT GUIDE

## 📋 **Complete Setup for New Website**

### **Step 1: Copy Required Files**

Download these files from your Atlanta Gutter Guard Pros site:
1. `atlanta-gutter-session-memory.js`
2. `atlanta-gutter-ai-chat-cors-fixed.js`
3. `n8n-cors-proxy-worker.js` (for Cloudflare Worker)

### **Step 2: Customize for New Business**

#### **A. Update Chat Widget Branding**
Edit `atlanta-gutter-ai-chat-cors-fixed.js`:

```javascript
// Line ~10-15: Update business info
const sessionId = 'your_business_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
console.log('🏠 Your Business Name - Chat Session ID:', sessionId);

// Line ~50-60: Update request data
const requestData = {
    message: message,
    sessionId: sessionId,
    chatInput: message,
    timestamp: new Date().toISOString(),
    source: 'yourdomain.com'  // ← Change this
};

// Line ~250-260: Update fallback messages
return {
    message: "I'm having trouble connecting right now. Please call us at (YOUR-PHONE) for immediate assistance!",
    timestamp: new Date().toISOString(),
    sessionId: sessionId,
    error: true
};

// Line ~300-350: Update chat widget styling and branding
const chatHeader = `
    <div style="...">
        <strong>Your Business Name</strong>
        <span>Ask about our services!</span>
    </div>
`;
```

#### **B. Update Cloudflare Worker**
Edit `n8n-cors-proxy-worker.js`:

```javascript
// Line ~40: Update N8N webhook URL
const N8N_WEBHOOK_URL = 'https://yourinstance.app.n8n.cloud/webhook/your-webhook-id/chat';

// Line ~50-60: Update business context
const n8nData = {
    chatInput: requestData.message || requestData.chatInput || 'Hello',
    sessionId: requestData.sessionId || 'your_business_' + Date.now(),
    timestamp: new Date().toISOString(),
    source: 'yourdomain.com',  // ← Change this
    userAgent: request.headers.get('user-agent') || 'Unknown',
    ...requestData
};

// Line ~90-100: Update fallback message
const fallbackResponse = {
    message: "Hi! I'm [Agent Name] from [Your Business]. I'm here to help with [your services]. For immediate assistance, please call (YOUR-PHONE)!",
    timestamp: new Date().toISOString(),
    sessionId: 'fallback_' + Date.now(),
    error: false,
    fallback: true
};
```

### **Step 3: Deploy Cloudflare Worker**

#### **A. Create New Worker**
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy the worker
wrangler deploy n8n-cors-proxy-worker.js --name your-business-n8n-proxy
```

#### **B. Update Worker URL in Chat Widget**
```javascript
// In atlanta-gutter-ai-chat-cors-fixed.js, line ~10
const CORS_PROXY_URL = 'https://your-business-n8n-proxy.your-account.workers.dev';
```

### **Step 4: Create N8N Workflow**

#### **A. Copy Existing Workflow**
1. Export workflow from Atlanta Gutter Guard Pros N8N
2. Import to your new N8N instance
3. Update webhook URL in worker

#### **B. Customize AI Prompt**
Update the AI agent prompt in N8N for your business:

```
You are [Agent Name], a helpful assistant for [Your Business Name].

Your role:
- Help customers with [your services]
- Provide information about [your products/services]
- Capture leads and schedule appointments
- Always be professional and knowledgeable about [your industry]

Business Info:
- Phone: (YOUR-PHONE)
- Website: yourdomain.com
- Services: [list your services]
- Service Areas: [your locations]

Always end responses by asking how you can further assist with [your services].
```

### **Step 5: Add to Website**

#### **Option A: Direct Include**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Add before closing </body> tag -->
    <script src="path/to/atlanta-gutter-session-memory.js"></script>
    <script src="path/to/atlanta-gutter-ai-chat-cors-fixed.js"></script>
</body>
</html>
```

#### **Option B: CDN/External Hosting**
```html
<!-- If hosting files on CDN or another domain -->
<script src="https://yourcdn.com/chat-session-memory.js"></script>
<script src="https://yourcdn.com/chat-widget.js"></script>
```

#### **Option C: WordPress/CMS**
Add to footer.php or use a plugin to inject before `</body>`:
```html
<script src="<?php echo get_template_directory_uri(); ?>/js/chat-session-memory.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/chat-widget.js"></script>
```

### **Step 6: Testing Checklist**

#### **Before Go-Live:**
- [ ] Cloudflare Worker responds to health check
- [ ] N8N webhook receives test messages
- [ ] Chat widget appears on website
- [ ] Messages send without CORS errors
- [ ] AI responses display correctly
- [ ] Fallback messages work if N8N is down
- [ ] Mobile responsiveness tested

#### **Test Commands:**
```bash
# Test Cloudflare Worker health
curl https://your-business-n8n-proxy.your-account.workers.dev/health

# Test chat functionality
curl -X POST https://your-business-n8n-proxy.your-account.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I need help with your services"}'
```

## 🎯 **Quick Start Templates**

### **Service Business Template**
Perfect for: Plumbing, HVAC, Landscaping, etc.

```javascript
// Quick customization variables
const BUSINESS_NAME = "Your Service Company";
const AGENT_NAME = "Sarah";
const PHONE_NUMBER = "(555) 123-4567";
const SERVICES = "plumbing services";  // or "HVAC services", "landscaping", etc.
const DOMAIN = "yourservicecompany.com";
```

### **E-commerce Template**
Perfect for: Online stores, product inquiries

```javascript
const BUSINESS_NAME = "Your Store";
const AGENT_NAME = "Alex";
const PHONE_NUMBER = "(555) 123-4567";
const SERVICES = "products and orders";
const DOMAIN = "yourstore.com";
```

### **Professional Services Template**
Perfect for: Law firms, accounting, consulting

```javascript
const BUSINESS_NAME = "Your Professional Firm";
const AGENT_NAME = "Jordan";
const PHONE_NUMBER = "(555) 123-4567";
const SERVICES = "legal services";  // or "accounting", "consulting", etc.
const DOMAIN = "yourfirm.com";
```

## 🔧 **Advanced Configuration**

### **Custom Styling**
Modify the chat widget appearance by editing the CSS in the JavaScript file:

```javascript
// In atlanta-gutter-ai-chat-cors-fixed.js
chatContainer.style.cssText = `
    /* Customize colors, fonts, positioning */
    --primary-color: #your-brand-color;
    --secondary-color: #your-accent-color;
    font-family: your-brand-font;
`;
```

### **Analytics Integration**
Add tracking to measure chat engagement:

```javascript
// Add to chat widget
function trackChatEvent(action, message) {
    // Google Analytics
    gtag('event', 'chat_interaction', {
        event_category: 'chatbot',
        event_label: action,
        value: message.length
    });
    
    // Or your analytics platform
    analytics.track('Chat Interaction', {
        action: action,
        messageLength: message.length,
        timestamp: new Date().toISOString()
    });
}
```

### **Multi-Language Support**
Customize messages for different languages:

```javascript
const MESSAGES = {
    en: {
        greeting: "Hi! I'm here to help with your needs.",
        fallback: "I'm having trouble connecting. Please call us!"
    },
    es: {
        greeting: "¡Hola! Estoy aquí para ayudarte.",
        fallback: "Tengo problemas de conexión. ¡Por favor llámanos!"
    }
};
```

## 📞 **Support & Troubleshooting**

If you run into issues:
1. Check browser console for errors
2. Test Cloudflare Worker health endpoint
3. Verify N8N webhook is responding
4. Ensure CORS proxy URL is correct in chat widget
5. Check that all files are properly uploaded/hosted

**The system is designed to be portable and easy to deploy!** 🚀
