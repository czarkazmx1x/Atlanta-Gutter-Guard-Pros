// Mistral AI Integration via Cloudflare Functions
window.MistralAI = {
    
    async sendMessage(message) {
        try {
            const response = await fetch('/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('AI Chat Error:', error);
            
            // Provide intelligent fallback responses based on keywords
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('how much')) {
                return `Great question! Our gutter guards typically cost $8-15 per linear foot installed, and come with a lifetime warranty. For an exact quote based on your home, please call us at (323-325-1319 for a free estimate!`;
            }
            
            if (lowerMessage.includes('service') && (lowerMessage.includes('area') || lowerMessage.includes('location'))) {
                return `We service the entire Atlanta metro area including Roswell, Marietta, Decatur, Sandy Springs, Alpharetta, and surrounding communities. Call (323-325-1319 to confirm we service your specific area!`;
            }
            
            if (lowerMessage.includes('gutter') && (lowerMessage.includes('clean') || lowerMessage.includes('clog'))) {
                return `Clogged gutters are a common problem! We offer professional gutter cleaning services, and our gutter guards will prevent future clogs permanently. Call (323-325-1319 to schedule service or get a free estimate on gutter guards.`;
            }
            
            if (lowerMessage.includes('new') && lowerMessage.includes('gutter')) {
                return `We'd be happy to help with new gutter installation! We provide complete gutter systems with optional gutter guard protection. Our team can assess your needs and provide a free estimate. Call (323-325-1319 to get started!`;
            }
            
            return `Thanks for your message! I'm having a brief technical issue, but I'd love to help with your gutter needs. Please call us at (323-325-1319 and our team will be happy to assist you right away!`;
        }
    }
};

// Enhanced widget integration
if (window.SERVICE_BOT_CONFIG) {
    // Override the message handler to use our Mistral AI
    window.SERVICE_BOT_CONFIG.onMessage = async function(message) {
        return await window.MistralAI.sendMessage(message);
    };
}

// Alternative: Hook into the widget after it loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for widget to initialize
    setTimeout(() => {
        if (window.serviceBotWidget && window.serviceBotWidget.onMessage) {
            window.serviceBotWidget.onMessage = async function(message) {
                return await window.MistralAI.sendMessage(message);
            };
        }
    }, 2000);
});