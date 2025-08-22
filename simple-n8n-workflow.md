# SIMPLE N8N WORKFLOW FOR TESTING
# Copy this into a new n8n workflow to test basic connectivity

## Node 1: Webhook (Trigger)
- Node Type: Webhook
- HTTP Method: POST
- Response Mode: "Using 'Respond to Webhook' Node"
- Path: /test-chat

## Node 2: Set (Data Processing)
- Node Type: Set
- Operation: "Keep Only Set"
- Values to Set:
  - Name: response
  - Type: String
  - Value: "Hello! This is a test response from n8n. Your message was: {{ $json.chatInput }}"

## Node 3: Respond to Webhook (Response)
- Node Type: Respond to Webhook
- Respond With: "First Incoming Item"
- Response Code: 200

## EXPECTED FLOW:
1. Webhook receives POST request
2. Set node creates simple response message
3. Respond to Webhook sends response back

## TESTING:
Once you create this simple workflow:
1. Activate it
2. Copy the production webhook URL
3. Test with: curl -X POST [webhook-url] -H "Content-Type: application/json" -d '{"chatInput":"test"}'

This should respond in under 2 seconds with your test message.
