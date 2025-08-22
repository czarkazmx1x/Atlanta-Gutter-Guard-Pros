# N8N Workflow Debugging Guide

## Quick Checks:

### 1. Check Your AI Provider
- Go to your AI Agent node
- Click on it and check for any error messages
- Verify your API credentials are still valid

### 2. Check Executions
- Click "Executions" in the left sidebar
- Look for failed executions (red)
- Click to see which node is failing

### 3. Common Fixes:

#### If OpenAI API Key Issue:
- Check your OpenAI account for usage/billing
- Verify the API key in n8n credentials

#### If Memory Node Issue:
- Remove Window Buffer Memory nodes temporarily
- Test without them

#### If Routing Issue:
- Make sure your workflow has a clear path to return a response
- The "Send a message in Gmail" path might not be returning to the chat

## Temporary Simple Workflow:

1. Disconnect everything except:
   ```
   [Chat Trigger] → [AI Agent] → [Respond to Webhook]
   ```

2. In the Respond to Webhook node:
   - Set to "Last Node"
   - Response Code: 200
   - Response Data: `{{ $json }}`

3. Test this simplified version

## What Success Looks Like:
- In Executions: All nodes should be green
- Test chat should show AI responses
- No timeout errors

Let me know what you find in the Executions history!
