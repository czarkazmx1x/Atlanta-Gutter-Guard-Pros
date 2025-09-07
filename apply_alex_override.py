import os
import re

# The override script that forces Alex
ALEX_OVERRIDE = """    <!-- Force Alex for Atlanta Gutter -->
    <script>
    window.addEventListener('DOMContentLoaded', function() {
        const fixWidget = setInterval(function() {
            document.querySelectorAll('*').forEach(function(el) {
                if (el.innerText && el.innerText.includes('Sam') && el.innerText.includes('HVAC')) {
                    el.innerText = el.innerText.replace('Sam', 'Alex').replace('Your HVAC Assistant', 'Your Gutter Guard Expert');
                }
            });
        }, 100);
        setTimeout(() => clearInterval(fixWidget), 5000);
    });
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
        
        print(f"Updated: {filename}")

print("\nDone! Deploy with: npx wrangler pages deploy .")
