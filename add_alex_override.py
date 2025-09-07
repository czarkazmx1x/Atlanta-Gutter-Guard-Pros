import os
import re

# Force Alex configuration with override
ALEX_OVERRIDE = """    <!-- Force Alex Configuration -->
    <script>
    // Override any default Sam configuration
    (function() {
        // Wait for widget to load then force Alex
        function forceAlex() {
            // Find and update any Sam references
            const samElements = document.querySelectorAll('*');
            samElements.forEach(el => {
                if (el.textContent.includes('Sam') && el.textContent.includes('HVAC')) {
                    el.textContent = el.textContent.replace('Sam', 'Alex');
                    el.textContent = el.textContent.replace('Your HVAC Assistant', 'Your Gutter Guard Expert');
                }
            });
            
            // Update title if exists
            const titleEl = document.querySelector('[class*="assistant-title"], [class*="bot-title"]');
            if (titleEl) {
                titleEl.textContent = 'Alex - Your Gutter Guard Expert';
            }
        }
        
        // Run immediately and after delays
        setTimeout(forceAlex, 100);
        setTimeout(forceAlex, 500);
        setTimeout(forceAlex, 1000);
        setTimeout(forceAlex, 2000);
        
        // Override any config objects
        Object.defineProperty(window, 'widgetConfig', {
            get: () => ({
                name: 'Alex',
                title: 'Your Gutter Guard Expert',
                tenant: 'atlantagutter'
            })
        });
    })();
    </script>
    
    <!-- Service Bot Chat Widget -->
    <script src="https://superhuman.services/widget.js?tenant=atlantagutter"></script>
</body>"""

# Update just index.html for testing
filepath = r'C:\Users\jacos\Desktop\gutter-guard-website\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove existing widget
content = re.sub(
    r'<!-- Service Bot Chat Widget -->[\s\S]*?</script>\s*</body>',
    '</body>',
    content,
    flags=re.IGNORECASE
)

# Add override version
content = content.replace('</body>', ALEX_OVERRIDE)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added Alex override to index.html")
print("This forces 'Alex' to display while you fix the server")
