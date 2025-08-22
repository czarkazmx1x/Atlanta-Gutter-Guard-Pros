#!/usr/bin/env python3
"""
N8N Webhook Tester for Atlanta Gutter Guard Pros
Tests webhook connectivity and responses
"""

import requests
import json
import time
from datetime import datetime

def test_webhook():
    webhook_url = "https://czarkamxxx.app.n8n.cloud/webhook/ca436bba-e4cf-43d0-afa4-d80541d06722/chat"
    
    print("🔍 N8N Webhook Connection Tester")
    print("=" * 50)
    print(f"Testing URL: {webhook_url}")
    print()
    
    # Test 1: Basic GET request
    print("📡 Test 1: GET Request")
    try:
        response = requests.get(webhook_url, timeout=10)
        print(f"✅ Status: {response.status_code}")
        print(f"✅ Response: {response.text[:200]}...")
    except requests.exceptions.Timeout:
        print("❌ Timeout after 10 seconds")
    except requests.exceptions.ConnectionError:
        print("❌ Connection failed - webhook may not be active")
    except Exception as e:
        print(f"❌ Error: {e}")
    print()
    
    # Test 2: POST request with chat data
    print("📡 Test 2: POST Request with Chat Data")
    test_data = {
        "chatInput": "Hello, this is a test message",
        "sessionId": f"test-{int(time.time())}",
        "timestamp": datetime.now().isoformat()
    }
    
    try:
        response = requests.post(
            webhook_url,
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=15
        )
        print(f"✅ Status: {response.status_code}")
        print(f"✅ Headers: {dict(response.headers)}")
        print(f"✅ Response: {response.text}")
        
        # Try to parse JSON response
        try:
            json_response = response.json()
            print(f"✅ JSON Response: {json.dumps(json_response, indent=2)}")
        except:
            print("⚠️ Response is not JSON")
            
    except requests.exceptions.Timeout:
        print("❌ Timeout after 15 seconds")
    except requests.exceptions.ConnectionError:
        print("❌ Connection failed")
    except Exception as e:
        print(f"❌ Error: {e}")
    print()
    
    # Test 3: Different HTTP methods
    print("📡 Test 3: Testing Different HTTP Methods")
    methods = ['OPTIONS', 'HEAD']
    
    for method in methods:
        try:
            response = requests.request(method, webhook_url, timeout=5)
            print(f"✅ {method}: {response.status_code}")
        except Exception as e:
            print(f"❌ {method}: {e}")
    print()
    
    # Test 4: Check if webhook is even reachable
    print("📡 Test 4: Basic Connectivity Test")
    try:
        # Just ping the domain
        domain_url = "https://czarkamxxx.app.n8n.cloud"
        response = requests.get(domain_url, timeout=10)
        print(f"✅ N8N instance reachable: {response.status_code}")
    except Exception as e:
        print(f"❌ N8N instance not reachable: {e}")
    
    print()
    print("🎯 TROUBLESHOOTING CHECKLIST:")
    print("1. ✓ Is your n8n workflow ACTIVE (green toggle)?")
    print("2. ✓ Are you using the PRODUCTION webhook URL?")
    print("3. ✓ Is the webhook node set to accept POST requests?")
    print("4. ✓ Does your workflow have a 'Respond to Webhook' node?")
    print("5. ✓ Is your n8n instance running and accessible?")

if __name__ == "__main__":
    test_webhook()
