import os
import re

# Chatwoot widget code to insert
chatwood_widget = '''
    <!-- Chatwoot Widget for Atlanta Gutter Guard Pros -->
    <style>
        #chatwood-launcher {
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
        }
        
        #chatwood-launcher:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
        }
    </style>
    
    <script>
        // Chatwoot Widget Integration
        (function() {
            const launcher = document.createElement('button');
            launcher.id = 'chatwood-launcher';
            launcher.innerHTML = '💬';
            launcher.setAttribute('aria-label', 'Chat with Atlanta Gutter Guard Pros');
            
            const CHATWOOD_URL = 'http://142.93.194.30:3000';
            const WIDGET_TOKEN = 'vK8J1K7q3xvDcXBnfenqVhaG';
            
            launcher.addEventListener('click', function() {
                const width = 400;
                const height = 600;
                const left = window.innerWidth - width - 40;
                const top = 80;
                
                window.open(                    `${CHATWOOD_URL}/widget?website_token=${WIDGET_TOKEN}`,
                    'chatwood-widget',
                    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
                );
            });
            
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

def add_chatwood_to_html(filepath):
    """Add Chatwoot widget to an HTML file if not already present"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if Chatwoot is already added
        if 'chatwood-launcher' in content:
            print(f"[OK] Chatwoot already present in: {filepath}")
            return False
        
        # Find the closing body tag and insert the widget before it
        pattern = r'</body>'
        if re.search(pattern, content, re.IGNORECASE):
            new_content = re.sub(pattern, chatwood_widget, content, flags=re.IGNORECASE)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"[OK] Added Chatwoot to: {filepath}")
            return True
        else:
            print(f"[SKIP] No </body> tag found in: {filepath}")
            return False
            
    except Exception as e:
        print(f"[ERROR] Error processing {filepath}: {str(e)}")
        return False

# Process all HTML files in the current directory
updated_count = 0
for filename in os.listdir('.'):
    if filename.endswith('.html'):
        if add_chatwood_to_html(filename):
            updated_count += 1

print(f"\n[COMPLETE] Updated {updated_count} HTML files with Chatwoot widget!")
