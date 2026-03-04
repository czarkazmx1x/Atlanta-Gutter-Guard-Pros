// Cloudflare Worker - Enhanced N8N CORS Proxy for Atlanta Gutter Guard Pros
export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    try {
      // Extract the N8N webhook URL from the request
      const url = new URL(request.url);
      const targetPath = url.searchParams.get('webhook');
      
      if (!targetPath) {
        return new Response('Missing webhook parameter', { status: 400 });
      }

      // Your N8N webhook URL
      const n8nWebhookUrl = 'https://czarkamxxx.app.n8n.cloud/webhook/65afb57e-1c89-44a3-b9bb-84013a4511d7/chat';

      // Get request data
      let requestData;
      if (request.method === 'POST') {
        requestData = await request.json();
      }

      // Enhanced data payload for N8N AI Agent
      const enhancedData = {
        message: requestData.message,
        sessionId: requestData.sessionId || 'atlanta_gutter_' + Date.now(),
        chatInput: requestData.message,
        timestamp: new Date().toISOString(),
        source: 'atlantagutterguardpros.com',
        // Additional context for N8N
        userInput: requestData.message,
        context: {
          business: 'Atlanta Gutter Guard Pros',
          agent: 'Sarah',
          sessionId: requestData.sessionId
        }
      };

      console.log('Forwarding to N8N:', enhancedData);

      // Forward request to N8N with proper headers
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'AtlantaGutterGuardPros-ChatBot/1.0',
        },
        body: JSON.stringify(enhancedData),
      });

      // Handle N8N response
      let responseData;
      const responseText = await n8nResponse.text();
      
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        // If N8N returns plain text, wrap it
        responseData = {
          message: responseText || "Hi! I'm Sarah from Atlanta Gutter Guard Pros. How can I help you today?",
          timestamp: new Date().toISOString(),
          sessionId: requestData.sessionId
        };
      }

      // Extract the actual message from various N8N response formats
      let finalMessage;
      
      if (responseData.message) {
        finalMessage = responseData.message;
      } else if (responseData.output) {
        finalMessage = responseData.output;
      } else if (responseData.response) {
        finalMessage = responseData.response;
      } else if (typeof responseData === 'string') {
        finalMessage = responseData;
      } else {
        // Fallback message
        finalMessage = "Hi! I'm Sarah from Atlanta Gutter Guard Pros. I'm here to help protect your home with premium gutter guards. What's your name?";
      }

      // Clean up the message if it contains error text
      if (finalMessage.includes("It seems like you're just saying") || 
          finalMessage.includes("error") || 
          finalMessage.includes("ERROR")) {
        finalMessage = "Hi! I'm Sarah from Atlanta Gutter Guard Pros. I'm here to help protect your home with premium gutter guards. What's your name?";
      }

      const cleanResponse = {
        message: finalMessage,
        timestamp: new Date().toISOString(),
        sessionId: requestData.sessionId || 'atlanta_gutter_session',
        status: 'success'
      };

      // Return response with CORS headers
      return new Response(JSON.stringify(cleanResponse), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      console.error('Proxy error:', error);
      
      // Return helpful fallback response
      const fallbackResponse = {
        message: "Hi! I'm Sarah from Atlanta Gutter Guard Pros. I'm here to help protect your home with premium gutter guards. For immediate assistance, please call (323) 325-1319!",
        timestamp: new Date().toISOString(),
        sessionId: 'fallback_session',
        status: 'fallback'
      };

      return new Response(JSON.stringify(fallbackResponse), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    }
  },
};
