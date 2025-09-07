# SUPERHUMAN.SERVICES WIDGET.JS FIX

## The Problem:
The widget shows "Sam - Your HVAC Assistant" even though the HTML page has "Alex - Your Gutter Guard Expert" configuration.

## Quick Fix Steps:

### 1. SSH into your server:
```bash
ssh root@143.198.52.18
cd /path/to/service-bot
```

### 2. Find where the widget renders the header:
Look for files containing "Sam" or "Your HVAC Assistant":
```bash
grep -r "Your HVAC Assistant" .
grep -r "Sam.*Assistant" .
```

### 3. Common places to check:
- `public/widget.js`
- `src/components/ChatWidget.js`
- `src/components/ChatHeader.js`
- `dist/widget.bundle.js`

### 4. The code probably looks like:
```javascript
// WRONG - Hardcoded values
const ChatHeader = () => {
    return (
        <div className="chat-header">
            <h3>Sam - Your HVAC Assistant</h3>
        </div>
    );
};
```

### 5. Change it to use dynamic config:
```javascript
// CORRECT - Read from configuration
const ChatHeader = ({ config }) => {
    return (
        <div className="chat-header">
            <h3>{config.assistantName || 'Sam'} - {config.assistantTitle || 'Your HVAC Assistant'}</h3>
        </div>
    );
};
```

### 6. Or if using vanilla JS in widget.js:
```javascript
// Find this:
document.getElementById('bot-title').innerText = 'Sam - Your HVAC Assistant';

// Replace with:
document.getElementById('bot-title').innerText = `${config.name} - ${config.title}`;
```

### 7. After fixing, rebuild if needed:
```bash
npm run build
# or
yarn build
```

### 8. Restart the service:
```bash
pm2 restart all
# or
systemctl restart superhuman
```

## Alternative: Environment-based Fix

If you can't find where it's hardcoded, add this to your widget initialization:

```javascript
// At the top of widget.js, after config is loaded:
window.addEventListener('DOMContentLoaded', () => {
    // Force update any Sam references
    setTimeout(() => {
        const config = window.__widgetConfig || {};
        if (config.assistantName === 'Alex') {
            document.querySelectorAll('*').forEach(el => {
                if (el.innerText && el.innerText.includes('Sam - Your HVAC Assistant')) {
                    el.innerText = el.innerText.replace('Sam - Your HVAC Assistant', 'Alex - Your Gutter Guard Expert');
                }
            });
        }
    }, 100);
});
```

## The issue is definitely in the widget rendering code, not the configuration!
