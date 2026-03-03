// Simple, Reliable Chatbot for Atlanta Gutter Guard Pros
(function() {
    'use strict';
    
    // Knowledge base for intelligent responses
    const responses = {
        cost: `Our gutter guards typically cost $8-15 per linear foot installed and come with a lifetime warranty! The exact cost depends on your home's size and gutter type. For a free, accurate estimate, please call us at (323-325-1319.`,
        
        price: `Great question! Our professional gutter guard installation ranges from $8-15 per linear foot, including materials and labor. We offer a lifetime warranty and free estimates. Call (323-325-1319 for your personalized quote!`,
        
        service_areas: `We proudly serve the entire Atlanta metro area including Roswell, Marietta, Decatur, Sandy Springs, Alpharetta, Johns Creek, Milton, Kennesaw, Smyrna, and surrounding communities. Call (323-325-1319 to confirm we service your specific location!`,
        
        cleaning: `Clogged gutters are a major headache! We offer professional gutter cleaning services, and our premium gutter guards will prevent future clogs permanently. No more dangerous ladder climbs or messy cleanups. Call (323-325-1319 to schedule service!`,
        
        installation: `We specialize in professional gutter guard installation using premium micro-mesh technology. Our guards keep out leaves, pine needles, and debris while allowing water to flow freely. Same-day installation available! Call (323-325-1319 for your free estimate.`,
        
        warranty: `All our gutter guards come with a transferable lifetime warranty! This means if you ever have issues or sell your home, the warranty goes with it. We stand behind our work 100%. Call (323-325-1319 to learn more about our warranty coverage.`,
        
        new_gutters: `We provide complete new gutter systems with seamless aluminum gutters, proper slope installation, and optional gutter guard protection. Our team handles everything from assessment to cleanup. Call (323-325-1319 for your free consultation!`,
        
        repair: `We handle all types of gutter repairs including leaks, sagging, joint issues, and emergency repairs. Many customers also add gutter guards during repairs to prevent future problems. Call (323-325-1319 for fast, reliable service!`,
        
        default: `Thanks for your question! I'm Alex from Atlanta Gutter Guard Pros, and I'm here to help with all your gutter needs. For the best assistance with your specific situation, please call us at (323-325-1319. We offer free estimates and same-day service!`
    };
    
    function getResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('cost') || msg.includes('price') || msg.includes('how much') || msg.includes('expensive')) {
            return responses.cost;
        }
        
        if (msg.includes('service') && (msg.includes('area') || msg.includes('location') || msg.includes('roswell') || msg.includes('marietta') || msg.includes('decatur'))) {
            return responses.service_areas;
        }
        
        if (msg.includes('clean') || msg.includes('clog') || msg.includes('blocked') || msg.includes('debris')) {
            return responses.cleaning;
        }
        
        if (msg.includes('install') || msg.includes('new') && msg.includes('guard')) {
            return responses.installation;
        }
        
        if (msg.includes('warrant') || msg.includes('guarantee')) {
            return responses.warranty;
        }
        
        if (msg.includes('new') && msg.includes('gutter') && !msg.includes('guard')) {
            return responses.new_gutters;
        }
        
        if (msg.includes('repair') || msg.includes('fix') || msg.includes('leak') || msg.includes('sag')) {
            return responses.repair;
        }
        
        return responses.default;
    }
    
    // Override the superhuman widget with our reliable version
    window.addEventListener('load', function() {
        setTimeout(() => {
            // Try to hook into existing widget
            if (window.serviceBotWidget) {
                const originalSend = window.serviceBotWidget.sendMessage;
                window.serviceBotWidget.sendMessage = function(message) {
                    const response = getResponse(message);
                    // Display the response in the widget
                    if (window.serviceBotWidget.displayMessage) {
                        window.serviceBotWidget.displayMessage(response, 'bot');
                    }
                    return response;
                };
            }
            
            // Alternative: Listen for message events
            document.addEventListener('chatMessage', function(event) {
                const response = getResponse(event.detail.message);
                event.detail.callback(response);
            });
            
        }, 3000);
    });
    
    // Expose for manual testing
    window.AtlantaGutterAI = {
        getResponse: getResponse,
        test: function(message) {
            console.log('Question:', message);
            console.log('Answer:', getResponse(message));
        }
    };
    
})();