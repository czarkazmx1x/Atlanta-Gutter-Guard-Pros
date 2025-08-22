@echo off
title Ultra Quick Chatbot Setup

echo ========================================
echo    ULTRA QUICK CHATBOT SETUP
echo ========================================
echo.
echo This will set up the N8N chatbot on any website
echo using the existing Atlanta Gutter infrastructure.
echo.

set /p WEBSITE_URL="Enter your website URL (e.g., https://yoursite.com): "
if "%WEBSITE_URL%"=="" set WEBSITE_URL=https://yourwebsite.com

echo.
echo Creating quick setup file...

:: Create the HTML snippet
(
echo ^<!-- N8N Chatbot Quick Setup --^>
echo ^<!-- Add this before your closing ^</body^> tag --^>
echo.
echo ^<!-- Session Memory --^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"^>^</script^>
echo.
echo ^<!-- Chat Widget --^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"^>^</script^>
echo.
echo ^<!-- Optional: Custom business override --^>
echo ^<script^>
echo // Override business info after chat loads
echo setTimeout^(function^(^) {
echo     // You can customize these values
echo     if ^(window.BUSINESS_CONFIG^) {
echo         window.BUSINESS_CONFIG.name = "Your Business Name";
echo         window.BUSINESS_CONFIG.phone = "^(555^) 123-4567";
echo         window.BUSINESS_CONFIG.services = "your services";
echo     }
echo }, 1000^);
echo ^</script^>
) > chatbot-quick-setup.html

echo.
echo ✅ Created: chatbot-quick-setup.html
echo.
echo ========================================
echo    INSTANT DEPLOYMENT READY!
echo ========================================
echo.
echo 🚀 Your chatbot is ready to deploy!
echo.
echo WHAT TO DO:
echo.
echo 1. Open: chatbot-quick-setup.html
echo 2. Copy the HTML code
echo 3. Paste it before ^</body^> on your website: %WEBSITE_URL%
echo 4. Save and upload your website
echo.
echo ✅ The chatbot will appear immediately!
echo.
echo 📋 FEATURES YOU GET:
echo   ✅ Professional AI chat widget
echo   ✅ Real N8N AI responses  
echo   ✅ CORS issues solved
echo   ✅ Session memory
echo   ✅ Mobile responsive
echo   ✅ Professional styling
echo.
echo 🔧 TO CUSTOMIZE:
echo   Edit the JavaScript section in the HTML file
echo   to change business name, phone, services, etc.
echo.

set /p OPEN_FILE="Open the setup file now? (y/N): "
if /i "%OPEN_FILE%"=="y" (
    start notepad chatbot-quick-setup.html
)

echo.
echo 🎉 DONE! Your chatbot is ready for instant deployment!
echo.
pause
