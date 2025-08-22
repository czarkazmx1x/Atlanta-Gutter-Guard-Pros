// Cloudflare Worker - N8N CORS Proxy for Atlanta Gutter Guard Pros
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

      // Add session memory data
      const enhancedData = {
        ...requestData,
        sessionId: requestData.sessionId || 'atlanta_gutter_' + Date.now(),
        chatInput: requestData.message,
        timestamp: new Date().toISOString(),
        source: 'atlantagutterguardpros.com'
      };

      // Forward request to N8N
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedData),
      });

      // Get response from N8N
      const responseData = await n8nResponse.text();
      
      // Return response with CORS headers
      return new Response(responseData, {
        status: n8nResponse.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      console.error('Proxy error:', error);
      
      // Return fallback response
      const fallbackResponse = {
        message: "Hi! I'm Sarah from Atlanta Gutter Guard Pros. I'm here to help with gutter guards. For immediate assistance, please call (470) 851-6780!",
        timestamp: new Date().toISOString(),
        sessionId: 'fallback_session'
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
