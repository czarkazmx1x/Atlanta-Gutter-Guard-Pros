import os
import re

# More careful override that only changes text content
CAREFUL_ALEX_OVERRIDE = """    <!-- Carefully Force Alex for Atlanta Gutter -->
    <script>
    // Wait for widget to fully load before making changes
    let widgetCheckCount = 0;
    const checkAndFixWidget = function() {
        widgetCheckCount++;
        
        // Look specifically for the chat widget header or title
        const possibleSelectors = [
            '[class*="assistant"]',
            '[class*="header"]',
            '[class*="title"]',
            'h1', 'h2', 'h3', 'h4',
            '[class*="name"]'
        ];
        
        let foundAndFixed = false;
        
        possibleSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                // Only change text nodes, don't remove elements
                if (el.childNodes.length > 0) {
                    el.childNodes.forEach(node => {
                        if (node.nodeType === 3) { // Text node
                            if (node.textContent.includes('Sam') || node.textContent.includes('HVAC')) {
                                node.textContent = node.textContent
                                    .replace('Sam', 'Alex')
                                    .replace('Your HVAC Assistant', 'Your Gutter Guard Expert');
                                foundAndFixed = true;
                            }
                        }
                    });
                } else if (el.textContent && (el.textContent.includes('Sam') || el.textContent.includes('HVAC'))) {
                    // For elements with direct text content
                    const newText = el.textContent
                        .replace('Sam', 'Alex')
                        .replace('Your HVAC Assistant', 'Your Gutter Guard Expert');
                    if (el.textContent !== newText) {
                        el.textContent = newText;
                        foundAndFixed = true;
                    }
                }
            });
        });
        
        // Stop after 50 attempts (5 seconds) or if we found and fixed it
        if (widgetCheckCount < 50 && !foundAndFixed) {
            setTimeout(checkAndFixWidget, 100);
        }
    };
    
    // Start checking after a brief delay to let widget initialize
    setTimeout(checkAndFixWidget, 500);
    </script>
    
    <!-- Service Bot Chat Widget -->
    <script src="https://superhuman.services/widget.js?tenant=atlantagutter"></script>
</body>"""

html_files = [
    'index.html', 'services.html', 'calculator.html',
    'acworth-gutter-guards.html', 'brookhaven-gutter-guards.html',
    'chamblee-gutter-guards.html', 'gutter-guards-johns-creek-ga.html',
    'gutter-guards-marietta-ga.html', 'gutter-guards-roswell-ga.html',
    'gutter-guards-sandy-springs-ga.html', 'gutter-protection-decatur-ga.html',
    'kennesaw-gutter-guards.html', 'leaf-filter-installation-alpharetta.html',
    'milton-gutter-guards.html', 'smyrna-gutter-guards.html',
    'stone-mountain-gutter-guards.html', 'tucker-gutter-guards.html',
    'woodstock-gutter-guards.html'
]

for filename in html_files:
    filepath = os.path.join(r'C:\Users\jacos\Desktop\gutter-guard-website', filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove ALL existing widget code and overrides
        patterns = [
            r'<!-- Force Alex[^>]*-->[\s\S]*?</script>\s*',
            r'<!-- Carefully Force[^>]*-->[\s\S]*?</script>\s*',
            r'<!-- Service Bot Chat Widget -->[\s\S]*?</script>\s*',
            r'<script>\s*window\.addEventListener\(\'DOMContentLoaded\'[\s\S]*?</script>\s*'
        ]
        
        for pattern in patterns:
            content = re.sub(pattern, '', content, flags=re.IGNORECASE)
        
        # Clean up extra whitespace before </body>
        content = re.sub(r'\s+</body>', '\n</body>', content)
        
        # Add the new careful override
        content = content.replace('</body>', CAREFUL_ALEX_OVERRIDE)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated: {filename}")

print("\nDone! This version carefully changes only text content.")
print("Deploy with: npx wrangler pages deploy .")
