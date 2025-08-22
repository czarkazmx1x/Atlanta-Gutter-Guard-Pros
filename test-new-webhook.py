import requests
import json
import time

def test_new_webhook():
    # New webhook URL
    webhook_url = "https://czarkamxxx.app.n8n.cloud/webhook/65afb57e-1c89-44a3-b9bb-84013a4511d7/chat"
    
    print("Testing NEW N8N Webhook Connection...")
    print("URL:", webhook_url)
    print("-" * 50)
    
    # Test with proper message format for n8n Chat Trigger
    test_data = {
        "message": "Hello, I need a quote for gutter guards on my 2-story home",
        "sessionId": f"test-{int(time.time())}",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    
    print("\nSending test message...")
    print("Data:", json.dumps(test_data, indent=2))
    
    try:
        response = requests.post(
            webhook_url,
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=30  # Increased timeout for AI response
        )
        
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print(f"\nResponse Text: {response.text}")
        
        if response.status_code == 200:
            try:
                json_response = response.json()
                print("\n✅ SUCCESS! JSON Response:")
                print(json.dumps(json_response, indent=2))
            except:
                if response.text:
                    print("\n✅ SUCCESS! Got response (non-JSON):")
                    print(response.text)
                else:
                    print("\n⚠️ WARNING: Empty response body")
        
    except requests.exceptions.Timeout:
        print("\n❌ ERROR: Request timed out after 30 seconds")
        print("The workflow might be stuck or taking too long to respond")
        
    except Exception as e:
        print(f"\n❌ ERROR: {type(e).__name__}: {e}")

if __name__ == "__main__":
    test_new_webhook()
