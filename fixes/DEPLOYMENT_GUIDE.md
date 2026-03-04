# Atlanta Gutter Guard Pros - AI Chat Bot Fix Guide

## Overview
This guide will help you fix the AI chat bot connection issues and get your lead generation system working properly.

## The Problem
The chat widget loads but can't connect to Mistral AI because:
1. The API key isn't properly deployed to Cloudflare
2. The widget is calling the wrong endpoint
3. Environment variables aren't connecting to the function

## The Solution

### Step 1: Test Locally First
```bash
cd C:\Users\jacos\Desktop\gutter-guard-website
npm install -g wrangler  # If not already installed
wrangler pages dev . --port 8788
```

Open http://localhost:8788 and test the chat widget. The API key should work from the .dev.vars file.

### Step 2: Deploy API Key to Cloudflare
```bash
# Add the Mistral API key as a secret
wrangler pages secret put MISTRAL_API_KEY

# When prompted, paste:
hKCnOoLbEXL18JLuj5N2wzTlwXKMmVFr
```

### Step 3: Deploy to Production
```bash
wrangler pages deploy . --project-name=atlanta-gutter-guard-pros
```

### Step 4: Verify in Cloudflare Dashboard
1. Log into Cloudflare Dashboard
2. Go to Pages > atlanta-gutter-guard-pros
3. Navigate to Settings > Environment variables
4. Confirm MISTRAL_API_KEY is listed (value will be hidden)

### Step 5: Test Production Site
Visit your staging URL: https://d4a73a85.atlanta-gutter-guard-pros.pages.dev

Test these messages:
- "How much do gutter guards cost?"
- "I have pine needle problems"
- "Do you serve Roswell?"
- "I need emergency repair"

## What This Fixes

✅ **Secure API Connection**: API key stored securely in Cloudflare
✅ **Proper Routing**: Widget calls /api/secure-chat endpoint
✅ **Smart Fallbacks**: If AI fails, professional responses still work
✅ **Lead Capture**: All responses route to (323) 325-1319

## Troubleshooting

### If API Still Doesn't Work:
1. Check browser console for errors (F12)
2. Verify the secret was added: `wrangler pages secret list`
3. Check function logs in Cloudflare Dashboard > Pages > Functions

### If Fallback Responses Work But Not AI:
- The API key might be incorrect or expired
- Check Mistral API status at https://status.mistral.ai

### CORS Errors:
- Already handled in the function with proper headers
- Make sure you're testing from the correct domain

## Alternative: Fallback-Only Mode

If you want to skip AI completely and use smart fallbacks:

1. Edit `/api/secure-chat` function
2. Change line 16 to: `return getSmartFallbackResponse(message);`
3. This gives professional responses without API costs

## Next Steps

Once working on staging:
1. Test thoroughly with various questions
2. Monitor for 24 hours
3. Push to custom domain: atlantagutterguardpros.com

## Support Contacts

- Cloudflare Pages: https://dash.cloudflare.com
- Mistral AI: https://console.mistral.ai
- Phone routing: (323) 325-1319

## Success Metrics

Monitor these KPIs:
- Widget load time < 2 seconds
- AI response time < 3 seconds
- Lead capture rate > 15%
- Phone call conversions

The bot should now work properly and generate leads 24/7!
