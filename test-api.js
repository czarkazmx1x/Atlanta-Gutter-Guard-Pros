// Test script to verify the API is working
async function testAPI() {
  console.log('Testing Atlanta Gutter Guard Pros API...\n');
  
  const testMessages = [
    "How much do gutter guards cost?",
    "I have pine needle problems",
    "Do you serve Roswell?",
    "I need emergency repair"
  ];
  
  for (const message of testMessages) {
    console.log(`Testing: "${message}"`);
    
    try {
      const response = await fetch('/api/secure-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          sessionId: 'test-session'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Response: ${data.reply.substring(0, 100)}...`);
      } else {
        console.log(`❌ Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ Network error: ${error.message}`);
    }
    
    console.log('---\n');
  }
}

// Run test when page loads
if (typeof window !== 'undefined') {
  window.testGutterAPI = testAPI;
  console.log('Test the API by running: testGutterAPI()');
}
