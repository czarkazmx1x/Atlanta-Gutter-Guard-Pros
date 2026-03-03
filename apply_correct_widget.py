import os
import re

# The correct integration code from superhuman.services
CORRECT_WIDGET_CODE = """    <!-- Service Bot Configuration -->
    <script>
    window.SERVICE_BOT_CONFIG = {
        serverUrl: 'https://superhuman.services',
        tenant: 'atlantagutter',
        botName: 'Alex - Your Gutter Expert',
        accentColor: '#2b6cb0',
        businessName: 'Atlanta Gutter Guard Pros',
        phone: '(323) 325-1319',
        services: [
            'Gutter Guard Installation',
            'Gutter Cleaning & Maintenance', 
            'Gutter Repair & Replacement',
            'Downspout Services',
            'Emergency Gutter Service'
        ],
        initialMessage: `Hi! I'm Alex from Atlanta Gutter Guard Pros. I'm here to help with all your gutter needs.

<div style="margin-top: 15px;">
  <a href="tel:(323) 325-1319" style="display: inline-block; background: #10B981; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; text-align: center; font-weight: 600;">
    📞 Call (323) 325-1319
  </a>
</div>

<p style="margin-top: 15px; font-size: 14px; color: #666;">What's going on with your gutters?</p>`
    };
    </script>

    <!-- Load the Service Bot Widget -->
    <script src="https://superhuman.services/widget.js?tenant=atlantagutter"></script>

    <!-- Custom styling to match brand -->
    <style>
    #service-bot-widget {
        font-family: inherit;
    }
    #service-bot-button {
        background: linear-gradient(135deg, #2b6cb0 0%, #3182ce 100%) !important;
        box-shadow: 0 4px 15px rgba(43, 108, 176, 0.3) !important;
    }
    #service-bot-button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(43, 108, 176, 0.4) !important;
    }
    </style>
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
        
        # Remove ALL existing widget code, scripts, and overrides
        patterns = [
            r'<!-- Service Bot Configuration -->[\s\S]*?</style>\s*',
            r'<!-- Service Bot Chat Widget -->[\s\S]*?</script>\s*',
            r'<!-- Force Alex[^>]*-->[\s\S]*?</script>\s*',
            r'<!-- Carefully Force[^>]*-->[\s\S]*?</script>\s*',
            r'<script>\s*window\.addEventListener\(\'DOMContentLoaded\'[\s\S]*?</script>\s*',
            r'<script>\s*let widgetCheckCount[\s\S]*?</script>\s*',
            r'<script src="https://superhuman.services/widget.js[^"]*"></script>\s*'
        ]
        
        for pattern in patterns:
            content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.MULTILINE)
        
        # Clean up extra whitespace before </body>
        content = re.sub(r'\s+</body>', '\n</body>', content)
        
        # Add the correct widget code
        content = content.replace('</body>', CORRECT_WIDGET_CODE)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated: {filename}")

print("\nAll files updated with the correct Service Bot configuration!")
print("This includes proper API configuration and brand styling.")
print("\nDeploy with: npx wrangler pages deploy . --project-name=atlanta-gutter-guard-pros")
