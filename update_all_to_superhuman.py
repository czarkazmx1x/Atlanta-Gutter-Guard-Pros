import os
import re

# Define the superhuman.services widget code
SUPERHUMAN_WIDGET = """
    <!-- Atlanta Gutter Guard Pros - AI Service Bot (Superhuman.services) -->
    <script>
      window.ServiceBotConfig = {
        tenant: 'atlantagutter',
        businessName: 'Atlanta Gutter Guard Pros',
        primaryColor: '#2c3e50',
        phoneNumber: '(323) 325-1319'
      };
    </script>
    <script src="https://superhuman.services/widget.js" async></script>
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

def update_html_file(filepath):
    """Update HTML file to use superhuman.services widget"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove old widget references
        patterns_to_remove = [
            r'<script[^>]*>[\s\S]*?GUTTER_BOT_CONFIG[\s\S]*?</script>',
            r'<script[^>]*src=["\']gutter-widget[^"\']*\.js["\'][^>]*></script>',
            r'<!-- Atlanta Gutter Guard Pros Service Bot[^>]*-->',
            r'<script[^>]*src=["\']widget-connector\.js["\'][^>]*></script>'
        ]
        
        for pattern in patterns_to_remove:
            content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.MULTILINE)
        
        # Find the closing body tag and insert our widget
        if '</body>' in content:
            # Remove any existing superhuman widget to avoid duplicates
            content = re.sub(
                r'<!-- Atlanta Gutter Guard Pros - AI Service Bot \(Superhuman\.services\) -->[\s\S]*?</script>\s*</body>',
                '</body>',
                content,
                flags=re.IGNORECASE
            )
            
            # Add the new widget
            content = content.replace('</body>', SUPERHUMAN_WIDGET)
            
            # Write back
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return True
        else:
            print(f"Warning: No </body> tag found in {filepath}")
            return False
            
    except Exception as e:
        print(f"Error updating {filepath}: {str(e)}")
        return False

# Update all files
print("Updating HTML files to use Superhuman.services widget...")
print("=" * 50)

updated = 0
for filename in html_files:
    filepath = os.path.join(r'C:\Users\jacos\Desktop\gutter-guard-website', filename)
    if os.path.exists(filepath):
        if update_html_file(filepath):
            print(f"[OK] Updated: {filename}")
            updated += 1
        else:
            print(f"[FAIL] Failed: {filename}")
    else:
        print(f"[SKIP] Not found: {filename}")

print("=" * 50)
print(f"Updated {updated} out of {len(html_files)} files")
print("\nNext steps:")
print("1. Test locally by opening any HTML file")
print("2. Deploy: wrangler pages deploy . --project-name=atlanta-gutter-guard-pros")
print("3. Verify at: https://atlantagutterguardpros.com")
