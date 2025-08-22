# SIMPLIFIED N8N CHATBOT WORKFLOW - WORKING VERSION
# Copy this step-by-step to create a new workflow

## STEP 1: Webhook Trigger
- Node: Webhook
- HTTP Method: POST
- Response: "Using 'Respond to Webhook' Node"
- Path: /simple-chat

## STEP 2: AI Agent (OpenAI)
- Node: OpenAI Chat Model
- Model: gpt-3.5-turbo or gpt-4
- System Message: "You are a helpful assistant for Atlanta Gutter Guard Pros. Help customers with gutter guard questions, provide quotes (1-story: $800-1200, 2-story: $1400-2000), and schedule appointments. Be friendly and professional."
- User Message: {{ $json.chatInput }}

## STEP 3: Response
- Node: Respond to Webhook
- Respond With: "JSON"
- Response Body: 
```json
{
  "output": "{{ $json.choices[0].message.content }}",
  "sessionId": "{{ $json.sessionId || 'default' }}",
  "timestamp": "{{ new Date().toISOString() }}"
}
```

## CONNECTIONS:
Webhook → OpenAI Chat Model → Respond to Webhook

## WHAT TO REMOVE (Temporarily):
- Window Buffer Memory (causing the error)
- Complex branching
- Multiple AI agents
- Wait nodes
- HTTP Request nodes
- Any other complex logic

## TEST THIS FIRST:
Once this simple version works (should respond in 2-3 seconds), then we can add complexity back gradually.

## AFTER IT WORKS:
1. Test with: {"chatInput": "Hello, I need gutter guards"}
2. Should get OpenAI response back
3. No timeouts or errors
4. Then we can add back the advanced features
