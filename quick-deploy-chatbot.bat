@echo off
setlocal EnableDelayedExpansion

:: ==================================================================
:: QUICK N8N CHATBOT DEPLOYMENT - COPY & CUSTOMIZE
:: ==================================================================
:: This script copies the working Atlanta Gutter Guard chatbot files
:: and customizes them with your business information.
:: ==================================================================

title Quick N8N Chatbot Deployment

echo.
echo ========================================
echo   QUICK N8N CHATBOT DEPLOYMENT
echo ========================================
echo.
echo This script will copy the working chatbot files
echo and customize them for your business.
echo.

:: Check if we're in the right directory
if not exist "atlanta-gutter-ai-chat-cors-fixed.js" (
    echo ❌ Cannot find source chatbot files!
    echo Please run this script from the Atlanta-Gutter-Guard-Pros directory.
    echo.
    echo Current directory: %CD%
    echo.
    pause
    exit /b 1
)

echo ✅ Found source chatbot files
echo.

:: Collect business information
echo ========================================
echo    BUSINESS CONFIGURATION
echo ========================================
echo.

set /p BUSINESS_NAME="Enter your business name: "
if "!BUSINESS_NAME!"=="" set BUSINESS_NAME=Your Business

set /p AGENT_NAME="Enter AI agent name: "
if "!AGENT_NAME!"=="" set AGENT_NAME=Assistant

set /p PHONE_NUMBER="Enter your phone number: "
if "!PHONE_NUMBER!"=="" set PHONE_NUMBER=(555) 123-4567

set /p SERVICES="Enter your services: "
if "!SERVICES!"=="" set SERVICES=our services

set /p DOMAIN="Enter your website domain: "
if "!DOMAIN!"=="" set DOMAIN=yourwebsite.com

set /p N8N_WEBHOOK="Enter your N8N webhook URL: "
if "!N8N_WEBHOOK!"=="" (
    echo ❌ N8N webhook URL is required!
    pause
    exit /b 1
)

:: Create safe filename
set SAFE_NAME=!BUSINESS_NAME!
set SAFE_NAME=!SAFE_NAME: =-!
set SAFE_NAME=!SAFE_NAME:'=!
set SAFE_NAME=!SAFE_NAME:"=!
for %%i in (A B C D E F G H I J K L M N O P Q R S T U V W X Y Z) do set SAFE_NAME=!SAFE_NAME:%%i=%%i!
call :LCase SAFE_NAME

echo.
echo ========================================
echo    CREATING CUSTOMIZED FILES
echo ========================================
echo.

:: Create output directory
set OUTPUT_DIR=!SAFE_NAME!-chatbot-files
if not exist "!OUTPUT_DIR!" mkdir "!OUTPUT_DIR!"

echo Creating customized chat widget...

:: Copy and customize the chat widget
powershell -Command "(Get-Content 'atlanta-gutter-ai-chat-cors-fixed.js') -replace 'Atlanta Gutter Guard Pros', '!BUSINESS_NAME!' -replace 'Sarah', '!AGENT_NAME!' -replace 'gutter guards', '!SERVICES!' -replace 'atlantagutterguardpros.com', '!DOMAIN!' -replace '\(470\) 851-6780', '!PHONE_NUMBER!' | Set-Content '!OUTPUT_DIR!\!SAFE_NAME!-chat-widget.js'"

echo ✅ Created: !SAFE_NAME!-chat-widget.js

echo Creating customized CORS proxy worker...

:: Copy and customize the worker
powershell -Command "(Get-Content 'n8n-cors-proxy-worker.js') -replace 'Atlanta Gutter Guard Pros', '!BUSINESS_NAME!' -replace 'Sarah', '!AGENT_NAME!' -replace 'gutter guards', '!SERVICES!' -replace 'atlantagutterguardpros.com', '!DOMAIN!' -replace '\(470\) 851-6780', '!PHONE_NUMBER!' -replace 'https://czarkamxxx.app.n8n.cloud/webhook/65afb57e-1c89-44a3-b9bb-84013a4511d7/chat', '!N8N_WEBHOOK!' | Set-Content '!OUTPUT_DIR!\!SAFE_NAME!-cors-proxy.js'"

echo ✅ Created: !SAFE_NAME!-cors-proxy.js

echo Copying session memory file...
copy "atlanta-gutter-session-memory.js" "!OUTPUT_DIR!\!SAFE_NAME!-session-memory.js" >nul

echo ✅ Created: !SAFE_NAME!-session-memory.js

:: Create deployment instructions
echo Creating deployment instructions...

(
echo # 🚀 !BUSINESS_NAME! - N8N Chatbot Deployment
echo.
echo ## Files Created:
echo - `!SAFE_NAME!-chat-widget.js` - Main chat widget
echo - `!SAFE_NAME!-cors-proxy.js` - Cloudflare Worker for CORS
echo - `!SAFE_NAME!-session-memory.js` - Session management
echo.
echo ## Deployment Steps:
echo.
echo ### 1. Deploy Cloudflare Worker
echo ```bash
echo npx wrangler deploy !SAFE_NAME!-cors-proxy.js --name !SAFE_NAME!-proxy
echo ```
echo.
echo ### 2. Update Chat Widget
echo Edit `!SAFE_NAME!-chat-widget.js` and update line ~12:
echo ```javascript
echo const CORS_PROXY_URL = 'https://!SAFE_NAME!-proxy.your-account.workers.dev';
echo ```
echo.
echo ### 3. Add to Website
echo Add these lines before `^</body^>`:
echo ```html
echo ^<script src="path/to/!SAFE_NAME!-session-memory.js"^>^</script^>
echo ^<script src="path/to/!SAFE_NAME!-chat-widget.js"^>^</script^>
echo ```
echo.
echo ## Testing:
echo 1. Test worker health: https://!SAFE_NAME!-proxy.your-account.workers.dev/health
echo 2. Open your website - chat widget should appear
echo 3. Send test message - should get AI response from !AGENT_NAME!
echo.
echo ## Business Configuration:
echo - Business: !BUSINESS_NAME!
echo - Agent: !AGENT_NAME!
echo - Services: !SERVICES!
echo - Phone: !PHONE_NUMBER!
echo - Domain: !DOMAIN!
echo - N8N Webhook: !N8N_WEBHOOK!
echo.
echo ## Support:
echo If you need help, check the original Atlanta Gutter Guard Pros files
echo for reference implementation.
) > "!OUTPUT_DIR!\DEPLOYMENT-INSTRUCTIONS.md"

