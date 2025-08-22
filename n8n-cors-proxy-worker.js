// ========================================================================
// ATLANTA GUTTER GUARD PROS - N8N CORS PROXY WORKER (FIXED VERSION)
// ========================================================================
// This Cloudflare Worker solves CORS issues between the website and N8N
// Deployed at: https://atlanta-gutter-n8n-proxy.acostajohn-qe.workers.dev
// ========================================================================

export default {
  async fetch(request, env, ctx) {
    console.log('🔄 CORS Proxy Request:', request.method, request.url);

    // Handle CORS preflight requests (OPTIONS)
    if (request.method === 'OPTIONS') {
      console.log('✈️ Handling CORS preflight request');
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

    // Health check endpoint
    const url = new URL(request.url);
    if (url.pathname === '/health') {
      return new Response('✅ Atlanta Gutter CORS Proxy is healthy!', {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain',
        }
      });
    }

    try {
      // N8N webhook URL (your actual webhook)
      const N8N_WEBHOOK_URL = 'https://czarkamxxx.app.n8n.cloud/webhook/65afb57e-1c89-44a3-b9bb-84013a4511d7/chat';
      
      // Get request data
      let requestData = {};
      if (request.method === 'POST') {
        const contentType = request.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          requestData = await request.json();
        } else {
          const text = await request.text();
          try {
            requestData = JSON.parse(text);
          } catch {
            requestData = { message: text };
          }
        }
      }

      console.log('📤 Forwarding to N8N:', requestData);

      // Prepare data for N8N with proper format
      const n8nData = {
        chatInput: requestData.message || requestData.chatInput || 'Hello',
        sessionId: requestData.sessionId || 'atlanta_gutter_' + Date.now(),
        timestamp: new Date().toISOString(),
        source: 'atlantagutterguardpros.com',
        userAgent: request.headers.get('user-agent') || 'Unknown',
        // Pass through any additional data
        ...requestData
      };

      // Forward request to N8N with proper headers
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Atlanta-Gutter-CORS-Proxy/1.0',
        },
        body: JSON.stringify(n8nData),
      });

      console.log('📥 N8N Response Status:', n8nResponse.status);

      // Get response from N8N
      let responseData;
      const responseText = await n8nResponse.text();
      
      try {
        responseData = JSON.parse(responseText);
      } catch {
        // If N8N returns plain text, wrap it in JSON
        responseData = {
          message: responseText || "Hi! I'm Sarah from Atlanta Gutter Guard Pros. How can I help you with gutter guards today?",
          timestamp: new Date().toISOString(),
          sessionId: n8nData.sessionId
        };
      }

      console.log('✅ Returning response:', responseData);

      // Return response with full CORS headers
      return new Response(JSON.stringify(responseData), {
        status: n8nResponse.ok ? 200 : n8nResponse.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Expose-Headers': '*',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });

    } catch (error) {
      console.error('❌ CORS Proxy Error:', error);
      
      // Return professional fallback response with CORS headers
      const fallbackResponse = {
        message: "Hi! I'm Sarah from Atlanta Gutter Guard Pros. I'm here to help with gutter guards and leaf protection systems. For immediate assistance, please call (470) 851-6780!",
        timestamp: new Date().toISOString(),
        sessionId: 'fallback_' + Date.now(),
        error: false, // Don't show as error to user
        fallback: true
      };

      return new Response(JSON.stringify(fallbackResponse), {
        status: 200, // Return 200 even on error for better UX
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
        },
      });
    }
  },
};
