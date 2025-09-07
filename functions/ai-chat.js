// Cloudflare Worker for Mistral AI Integration
export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { message } = await request.json();
      
      const systemPrompt = `You are Alex, a helpful gutter expert for Atlanta Gutter Guard Pros. You help customers with:
      - Gutter guard installation ($8-15/ft, lifetime warranty)
      - Gutter cleaning and maintenance 
      - Gutter repairs and replacement
      - Downspout services
      - Service areas: Atlanta Metro, Roswell, Marietta, Decatur, Sandy Springs
      
      Always be helpful, mention the phone (470) 851-6780 for quotes, and focus on solving their gutter problems.
      Keep responses under 150 words and conversational.`;

      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ADUd3U012VL2IgUZUInxPc4CSUc8xd6t'
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      return new Response(JSON.stringify({ response: aiResponse }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ 
        response: `Thanks for your message! I'm having a technical issue right now. Please call us directly at (470) 851-6780 for immediate help with your gutter needs, or try your question again in a moment.` 
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};