@echo off
title Static Site Chatbot Setup

echo ========================================
echo   STATIC SITE CHATBOT DEPLOYMENT
echo ========================================
echo.
echo For: GitHub Pages, Netlify, Vercel, Hugo, Jekyll, etc.
echo.

set /p BUSINESS_NAME="Enter your business name: "
if "%BUSINESS_NAME%"=="" set BUSINESS_NAME=Your Business

set /p PHONE="Enter your phone number: "
if "%PHONE%"=="" set PHONE=(555) 123-4567

set /p SERVICES="Enter your services: "
if "%SERVICES%"=="" set SERVICES=our services

set /p SITE_TYPE="Site type (gatsby/next/hugo/jekyll/vanilla): "
if "%SITE_TYPE%"=="" set SITE_TYPE=vanilla

set /p DEPLOY_PLATFORM="Deploy platform (github-pages/netlify/vercel/other): "
if "%DEPLOY_PLATFORM%"=="" set DEPLOY_PLATFORM=github-pages

echo.
echo Creating static site deployment package...

mkdir static-site-chatbot-setup 2>nul
cd static-site-chatbot-setup

:: Create vanilla HTML integration
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo     ^<title^>%BUSINESS_NAME% - Chatbot Integration Example^</title^>
echo ^</head^>
echo ^<body^>
echo     ^<header^>
echo         ^<h1^>%BUSINESS_NAME%^</h1^>
echo         ^<p^>Example page with N8N chatbot integration^</p^>
echo     ^</header^>
echo     
echo     ^<main^>
echo         ^<h2^>Welcome to %BUSINESS_NAME%^</h2^>
echo         ^<p^>We provide excellent %SERVICES% to our customers.^</p^>
echo         ^<p^>Need help? Use our AI chat assistant in the bottom right corner!^</p^>
echo     ^</main^>
echo     
echo     ^<!-- N8N Chatbot Integration --^>
echo     ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"^>^</script^>
echo     ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"^>^</script^>
echo     
echo     ^<!-- Business Configuration --^>
echo     ^<script^>
echo     setTimeout^(function^(^) {
echo         if ^(window.BUSINESS_CONFIG^) {
echo             window.BUSINESS_CONFIG.name = "%BUSINESS_NAME%";
echo             window.BUSINESS_CONFIG.phone = "%PHONE%";
echo             window.BUSINESS_CONFIG.services = "%SERVICES%";
echo         }
echo     }, 1000^);
echo     ^</script^>
echo ^</body^>
echo ^</html^>
) > "vanilla-html-example.html"

:: Create React/Next.js component
(
echo // React/Next.js Chatbot Component
echo // Save as: components/Chatbot.js or components/Chatbot.tsx
echo.
echo import { useEffect } from 'react';
echo.
echo const Chatbot = ^(^) =^> {
echo   useEffect^(^(^) =^> {
echo     // Load session memory script
echo     const sessionScript = document.createElement^('script'^);
echo     sessionScript.src = 'https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js';
echo     sessionScript.async = true;
echo     document.body.appendChild^(sessionScript^);
echo     
echo     // Load chat widget script
echo     const chatScript = document.createElement^('script'^);
echo     chatScript.src = 'https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js';
echo     chatScript.async = true;
echo     chatScript.onload = ^(^) =^> {
echo       // Configure business info after script loads
echo       setTimeout^(^(^) =^> {
echo         if ^(window.BUSINESS_CONFIG^) {
echo           window.BUSINESS_CONFIG.name = "%BUSINESS_NAME%";
echo           window.BUSINESS_CONFIG.phone = "%PHONE%";
echo           window.BUSINESS_CONFIG.services = "%SERVICES%";
echo         }
echo       }, 1000^);
echo     };
echo     document.body.appendChild^(chatScript^);
echo     
echo     return ^(^) =^> {
echo       // Cleanup on unmount
echo       document.body.removeChild^(sessionScript^);
echo       document.body.removeChild^(chatScript^);
echo     };
echo   }, []^);
echo   
echo   return null; // This component just loads the scripts
echo };
echo.
echo export default Chatbot;
echo.
echo // Usage in your pages:
echo // import Chatbot from '../components/Chatbot';
echo //
echo // function HomePage^(^) {
echo //   return ^(
echo //     ^<div^>
echo //       ^<h1^>Welcome to %BUSINESS_NAME%^</h1^>
echo //       ^<Chatbot /^>
echo //     ^</div^>
echo //   ^);
echo // }
) > "react-chatbot-component.js"

