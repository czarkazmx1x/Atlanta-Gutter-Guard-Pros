# N8N CORS FIX - Add these headers to your Respond to Webhook node

## In your N8N workflow:

### Respond to Webhook Node Configuration:
- Response Mode: "JSON"
- Response Code: 200

### Add Options → Response Headers:
```
Access-Control-Allow-Origin: https://atlantagutterguardpros.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### OR for development (less secure but works):
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Response Body:
```json
{
  "output": "{{ $json.response || $json.output }}",
  "sessionId": "{{ $json.sessionId }}",
  "timestamp": "{{ new Date().toISOString() }}"
}
```

## ALSO ADD: Handle OPTIONS requests

### Add a second Webhook node for preflight:
- HTTP Method: OPTIONS
- Response: Same CORS headers as above
- Response Body: (empty)

This handles the browser's preflight request that's currently failing.
