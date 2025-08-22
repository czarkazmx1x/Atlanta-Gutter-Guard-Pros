# N8N CONNECTION TROUBLESHOOTING GUIDE
## Atlanta Gutter Guard Pros Chat Widget

### CURRENT ISSUE
The webhook is returning a 404 error with message:
```
"The workflow must be active for a production URL to run successfully."
```

### IMMEDIATE ACTIONS NEEDED

#### 1. Activate Your N8N Workflow
1. Log into your n8n dashboard at: https://czarkamxxx.app.n8n.cloud
2. Find your chat workflow
3. **Click the toggle switch in the top-right to ACTIVATE it** (should be green)
4. Save the workflow

#### 2. Verify Webhook Configuration
Your webhook URL is: 
```
https://czarkamxxx.app.n8n.cloud/webhook/ca436bba-e4cf-43d0-afa4-d80541d06722/chat
```

Make sure your webhook node:
- Path is set to: `/ca436bba-e4cf-43d0-afa4-d80541d06722/chat`
- HTTP Method: POST
- Authentication: None (for public access)
- Response Mode: "Using 'Respond to Webhook' Node"

#### 3. Add CORS Headers
In your **Respond to Webhook** node:
1. Click "Add Option" → "Response Headers"
2. Add these headers:
   - `Access-Control-Allow-Origin`: `*` (or `https://atlantagutterguardpros.com` for production)
   - `Access-Control-Allow-Methods`: `GET, POST, OPTIONS`
   - `Access-Control-Allow-Headers`: `Content-Type`

#### 4. Simple Working Workflow Structure
```
[Webhook] → [Your AI/Logic] → [Respond to Webhook]
```

The Respond to Webhook should return:
```json
{
  "output": "Your response text here",
  "sessionId": "{{ $json.sessionId }}",
  "timestamp": "{{ new Date().toISOString() }}"
}
```

### TEST YOUR CONNECTION

#### Option 1: Use the Test Page
1. Open `n8n-test-page.html` in your browser
2. Click "Test Connection" to verify webhook is active
3. Click "Test Chat Message" to test the full flow

#### Option 2: Use Python Script
```bash
cd Atlanta-Gutter-Guard-Pros
python test-n8n-connection.py
```

#### Option 3: Use cURL
```bash
curl -X POST https://czarkamxxx.app.n8n.cloud/webhook/ca436bba-e4cf-43d0-afa4-d80541d06722/chat \
  -H "Content-Type: application/json" \
  -d '{"chatInput": "Hello", "sessionId": "test-123"}'
```

### COMMON ISSUES & FIXES

#### Issue: 404 Not Found
- **Solution**: Activate your workflow (green toggle)

#### Issue: CORS Error in Browser
- **Solution**: Add CORS headers to Respond to Webhook node

#### Issue: Timeout (No Response)
- **Solution**: Make sure you have a "Respond to Webhook" node that executes

#### Issue: 500 Internal Error
- **Solution**: Check n8n workflow execution logs for errors

### FILES TO DEPLOY (After Testing)

1. **index.html** - Your main website with chat widget
2. **.htaccess** - Fixes MIME type issues

### VERIFICATION CHECKLIST

- [ ] N8N workflow is ACTIVE (green toggle)
- [ ] Webhook accepts POST requests
- [ ] Workflow has "Respond to Webhook" node
- [ ] CORS headers are configured
- [ ] Test page shows successful connection
- [ ] Chat messages get responses

### SUPPORT CONTACTS

- **Your Business**: Atlanta Gutter Guard Pros
- **Phone**: (470) 851-6780
- **N8N Instance**: https://czarkamxxx.app.n8n.cloud
- **Webhook**: /webhook/ca436bba-e4cf-43d0-afa4-d80541d06722/chat

### NEXT STEPS

1. **Fix n8n workflow** (activate it)
2. **Test connection** using the test page
3. **Deploy files** to your website
4. **Monitor** for any issues

The chat widget has intelligent fallback responses, so even if n8n fails, customers will still get helpful information about your gutter guard services!
