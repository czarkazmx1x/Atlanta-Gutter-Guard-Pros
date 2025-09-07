/**
 * Secure Chat API - Cloudflare Pages Function
 * Keeps Mistral API key safe on server
 */

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Secure AI Response function
async function getSecureAIResponse(message, env) {
  const apiKey = env.MISTRAL_API_KEY;
  
  if (!apiKey) {
    return getSmartFallbackResponse(message);
  }

  try {
    const messages = [
      { 
        role: 'system', 
        content: `You are Alex, a friendly and knowledgeable gutter specialist for Atlanta Gutter Guard Pros. 

BUSINESS INFO:
- Company: Atlanta Gutter Guard Pros
- Phone: (470) 851-6780
- Service Area: Metro Atlanta (30-mile radius)
- Services: Gutter guard installation, cleaning, repair, emergency service

PRICING GUIDELINES:
- Gutter Guards: $8-15 per linear foot (mention free estimates)
- Cleaning: $150-300 depending on home size
- Repairs: $5-12 per linear foot
- Emergency service available

KEY POINTS:
- Always offer free estimates
- Mention lifetime warranties on gutter guards
- Focus on water damage prevention
- Pine needles are a major Atlanta problem
- Professional installation recommended

Keep responses helpful, under 150 words, and always include phone number for estimates.`
      },
      { role: 'user', content: message }
    ];

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
        max_tokens: 150
      })
    });

    if (!response.ok) {
      console.error(`Mistral API error ${response.status}`);
      return getSmartFallbackResponse(message);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('AI error:', error);
    return getSmartFallbackResponse(message);
  }
}

// Smart fallback responses (no API needed)
function getSmartFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Emergency responses
  if (lowerMessage.includes('emergency') || lowerMessage.includes('overflow') || lowerMessage.includes('leak')) {
    return "For emergency gutter issues, please call us immediately at (470) 851-6780. We offer same-day service for overflowing gutters and urgent repairs to prevent water damage to your home.";
  }
  
  // Gutter guard inquiries
  if (lowerMessage.includes('guard') || lowerMessage.includes('protection')) {
    return "Great choice! Our gutter guards prevent clogs and protect your home from water damage. We offer LeafFilter and micro-mesh systems starting around $8-15 per linear foot with lifetime warranties. When would you like a free estimate? Call (470) 851-6780.";
  }
  
  // Cleaning services
  if (lowerMessage.includes('clean') || lowerMessage.includes('maintenance')) {
    return "We provide thorough gutter cleaning services throughout Metro Atlanta for $150-300 depending on your home size. This includes complete inspection and minor repairs. Would you like to schedule? Call (470) 851-6780.";
  }
  
  // Pricing questions
  if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('much')) {
    return "Gutter guard installation typically costs $8-15 per linear foot depending on the system. Cleaning runs $150-300. We provide free estimates and lifetime warranties on guards. What's your address for an accurate quote? (470) 851-6780";
  }
  
  // Repair services
  if (lowerMessage.includes('repair') || lowerMessage.includes('fix') || lowerMessage.includes('broken')) {
    return "We handle all gutter repairs including sagging, leaks, and downspout issues. Most repairs cost $5-12 per linear foot. For a free estimate and same-day service, call (470) 851-6780 or provide your address.";
  }
  
  // Pine needle specific (Atlanta problem)
  if (lowerMessage.includes('pine') || lowerMessage.includes('needle') || lowerMessage.includes('clog')) {
    return "Pine needles are a major problem in Georgia! Our micro-mesh gutter guards are specifically designed to keep out pine needles while allowing proper water flow. Perfect solution for Atlanta homes. Want a free estimate? (470) 851-6780";
  }
  
  // Location/service area
  if (lowerMessage.includes('atlanta') || lowerMessage.includes('area') || lowerMessage.includes('serve')) {
    return "We serve all of Metro Atlanta within a 30-mile radius including Buckhead, Midtown, Sandy Springs, Roswell, and surrounding areas. All services come with free estimates and professional installation. Call (470) 851-6780.";
  }
  
  // Default helpful response
  return "Hi! I'm Alex from Atlanta Gutter Guard Pros. I can help with gutter guards, cleaning, repairs, and emergency services throughout Metro Atlanta. What specific questions do you have about protecting your home? For immediate assistance, call (470) 851-6780.";
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

    console.log(`📩 Secure chat request: "${message}"`);

    // Get AI or fallback response (API key stays secure on server)
    const reply = await getSecureAIResponse(message, env);

    console.log(`✅ Response generated: "${reply.substring(0, 50)}..."`);

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Secure chat error:', error);
    return new Response(
      JSON.stringify({ 
        reply: "I'd be happy to help you with your gutter needs! Please call us at (470) 851-6780 for immediate assistance, or let me know what questions you have about gutter guards."
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}