import requests
import json
import time

def test_n8n_webhook():
    webhook_url = "https://czarkamxxx.app.n8n.cloud/webhook/ca436bba-e4cf-43d0-afa4-d80541d06722/chat"
    
    print("Testing N8N Webhook Connection...")
    print("URL:", webhook_url)
    print("-" * 50)
    
    # Test POST request
    test_data = {
        "chatInput": "Hello, I need a quote for gutter guards",
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
            timeout=15
        )
        
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print(f"Response Text: {response.text}")
        
        if response.status_code == 200:
            try:
                json_response = response.json()
                print("\nJSON Response:")
                print(json.dumps(json_response, indent=2))
            except:
                print("\nResponse is not valid JSON")
        
    except requests.exceptions.Timeout:
        print("\nERROR: Request timed out after 15 seconds")
        print("Possible issues:")
        print("- N8N workflow is not active")
        print("- Workflow is stuck or has errors")
        print("- No 'Respond to Webhook' node in workflow")
        
    except requests.exceptions.ConnectionError:
        print("\nERROR: Could not connect to webhook")
        print("Possible issues:")
        print("- N8N instance is down")
        print("- URL is incorrect")
        print("- Network/firewall issues")
        
    except Exception as e:
        print(f"\nERROR: {type(e).__name__}: {e}")

if __name__ == "__main__":
    test_n8n_webhook()
