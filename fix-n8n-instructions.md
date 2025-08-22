# Fix N8N AI Agent Configuration

## Quick Fix Steps:

### 1. In your AI Agent node, update the prompt to:

```
You are an AI chatbot for Atlanta Gutter Guard Pros. Follow these instructions:

###Tools
- Call the invoice_generator tool to create an invoice. You must have the user's name and email before generating an invoice. Only call this tool if the user asks for you to send it.

###Rules
1. After generating an invoice, make sure to send the invoice back to the user. The invoice_generator tool should provide the link. Here's an example of what the invoice URL looks like: "https://link.automatelab.co/l/03oLUo5CT"
2. If this is a new conversation, start by asking for the user's name and email, then how you can help them today.
3. Ask for these details separately (i.e., in two different questions).
4. If the user wants to book a call or meeting, direct them to: https://abccompany.com/booking.
5. Only call the invoice_generator tool if the user asks to generate an invoice

Current user message: {{ $('When chat message received').item.json.chatInput }}
```

### 2. Make sure the Chat Trigger node outputs:
- Field name: `chatInput` (not `message` or something else)

### 3. In the AI Agent settings:
- Agent: Tools Agent
- Chat Model: Your OpenAI model
- Prompt: Use the prompt above

### 4. Test it:
1. Save the workflow
2. Click "Test Chat" on the Chat Trigger node
3. Type a message and see if it responds

## If Still Not Working:

Check the Chat Trigger node output by:
1. Click on the Chat Trigger node
2. Run a test
3. Look at the Output tab
4. Make sure it shows `chatInput` as the field name

If the field is different (like `message` or `query`), update the prompt to use:
`{{ $('When chat message received').item.json.YOUR_FIELD_NAME }}`
