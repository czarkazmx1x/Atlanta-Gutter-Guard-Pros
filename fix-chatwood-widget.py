import os
import re

# Updated Chatwoot widget code with inline styles (no external CSS)
chatwood_widget_fixed = '''
    <!-- Chatwoot Widget for Atlanta Gutter Guard Pros -->
    <script>
        // Chatwoot Widget - Mixed Content Safe Version
        (function() {
            // Create launcher button
            const launcher = document.createElement('button');
            launcher.id = 'chatwood-launcher';
            launcher.innerHTML = '💬';
            launcher.setAttribute('aria-label', 'Chat with Atlanta Gutter Guard Pros');
            
            // Apply inline styles
            launcher.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #2e7d32;
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
                z-index: 99999;
                font-size: 28px;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            // Hover effects
            launcher.onmouseover = function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 6px 20px rgba(46, 125, 50, 0.4)';
            };
            
            launcher.onmouseout = function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(46, 125, 50, 0.3)';
            };
            
            // Click handler
            launcher.addEventListener('click', function() {                const width = 400;
                const height = 600;
                const left = window.innerWidth - width - 40;
                const top = 80;
                
                // Open Chatwoot in new window
                window.open(
                    'http://142.93.194.30:3000/widget?website_token=vK8J1K7q3xvDcXBnfenqVhaG',
                    'chatwood-widget',
                    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
                );
            });
            
            // Add to page when ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    document.body.appendChild(launcher);
                });
            } else {
                document.body.appendChild(launcher);
            }
        })();
    </script>
    <!-- End Chatwoot Widget -->
</body>'''

def fix_chatwood_widget(filepath):
    """Replace old Chatwoot widget with the fixed version"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove old widget implementation
        # Pattern to match the old widget code
        pattern = r'<!-- Chatwoot Widget for Atlanta Gutter Guard Pros -->.*?<!-- End Chatwoot Widget -->\s*</body>'
        
        if re.search(pattern, content, re.DOTALL):
            # Replace with new implementation
            new_content = re.sub(pattern, chatwood_widget_fixed, content, flags=re.DOTALL)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"[FIXED] Updated widget in: {filepath}")
            return True
        else:
            print(f"[SKIP] No widget found in: {filepath}")
            return False
            
    except Exception as e:
        print(f"[ERROR] Error processing {filepath}: {str(e)}")
        return False

# Process all HTML files
updated_count = 0
for filename in os.listdir('.'):
    if filename.endswith('.html'):
        if fix_chatwood_widget(filename):
            updated_count += 1

print(f"\n[COMPLETE] Fixed {updated_count} HTML files with updated Chatwoot widget!")