:: Create Hugo partial
(
echo ^<!-- Hugo Partial: layouts/partials/chatbot.html --^>
echo.
echo ^<!-- N8N Chatbot Integration for Hugo --^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"^>^</script^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"^>^</script^>
echo.
echo ^<script^>
echo // Hugo-specific configuration
echo setTimeout^(function^(^) {
echo     if ^(window.BUSINESS_CONFIG^) {
echo         window.BUSINESS_CONFIG.name = "%BUSINESS_NAME%";
echo         window.BUSINESS_CONFIG.phone = "%PHONE%";
echo         window.BUSINESS_CONFIG.services = "%SERVICES%";
echo         window.BUSINESS_CONFIG.platform = "Hugo";
echo         
echo         // Add Hugo site variables if available
echo         {{ if .Site.Title }}
echo         window.BUSINESS_CONFIG.siteTitle = "{{ .Site.Title }}";
echo         {{ end }}
echo         
echo         {{ if .Site.Params.contact.phone }}
echo         window.BUSINESS_CONFIG.phone = "{{ .Site.Params.contact.phone }}";
echo         {{ end }}
echo     }
echo }, 1000^);
echo ^</script^>
echo.
echo ^<!-- Usage: Add to your base template --^>
echo ^<!-- {{ partial "chatbot.html" . }} --^>
) > "hugo-chatbot-partial.html"

:: Create Jekyll include
(
echo ^<!-- Jekyll Include: _includes/chatbot.html --^>
echo.
echo ^<!-- N8N Chatbot Integration for Jekyll --^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"^>^</script^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"^>^</script^>
echo.
echo ^<script^>
echo // Jekyll-specific configuration
echo setTimeout^(function^(^) {
echo     if ^(window.BUSINESS_CONFIG^) {
echo         window.BUSINESS_CONFIG.name = "%BUSINESS_NAME%";
echo         window.BUSINESS_CONFIG.phone = "%PHONE%";
echo         window.BUSINESS_CONFIG.services = "%SERVICES%";
echo         window.BUSINESS_CONFIG.platform = "Jekyll";
echo         
echo         // Add Jekyll site variables
echo         {% if site.title %}
echo         window.BUSINESS_CONFIG.siteTitle = "{{ site.title }}";
echo         {% endif %}
echo         
echo         {% if site.phone %}
echo         window.BUSINESS_CONFIG.phone = "{{ site.phone }}";
echo         {% endif %}
echo     }
echo }, 1000^);
echo ^</script^>
echo.
echo ^<!-- Usage: Add to your layout --^>
echo ^<!-- {% include chatbot.html %} --^>
) > "jekyll-chatbot-include.html"

