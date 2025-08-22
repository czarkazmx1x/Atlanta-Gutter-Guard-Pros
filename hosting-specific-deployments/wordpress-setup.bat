@echo off
title WordPress Chatbot Setup

echo ========================================
echo   WORDPRESS CHATBOT DEPLOYMENT
echo ========================================
echo.

set /p BUSINESS_NAME="Enter your business name: "
if "%BUSINESS_NAME%"=="" set BUSINESS_NAME=Your Business

set /p PHONE="Enter your phone number: "
if "%PHONE%"=="" set PHONE=(555) 123-4567

set /p SERVICES="Enter your services: "
if "%SERVICES%"=="" set SERVICES=our services

set /p WP_SITE="Enter your WordPress site URL: "
if "%WP_SITE%"=="" set WP_SITE=https://yoursite.com

echo.
echo Creating WordPress deployment package...

:: Create WordPress-specific files
mkdir wordpress-chatbot-setup 2>nul

:: Create the footer.php code
(
echo ^<?php
echo /**
echo  * %BUSINESS_NAME% - N8N Chatbot Integration
echo  * Add this code to your theme's footer.php file before the closing ^</body^> tag
echo  */
echo ?^>
echo.
echo ^<!-- %BUSINESS_NAME% N8N Chatbot --^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"^>^</script^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"^>^</script^>
echo.
echo ^<!-- Business Customization --^>
echo ^<script^>
echo // Override business info after chat loads
echo setTimeout^(function^(^) {
echo     if ^(window.BUSINESS_CONFIG^) {
echo         window.BUSINESS_CONFIG.name = "%BUSINESS_NAME%";
echo         window.BUSINESS_CONFIG.phone = "%PHONE%";
echo         window.BUSINESS_CONFIG.services = "%SERVICES%";
echo     }
echo }, 1000^);
echo ^</script^>
) > "wordpress-chatbot-setup\footer-code.php"

:: Create functions.php code
(
echo ^<?php
echo /**
echo  * %BUSINESS_NAME% - N8N Chatbot Integration
echo  * Add this code to your theme's functions.php file
echo  */
echo.
echo function %BUSINESS_NAME: =_%_chatbot_scripts^(^) {
echo     // Enqueue session memory script
echo     wp_enqueue_script^(
echo         'chatbot-session-memory',
echo         'https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js',
echo         array^(^),
echo         '1.0',
echo         true
echo     ^);
echo     
echo     // Enqueue main chat widget
echo     wp_enqueue_script^(
echo         'chatbot-widget',
echo         'https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js',
echo         array^('chatbot-session-memory'^),
echo         '1.0',
echo         true
echo     ^);
echo     
echo     // Add business configuration
echo     $business_config = array^(
echo         'name' =^> '%BUSINESS_NAME%',
echo         'phone' =^> '%PHONE%',
echo         'services' =^> '%SERVICES%'
echo     ^);
echo     
echo     wp_localize_script^('chatbot-widget', 'businessConfig', $business_config^);
echo }
echo add_action^('wp_enqueue_scripts', '%BUSINESS_NAME: =_%_chatbot_scripts'^);
echo ?^>
) > "wordpress-chatbot-setup\functions-code.php"

:: Create plugin installation guide
(
echo # WordPress Chatbot Installation Guide
echo.
echo ## Method 1: Plugin Approach ^(Easiest^)
echo.
echo 1. Install "Insert Headers and Footers" plugin
echo 2. Go to Settings ^> Insert Headers and Footers
echo 3. Paste this code in the "Scripts in Footer" section:
echo.
echo ```html
echo ^<!-- %BUSINESS_NAME% N8N Chatbot --^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-session-memory.js"^>^</script^>
echo ^<script src="https://atlantagutterguardpros.com/atlanta-gutter-ai-chat-cors-fixed.js"^>^</script^>
echo.
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
echo ## Method 2: Theme Editor
echo.
echo 1. Go to Appearance ^> Theme Editor
echo 2. Select footer.php
echo 3. Add the code from footer-code.php before ^</body^>
echo 4. Click "Update File"
echo.
echo ## Method 3: Functions.php ^(Advanced^)
echo.
echo 1. Go to Appearance ^> Theme Editor
echo 2. Select functions.php
echo 3. Add the code from functions-code.php at the end
echo 4. Click "Update File"
echo.
echo ## Testing
echo.
echo 1. Visit your website: %WP_SITE%
echo 2. Chat widget should appear in bottom right
echo 3. Click to open and send a test message
echo 4. Should receive AI response from your assistant
echo.
echo ## Troubleshooting
echo.
echo - If chat doesn't appear: Check for JavaScript errors in browser console
echo - If no responses: Verify N8N webhook is working
echo - If styling issues: Check theme CSS conflicts
echo.
echo ## Business Configuration
echo - Name: %BUSINESS_NAME%
echo - Phone: %PHONE%
echo - Services: %SERVICES%
echo - Website: %WP_SITE%
) > "wordpress-chatbot-setup\INSTALLATION-GUIDE.md"

echo ✅ Created WordPress deployment package!
echo.
echo 📁 Files created in wordpress-chatbot-setup/:
echo   - footer-code.php (for theme footer)
echo   - functions-code.php (for functions.php)
echo   - INSTALLATION-GUIDE.md (step-by-step instructions)
echo.
echo 🚀 Next steps:
echo 1. Open wordpress-chatbot-setup folder
echo 2. Follow INSTALLATION-GUIDE.md
echo 3. Choose your preferred installation method
echo 4. Test on your WordPress site: %WP_SITE%
echo.

set /p OPEN_FOLDER="Open the setup folder now? (y/N): "
if /i "%OPEN_FOLDER%"=="y" (
    start "" "wordpress-chatbot-setup"
)

echo.
echo ✅ WordPress chatbot setup ready!
pause
