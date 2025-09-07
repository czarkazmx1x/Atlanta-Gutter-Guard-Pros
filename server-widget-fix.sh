#!/bin/bash
# Fix script for superhuman.services widget.js

# SSH into your server and run these commands:

# 1. Find the widget.js file
echo "Locating widget.js..."
find /var/www -name "widget.js" -type f 2>/dev/null
find /home -name "widget.js" -type f 2>/dev/null

# 2. Common locations to check:
# - /var/www/superhuman.services/public/widget.js
# - /home/node/service-bot/public/widget.js
# - /opt/service-bot/dist/widget.js

# 3. Once you find it, create a backup:
cp widget.js widget.js.backup

# 4. Edit the file and find where it says:
# name: 'Sam'
# title: 'Your HVAC Assistant'

# 5. Replace with dynamic configuration:
cat > widget-fix.txt << 'EOF'
// FIND THIS SECTION (around line 50-100):
const config = {
    name: 'Sam',
    title: 'Your HVAC Assistant',
    // ... other hardcoded values
};

// REPLACE WITH THIS:
// Parse tenant from script URL
const scriptElement = document.currentScript || document.querySelector('script[src*="widget.js"]');
const scriptUrl = new URL(scriptElement.src);
const tenant = scriptUrl.searchParams.get('tenant') || 'demo';

// Tenant configurations
const tenantConfigs = {
    'atlantagutter': {
        name: 'Alex',
        title: 'Your Gutter Guard Expert',
        color: '#2c3e50',
        phone: '(470) 851-6780'
    },
    'demo': {
        name: 'Sam', 
        title: 'Your HVAC Assistant',
        color: '#3b82f6',
        phone: '1-800-DEMO'
    }
};

// Use the appropriate config
const config = tenantConfigs[tenant] || tenantConfigs['demo'];
console.log('Loading widget for tenant:', tenant, config);
EOF

# 6. Also look for the chat header/title rendering:
# Find: <div>Sam - Your HVAC Assistant</div>
# Replace with: <div>${config.name} - ${config.title}</div>

echo "Fix instructions created in widget-fix.txt"
echo "Apply these changes to your widget.js file"
