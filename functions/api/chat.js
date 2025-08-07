/**
 * Cloudflare Pages Function - Chat API with Fallback
 * If API key isn't available, provides professional fallback responses
 */

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

// Professional fallback responses for when API isn't available
const fallbackResponses = [
  "Hi! I'm Alex from Atlanta Gutter Guard Pros. I'd be happy to help you with your gutter needs! We specialize in gutter guard installation and maintenance throughout Metro Atlanta. What specific concerns do you have about your gutters?",
  
  "That's a great question! We offer comprehensive gutter solutions including micro-mesh gutter guards that are perfect for Georgia's pine needle problems. Our guards come with a lifetime warranty and we provide FREE estimates. What's your address so we can schedule a consultation?",
  
  "Absolutely! We serve all of Metro Atlanta with professional gutter guard installation. Our micro-mesh technology keeps out even the smallest debris while allowing water to flow freely. When would be convenient for a free estimate? You can also call us directly at (404) 555-4888.",
  
  "For emergency gutter repairs, please call us immediately at (404) 555-4888. We offer same-day service for urgent issues. For non-emergency gutter guard installations and cleaning, I can help schedule your free estimate. What area of Atlanta are you located in?",
  
  "Our gutter guards are specifically designed for Georgia homes and are excellent at handling pine needles, leaves, and other debris. Installation typically takes just a few hours and comes with our lifetime warranty. Would you like to schedule a free estimate to see how much you could save?",
  
  "Great choice! Gutter guards will save you time and protect your home from water damage. We've been serving Atlanta homeowners for years with premium gutter protection solutions. For the most accurate pricing, we'd need to see your home. When would work best for a free consultation?"
];

let responseIndex = 0;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// AI Response function with fallback
async function getAIResponse(message, conversationHistory = [], env) {
  const apiKey = env.MISTRAL_API_KEY;
  
  // If no API key, use professional fallback responses
  if (!apiKey) {
    console.log('No API key found, using fallback response');
    const response = fallbackResponses[responseIndex % fallbackResponses.length];
    responseIndex++;
    return response;
  }

  try {
    const messages = [
      { 
        role: 'system', 
        content: `You are Alex, a friendly and knowledgeable gutter guard specialist for Atlanta Gutter Guard Pros. You help homeowners protect their homes from water damage through professional gutter guard installation and maintenance.

KEY INFORMATION:
- Company: Atlanta Gutter Guard Pros
- Service Area: Metro Atlanta and surrounding areas
- Phone: (404) 555-4888
- Services: Gutter guard installation, gutter cleaning, gutter repair, downspout services
- Specialty: Pine needle protection, micro-mesh gutter guards
- Guarantees: FREE estimates, lifetime warranties on gutter guards

IMPORTANT GUIDELINES:
- Always emphasize FREE estimates
- Mention lifetime warranties on gutter guards
- Focus on water damage prevention
- Ask about pine needles (common in Georgia)
- Be helpful for emergency repairs
- Keep responses conversational and friendly
- Don't quote specific prices without assessment

Remember: You're representing a premium local business that cares about protecting Atlanta homes from water damage.`
      }
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
      // Fall back to professional response
      const fallback = fallbackResponses[responseIndex % fallbackResponses.length];
      responseIndex++;
      return fallback;
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    
    console.log(`✅ AI Response: "${reply}"`);
    return reply;

  } catch (error) {
    console.error('AI error:', error);
    // Fall back to professional response
    const fallback = fallbackResponses[responseIndex % fallbackResponses.length];
    responseIndex++;
    return fallback;
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

    // For now, simple conversation handling
    const conversationHistory = [];

    // Get AI or fallback response
    const reply = await getAIResponse(message, conversationHistory, env);

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Chat endpoint error:', error);
    return new Response(
      JSON.stringify({ 
        reply: "I'd be happy to help you with your gutter needs! Please call us at (404) 555-4888 for immediate assistance, or let me know what questions you have about gutter guards."
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}