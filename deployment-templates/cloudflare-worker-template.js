// ==================================================================
// CLOUDFLARE WORKER TEMPLATE FOR NEW BUSINESS
// ==================================================================
// 1. Replace YOUR_N8N_WEBHOOK_URL with your actual N8N webhook
// 2. Update business info in the fallback response
// 3. Deploy this worker to Cloudflare
// ==================================================================

export default {
  async fetch(request, env, ctx) {
    console.log('🔄 Business CORS Proxy Request:', request.method, request.url);

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
      return new Response('✅ Business N8N CORS Proxy is healthy!', {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain',
        }
      });
    }

    try {
      // ======================================
      // 🔧 CUSTOMIZE: Replace with your N8N webhook URL
      // ======================================
      const N8N_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';
      
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
        sessionId: requestData.sessionId || 'business_chat_' + Date.now(),
        timestamp: new Date().toISOString(),
        source: requestData.source || 'business-website.com',
        userAgent: request.headers.get('user-agent') || 'Unknown',
        // Pass through any additional data
        ...requestData
      };

      // Forward request to N8N with proper headers
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Business-CORS-Proxy/1.0',
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
          message: responseText || "Hi! I'm here to help with your business needs. How can I assist you today?",
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
      
      // ======================================
      // 🔧 CUSTOMIZE: Update fallback response for your business
      // ======================================
      const fallbackResponse = {
        message: "Hi! I'm here to help with your business needs. For immediate assistance, please call (YOUR-PHONE-NUMBER)!",
        timestamp: new Date().toISOString(),
        sessionId: 'fallback_' + Date.now(),
        error: false,
        fallback: true
      };

      return new Response(JSON.stringify(fallbackResponse), {
        status: 200,
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
