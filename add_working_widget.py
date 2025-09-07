import os
import re

# The simple working widget code
WORKING_WIDGET = """    <!-- Service Bot Chat Widget -->
    <script src="https://superhuman.services/widget.js?tenant=atlantagutter"></script>
</body>"""

# List of HTML files to update
html_files = [
    'index.html',
    'services.html',
    'calculator.html',
    'acworth-gutter-guards.html',
    'brookhaven-gutter-guards.html',
    'chamblee-gutter-guards.html',
    'gutter-guards-johns-creek-ga.html',
    'gutter-guards-marietta-ga.html',
    'gutter-guards-roswell-ga.html',
    'gutter-guards-sandy-springs-ga.html',
    'gutter-protection-decatur-ga.html',
    'kennesaw-gutter-guards.html',
    'leaf-filter-installation-alpharetta.html',
    'milton-gutter-guards.html',
    'smyrna-gutter-guards.html',
    'stone-mountain-gutter-guards.html',
    'tucker-gutter-guards.html',
    'woodstock-gutter-guards.html'
]

def add_working_widget(filepath):
    """Add the simple working widget to HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove ALL old widget code
        patterns_to_remove = [
            r'<!-- Atlanta Gutter Guard Pros - AI Service Bot[^>]*-->[\s\S]*?</script>\s*(?=</body>)',
            r'<!-- Service Bot Chat Widget -->[\s\S]*?</script>\s*(?=</body>)',
            r'<script[^>]*src=["\'][^"\']*atlanta-widget-override\.js["\'][^>]*></script>\s*',
            r'<script[^>]*>[\s\S]*?ServiceBotConfig[\s\S]*?</script>\s*(?=</body>)',
            r'<script[^>]*src=["\'][^"\']*superhuman\.services/widget\.js[^"\']*["\'][^>]*></script>\s*'
        ]
        
        for pattern in patterns_to_remove:
            content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.MULTILINE)
        
        # Clean up any extra whitespace before </body>
        content = re.sub(r'\s+</body>', '\n</body>', content)
        
        # Add the simple working widget
        content = content.replace('</body>', WORKING_WIDGET)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
            
    except Exception as e:
        print(f"Error updating {filepath}: {str(e)}")
        return False

# Update all files
print("Adding working Service Bot widget to all HTML files...")
print("=" * 50)
print("Widget code: <script src=\"https://superhuman.services/widget.js?tenant=atlantagutter\"></script>")
print("=" * 50)

updated = 0
for filename in html_files:
    filepath = os.path.join(r'C:\Users\jacos\Desktop\gutter-guard-website', filename)
    if os.path.exists(filepath):
        if add_working_widget(filepath):
            print(f"[OK] Updated: {filename}")
            updated += 1
        else:
            print(f"[FAIL] Failed: {filename}")
    else:
        print(f"[SKIP] Not found: {filename}")

print("=" * 50)
print(f"[SUCCESS] Updated {updated} out of {len(html_files)} files")
print("\n[DEPLOY] Ready to deploy!")
print("Run: npx wrangler pages deploy . --project-name=atlanta-gutter-guard-pros")