:: Create Gatsby component
(
echo // Gatsby Chatbot Component
echo // Save as: src/components/chatbot.js
echo.
echo import React, { useEffect } from "react"
echo.
echo const Chatbot = ^(^) =^> {
echo   useEffect^(^(^) =^> {
echo     // Only run on client side
echo     if ^(typeof window !== "undefined"^) {
echo       // Load session memory script
echo       const sessionScript = document.createElement^("script"^)
echo       sessionScript.src = "https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"
echo       sessionScript.async = true
echo       document.body.appendChild^(sessionScript^)
echo       
echo       // Load chat widget script
echo       const chatScript = document.createElement^("script"^)
echo       chatScript.src = "https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"
echo       chatScript.async = true
echo       chatScript.onload = ^(^) =^> {
echo         // Configure business info
echo         setTimeout^(^(^) =^> {
echo           if ^(window.BUSINESS_CONFIG^) {
echo             window.BUSINESS_CONFIG.name = "%BUSINESS_NAME%"
echo             window.BUSINESS_CONFIG.phone = "%PHONE%"
echo             window.BUSINESS_CONFIG.services = "%SERVICES%"
echo             window.BUSINESS_CONFIG.platform = "Gatsby"
echo           }
echo         }, 1000^)
echo       }
echo       document.body.appendChild^(chatScript^)
echo       
echo       return ^(^) =^> {
echo         // Cleanup
echo         if ^(document.body.contains^(sessionScript^)^) {
echo           document.body.removeChild^(sessionScript^)
echo         }
echo         if ^(document.body.contains^(chatScript^)^) {
echo           document.body.removeChild^(chatScript^)
echo         }
echo       }
echo     }
echo   }, []^)
echo   
echo   return null
echo }
echo.
echo export default Chatbot
echo.
echo // Usage in gatsby-browser.js:
echo // import Chatbot from "./src/components/chatbot"
echo // export const onRouteUpdate = ^(^) =^> {
echo //   // Re-initialize chatbot on route changes
echo // }
) > "gatsby-chatbot-component.js"

