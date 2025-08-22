# N8N Chat Widget Customization Guide
## Atlanta Gutter Guard Pros

### 🎨 Color Customization

You can customize ALL colors using CSS variables. Add these to your stylesheet:

```css
:root {
    /* Primary brand colors */
    --chat--color-primary: #2e7d32;           /* Your green */
    --chat--color-secondary: #1b5e20;         /* Darker green */
    
    /* Chat bubble/toggle button */
    --chat--toggle--background: #2e7d32;      /* Button color */
    --chat--toggle--hover: #1b5e20;           /* Hover color */
    --chat--toggle--color: white;             /* Icon color */
    --chat--toggle--size: 60px;               /* Button size */
    
    /* Chat window header */
    --chat--header--background: #2e7d32;      /* Header background */
    --chat--header--color: white;             /* Header text */
    
    /* Messages */
    --chat--message--bot--background: #e8f5e9;    /* Bot message bg */
    --chat--message--bot--color: #1b5e20;         /* Bot text color */
    --chat--message--user--background: #2e7d32;   /* User message bg */
    --chat--message--user--color: white;          /* User text color */
    
    /* Input field */
    --chat--input--background: white;
    --chat--input--border: #e0e0e0;
    --chat--input--border-focus: #2e7d32;     /* Focus color */
    --chat--input--text: #333333;
    
    /* Buttons */
    --chat--button--background: #2e7d32;
    --chat--button--color: white;
    --chat--button--background-hover: #1b5e20;
    
    /* Window size */
    --chat--window--width: 400px;
    --chat--window--height: 600px;
}
```

### 🔧 Configuration Options

```javascript
window.n8nChat.createChat({
    // Your webhook URL
    webhookUrl: 'your-webhook-url',
    
    // Display mode
    mode: 'fullscreen',  // Options: 'fullscreen' or 'window'
    
    // Initial greeting
    initialMessages: [
        'Welcome! How can I help you today?'
    ],
    
    // Custom theme (alternative to CSS)
    theme: {
        primaryColor: '#2e7d32',
        secondaryColor: '#1b5e20',
        backgroundColor: '#ffffff',
        textColor: '#333333'
    },
    
    // Branding
    chatTitle: 'Atlanta Gutter Guard Pros',
    chatSubtitle: 'Get Your Free Quote!',
    chatButtonText: '💬 Chat with Us',
    
    // Behavior
    showWelcomeScreen: false,
    allowFileUploads: false,
    defaultLanguage: 'en',
    
    // Custom placeholder
    inputPlaceholder: 'Type your message...',
    
    // Footer
    footer: {
        text: 'Powered by Your Company',
        link: 'https://yourwebsite.com'
    }
});
```

### 🎯 Advanced Customization

#### 1. Custom Chat Button Icon
```css
.n8n-chat__toggle-button::before {
    content: '🏠';  /* Your custom icon */
    font-size: 24px;
}
```

#### 2. Rounded vs Square Design
```css
/* Rounded chat window */
.n8n-chat__window {
    border-radius: 20px !important;
}

/* Rounded messages */
.n8n-chat__message {
    border-radius: 15px !important;
}

/* Rounded input */
.n8n-chat__input {
    border-radius: 25px !important;
}
```

#### 3. Custom Fonts
```css
.n8n-chat__window {
    font-family: 'Your Font', Arial, sans-serif !important;
}
```

#### 4. Animation Effects
```css
/* Bounce effect on chat button */
.n8n-chat__toggle-button {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* Fade in messages */
.n8n-chat__message {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

#### 5. Position Adjustment
```css
/* Move chat button position */
.n8n-chat__toggle-button {
    bottom: 30px !important;  /* Distance from bottom */
    right: 30px !important;   /* Distance from right */
}

/* Or position on left side */
.n8n-chat__toggle-button {
    left: 30px !important;
    right: auto !important;
}
```

### 🎨 Brand-Specific Examples

#### Professional Green Theme (Your Current)
```css
:root {
    --chat--color-primary: #2e7d32;
    --chat--color-secondary: #1b5e20;
    --chat--message--bot--background: #e8f5e9;
    --chat--message--user--background: #2e7d32;
}
```

#### Modern Blue Theme
```css
:root {
    --chat--color-primary: #1976d2;
    --chat--color-secondary: #0d47a1;
    --chat--message--bot--background: #e3f2fd;
    --chat--message--user--background: #1976d2;
}
```

#### Elegant Dark Theme
```css
:root {
    --chat--color-primary: #212121;
    --chat--color-secondary: #424242;
    --chat--message--bot--background: #f5f5f5;
    --chat--message--user--background: #212121;
    --chat--window--background: #fafafa;
}
```

### 📱 Mobile Optimization

```css
/* Mobile responsive adjustments */
@media (max-width: 768px) {
    :root {
        --chat--window--width: 100vw !important;
        --chat--window--height: 100vh !important;
    }
    
    .n8n-chat__toggle-button {
        bottom: 20px !important;
        right: 20px !important;
        --chat--toggle--size: 50px !important;
    }
}
```

### 🚀 Quick Start

1. Copy the CSS variables you want to customize
2. Add them to your website's CSS
3. Adjust the colors to match your brand
4. Test on both desktop and mobile

The n8n chat widget will automatically pick up these CSS variables and apply your custom styling!
