# EXACT N8N AI AGENT CONFIGURATION FIX

## In your AI Agent node, set these EXACT values:

### 1. Click on AI Agent node → Parameters tab

### 2. Set these fields EXACTLY:

**Agent:**
- Tools Agent

**Prompt (User Message):**
```
{{ $input.item.json.chatInput }}
```

**System Message:**
```
You are an AI assistant for Atlanta Gutter Guard Pros. Help customers with gutter guard inquiries and collect their information for quotes.
```

### 3. IMPORTANT - Check these settings:

- **Chat Model**: Make sure your OpenAI model is selected
- **Require Specific Output Format**: OFF (unchecked)
- **Options** → Click to expand:
  - **System Message**: Make sure it's using the field above
  - **Max Iterations**: 1

### 4. Common Issues:

If you see `{{ $json.chatInput }}` anywhere, change it to:
`{{ $input.item.json.chatInput }}`

OR try:
`{{ $('When chat message received').item.json.chatInput }}`

### 5. Save and Test

The key is the AI Agent should ONLY receive the user's message, not any system instructions in the prompt field.