:: Create deployment guide
(
echo # Static Site Chatbot Deployment Guide
echo.
echo ## Platform: %DEPLOY_PLATFORM%
echo ## Site Type: %SITE_TYPE%
echo ## Business: %BUSINESS_NAME%
echo.
echo ## Quick Integration
echo.
echo ### Option 1: External CDN ^(Recommended^)
echo Add this to your HTML template before `^</body^>`:
echo ```html
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"^>^</script^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"^>^</script^>
echo ^<script^>
echo setTimeout^(function^(^) {
echo     if ^(window.BUSINESS_CONFIG^) {
echo         window.BUSINESS_CONFIG.name = "%BUSINESS_NAME%";
echo         window.BUSINESS_CONFIG.phone = "%PHONE%";
echo         window.BUSINESS_CONFIG.services = "%SERVICES%";
echo     }
echo }, 1000^);
echo ^</script^>
echo ```
echo.
echo ### Option 2: Self-Hosted Files
echo 1. Download chatbot files from the main project
echo 2. Add to your static assets folder ^(usually `/static` or `/public`^)
echo 3. Reference local files:
echo ```html
echo ^<script src="/js/session-memory.js"^>^</script^>
echo ^<script src="/js/chat-widget.js"^>^</script^>
echo ```
echo.
echo ## Platform-Specific Integration
echo.
echo ### GitHub Pages
echo 1. Add scripts to your `_layouts/default.html` or similar
echo 2. Commit and push to trigger rebuild
echo 3. Chat will appear on all pages using that layout
echo.
echo ### Netlify
echo 1. Add scripts to your build output
echo 2. Netlify will automatically deploy
echo 3. Works with any static site generator
echo.
echo ### Vercel
echo 1. Add scripts to your pages
echo 2. Deploy normally
echo 3. Supports React, Next.js, and static HTML
echo.
echo ### Hugo Sites
echo 1. Use the `hugo-chatbot-partial.html` file
echo 2. Save as `layouts/partials/chatbot.html`
echo 3. Include in your base template: `{{ partial "chatbot.html" . }}`
echo.
echo ### Jekyll Sites
echo 1. Use the `jekyll-chatbot-include.html` file
echo 2. Save as `_includes/chatbot.html`
echo 3. Include in your layout: `{% include chatbot.html %}`
echo.
echo ### React/Next.js Sites
echo 1. Use the `react-chatbot-component.js` file
echo 2. Import and use in your app
echo 3. Handles client-side loading properly
echo.
echo ### Gatsby Sites
echo 1. Use the `gatsby-chatbot-component.js` file
echo 2. Handle Gatsby's SSR properly
echo 3. Include in layout component
echo.
echo ## File Structure Examples
echo.
echo ### Basic Static Site
echo ```
echo site/
echo ├── index.html
echo ├── css/
echo ├── js/
echo │   ├── session-memory.js
echo │   └── chat-widget.js
echo └── images/
echo ```
echo.
echo ### Hugo Site
echo ```
echo site/
echo ├── content/
echo ├── layouts/
echo │   ├── _default/
echo │   └── partials/
echo │       └── chatbot.html
echo ├── static/
echo └── config.yaml
echo ```
echo.
echo ### React/Next.js Site
echo ```
echo site/
echo ├── components/
echo │   └── Chatbot.js
echo ├── pages/
echo ├── public/
echo └── package.json
echo ```
echo.
echo ## Testing Your Integration
echo.
echo 1. Build your site locally or deploy to staging
echo 2. Visit your site
echo 3. Chat widget should appear in bottom right
echo 4. Test with a message like "Hello, I need help with %SERVICES%"
echo 5. Should receive AI response
echo.
echo ## Performance Optimization
echo.
echo ### Async Loading
echo ```html
echo ^<script async src="..."^>^</script^>
echo ```
echo.
echo ### Defer Loading
echo ```html
echo ^<script defer src="..."^>^</script^>
echo ```
echo.
echo ### Conditional Loading
echo ```javascript
echo // Only load on certain pages
echo if ^(window.location.pathname === '/contact'^) {
echo     // Load chatbot
echo }
echo ```
echo.
echo ## Troubleshooting
echo.
echo **Build Issues:**
echo - Ensure scripts are included in build output
echo - Check static asset paths
echo - Verify deployment includes all files
echo.
echo **Runtime Issues:**
echo - Check browser console for errors
echo - Verify scripts load successfully
echo - Test CORS proxy availability
echo.
echo **SSR/SSG Issues:**
echo - Ensure scripts only run client-side
echo - Use proper component lifecycle methods
echo - Handle window object availability
echo.
echo ## Advanced Configuration
echo.
echo ### Custom Styling
echo Add CSS to match your site theme:
echo ```css
echo #n8n-business-chat {
echo     --primary-color: #your-brand-color;
echo     font-family: your-site-font;
echo }
echo ```
echo.
echo ### Analytics Integration
echo Track chat usage:
echo ```javascript
echo // Google Analytics example
echo gtag^('event', 'chat_opened', {
echo     event_category: 'engagement'
echo }^);
echo ```
echo.
echo ### Content Security Policy
echo If using CSP, allow external scripts:
echo ```
echo script-src 'self' atlantagutterguardpros.com
echo ```
) > "STATIC-SITE-DEPLOYMENT-GUIDE.md"

cd ..

echo ✅ Created static site deployment package!
echo.
echo 📁 Files created in static-site-chatbot-setup/:
echo   - vanilla-html-example.html
echo   - react-chatbot-component.js
echo   - hugo-chatbot-partial.html
echo   - jekyll-chatbot-include.html
echo   - gatsby-chatbot-component.js
echo   - STATIC-SITE-DEPLOYMENT-GUIDE.md
echo.
echo 🚀 Next steps:
echo 1. Open static-site-chatbot-setup folder
echo 2. Choose the file for your site type: %SITE_TYPE%
echo 3. Follow the deployment guide
echo 4. Deploy to %DEPLOY_PLATFORM%
echo.

set /p OPEN_FOLDER="Open the setup folder now? (y/N): "
if /i "%OPEN_FOLDER%"=="y" (
    start "" "static-site-chatbot-setup"
)

echo.
echo ✅ Static site chatbot setup ready!
echo Perfect for GitHub Pages, Netlify, Vercel, and more!
pause
