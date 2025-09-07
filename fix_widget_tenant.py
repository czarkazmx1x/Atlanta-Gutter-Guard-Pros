import os
import re

# Define the corrected widget code with override
FIXED_WIDGET = """
    <!-- Atlanta Gutter Guard Pros - AI Service Bot (Superhuman.services) -->
    <script>
      // Force correct tenant configuration
      window.ServiceBotConfig = {
        tenant: 'atlantagutter',
        tenantId: 'atlantagutter', 
        businessName: 'Atlanta Gutter Guard Pros',
        assistantName: 'Alex',
        primaryColor: '#2c3e50',
        phoneNumber: '(470) 851-6780',
        apiUrl: 'https://superhuman.services',
        industry: 'gutter',
        services: ['Gutter Guards', 'Gutter Cleaning', 'Gutter Repair', 'Emergency Service']
      };
    </script>
    <script src="https://superhuman.services/widget.js?tenant=atlantagutter" async></script>
    <script src="atlanta-widget-override.js" async></script>
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

def fix_widget_in_file(filepath):
    """Update HTML file with corrected widget configuration"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove existing superhuman widget
        content = re.sub(
            r'<!-- Atlanta Gutter Guard Pros - AI Service Bot \(Superhuman\.services\) -->[\s\S]*?</script>\s*</body>',
            '</body>',
            content,
            flags=re.IGNORECASE
        )
        
        # Add the fixed widget
        content = content.replace('</body>', FIXED_WIDGET)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
            
    except Exception as e:
        print(f"Error updating {filepath}: {str(e)}")
        return False

# Update all files
print("Fixing widget configuration in all HTML files...")
print("=" * 50)

updated = 0
for filename in html_files:
    filepath = os.path.join(r'C:\Users\jacos\Desktop\gutter-guard-website', filename)
    if os.path.exists(filepath):
        if fix_widget_in_file(filepath):
            print(f"[OK] Fixed: {filename}")
            updated += 1
        else:
            print(f"[FAIL] Failed: {filename}")
    else:
        print(f"[SKIP] Not found: {filename}")

print("=" * 50)
print(f"Fixed {updated} out of {len(html_files)} files")
print("\nWidget will now show:")
print("- Assistant: Alex (not Sam)")  
print("- Business: Atlanta Gutter Guard Pros (not HVAC)")
print("- Tenant: atlantagutter")
print("\nRedeploy with: npx wrangler pages deploy .")