echo ✅ Created: DEPLOYMENT-INSTRUCTIONS.md

:: Create simple HTML test page
(
echo ^<!DOCTYPE html^>
echo ^<html^>
echo ^<head^>
echo     ^<title^>!BUSINESS_NAME! - Chat Test^</title^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo ^</head^>
echo ^<body style="font-family: Arial, sans-serif; padding: 20px;"^>
echo     ^<h1^>!BUSINESS_NAME!^</h1^>
echo     ^<h2^>N8N Chatbot Test Page^</h2^>
echo     ^<p^>This is a test page for your chatbot integration.^</p^>
echo     ^<p^>The chat widget should appear in the bottom right corner after you:^</p^>
echo     ^<ol^>
echo         ^<li^>Deploy the Cloudflare Worker^</li^>
echo         ^<li^>Update the CORS_PROXY_URL in the chat widget^</li^>
echo         ^<li^>Host these files on your web server^</li^>
echo     ^</ol^>
echo     
echo     ^<h3^>Business Information:^</h3^>
echo     ^<ul^>
echo         ^<li^>Agent Name: !AGENT_NAME!^</li^>
echo         ^<li^>Services: !SERVICES!^</li^>
echo         ^<li^>Phone: !PHONE_NUMBER!^</li^>
echo         ^<li^>Domain: !DOMAIN!^</li^>
echo     ^</ul^>
echo     
echo     ^<!-- Chat Widget Scripts --^>
echo     ^<script src="!SAFE_NAME!-session-memory.js"^>^</script^>
echo     ^<script src="!SAFE_NAME!-chat-widget.js"^>^</script^>
echo ^</body^>
echo ^</html^>
) > "!OUTPUT_DIR!\test-page.html"

echo ✅ Created: test-page.html

:: Create quick deployment batch file
(
echo @echo off
echo echo Deploying !BUSINESS_NAME! Chatbot...
echo echo.
echo echo 1. Checking Wrangler CLI...
echo npx wrangler --version
echo if errorlevel 1 ^(
echo     echo Installing Wrangler...
echo     npm install -g wrangler
echo ^)
echo.
echo echo 2. Login to Cloudflare ^(if needed^)...
echo npx wrangler whoami ^>nul 2^>^&1
echo if errorlevel 1 ^(
echo     echo Opening browser for Cloudflare login...
echo     npx wrangler login
echo ^)
echo.
echo echo 3. Deploying CORS proxy worker...
echo npx wrangler deploy !SAFE_NAME!-cors-proxy.js --name !SAFE_NAME!-proxy
echo.
echo echo 4. Testing deployment...
echo timeout /t 3 /nobreak ^> nul
echo echo Testing worker health...
echo echo ^(Manual test: https://!SAFE_NAME!-proxy.your-account.workers.dev/health^)
echo.
echo echo ✅ Deployment complete!
echo echo.
echo echo Next steps:
echo echo 1. Update the CORS_PROXY_URL in !SAFE_NAME!-chat-widget.js
echo echo 2. Upload files to your web server
echo echo 3. Add the script tags to your website
echo echo 4. Test with test-page.html
echo echo.
echo pause
) > "!OUTPUT_DIR!\deploy.bat"

echo ✅ Created: deploy.bat

echo.
echo ========================================
echo    DEPLOYMENT PACKAGE COMPLETE!
echo ========================================
echo.

echo 🎉 SUCCESS! Created customized chatbot files for !BUSINESS_NAME!
echo.
echo 📁 Files location: %CD%\!OUTPUT_DIR!
echo.
echo 📋 Files created:
echo   ✅ !SAFE_NAME!-chat-widget.js
echo   ✅ !SAFE_NAME!-cors-proxy.js  
echo   ✅ !SAFE_NAME!-session-memory.js
echo   ✅ DEPLOYMENT-INSTRUCTIONS.md
echo   ✅ test-page.html
echo   ✅ deploy.bat
echo.
echo 🚀 NEXT STEPS:
echo.
echo 1. Open the folder: !OUTPUT_DIR!
echo 2. Read: DEPLOYMENT-INSTRUCTIONS.md
echo 3. Run: deploy.bat ^(to deploy Cloudflare Worker^)
echo 4. Update CORS proxy URL in chat widget
echo 5. Upload files to your website
echo 6. Test with test-page.html
echo.

set /p OPEN_FOLDER="Open the deployment folder now? (y/N): "
if /i "!OPEN_FOLDER!"=="y" (
    start "" "!OUTPUT_DIR!"
)

echo.
echo ✅ Deployment package ready!
echo Your N8N chatbot files are customized and ready to deploy.
echo.

pause
goto :eof

:: Function to convert to lowercase
:LCase
for %%i in (A B C D E F G H I J K L M N O P Q R S T U V W X Y Z) do set %1=!%1:%%i=%%i!
goto :eof
