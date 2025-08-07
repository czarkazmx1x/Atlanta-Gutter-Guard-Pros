/**
 * Cloudflare Pages Function - Atlanta Gutter Guard Pros Chat API
 * Serverless backend for chat bot functionality
 */

// Environment variables needed:
// MISTRAL_API_KEY - Your Mistral AI API key

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

// Gutter-specific system prompt
const GUTTER_SYSTEM_PROMPT = `You are Alex, a friendly and knowledgeable gutter guard specialist for Atlanta Gutter Guard Pros. You help homeowners protect their homes from water damage through professional gutter guard installation and maintenance.

KEY INFORMATION:
- Company: Atlanta Gutter Guard Pros
- Service Area: Metro Atlanta and surrounding areas
- Phone: (404) 555-4888
- Services: Gutter guard installation, gutter cleaning, gutter repair, downspout services
- Specialty: Pine needle protection, micro-mesh gutter guards
- Guarantees: FREE estimates, lifetime warranties on gutter guards

YOUR ROLE:
1. Help customers understand gutter guard benefits
2. Assess their specific needs (pine needles, leaf protection, etc.)
3. Schedule free estimates
4. Handle emergency gutter issues
5. Educate about water damage prevention

CONVERSATION FLOW:
1. Greet warmly and ask about their gutter concerns
2. Understand their specific problems (clogging, cleaning frequency, etc.)
3. Explain appropriate solutions (micro-mesh guards, cleaning services)
4. Offer free estimate scheduling
5. Provide contact information for urgent needs

IMPORTANT GUIDELINES:
- Always emphasize FREE estimates
- Mention lifetime warranties on gutter guards
- Focus on water damage prevention
- Ask about pine needles (common in Georgia)
- Be helpful for emergency repairs
- Keep responses conversational and friendly
- Don't quote specific prices without assessment

Remember: You're representing a premium local business that cares about protecting Atlanta homes from water damage.`;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// AI Response function
async function getAIResponse(message, conversationHistory = [], env) {
  const apiKey = env.MISTRAL_API_KEY;
  
  if (!apiKey) {
    return "Chat service is not configured. Please call us at (404) 555-4888 for immediate assistance!";
  }

  try {
    const messages = [
      { role: 'system', content: GUTTER_SYSTEM_PROMPT }
    ];

    // Add conversation history (last 8 messages to stay within limits)
    const recentHistory = conversationHistory.slice(-8);
    recentHistory.forEach(msg => {
      messages.push({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    });

    // Add current message
    messages.push({ role: 'user', content: message });

    console.log(`🤖 Sending to Mistral AI: "${message}"`);

    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-medium-latest',
        messages: messages,
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Mistral API error ${response.status}:`, errorText);
      return "I'm having trouble connecting right now. Please call us at (404) 555-4888 for immediate assistance!";
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    
    console.log(`✅ AI Response: "${reply}"`);
    return reply;

  } catch (error) {
    console.error('AI error:', error);
    return "I'm having trouble connecting to the chat service. Please call us at (404) 555-4888 for immediate assistance!";
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { message, sessionId } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`📩 Received: "${message}" from session: ${sessionId}`);

    // For Cloudflare Pages Functions, we'll use simple conversation handling
    // In production, you could use Cloudflare KV or D1 for persistence
    const conversationHistory = []; // Simple approach for now

    // Get AI response
    const reply = await getAIResponse(message, conversationHistory, env);

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Chat endpoint error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Sorry, I\'m having trouble right now. Please call us at (404) 555-4888 for immediate assistance!' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}