@echo off
echo ============================================
echo Atlanta Gutter Guard Pros - Widget Update
echo Connecting to Superhuman.services Platform
echo ============================================
echo.

echo This will update your website to use the multi-tenant Service Bot
echo from https://superhuman.services
echo.

REM Update all HTML files to remove old widget and add new one
echo Updating HTML files...

REM First, let's list all HTML files that need updating
dir *.html /b > html_files.txt

echo.
echo The following files will be updated:
type html_files.txt
echo.

echo ============================================
echo MANUAL STEPS REQUIRED:
echo ============================================
echo.
echo 1. Remove these lines from ALL HTML files:
echo    - Any reference to gutter-widget-production.js
echo    - Any reference to gutter-widget.js
echo    - Any GUTTER_BOT_CONFIG scripts
echo.
echo 2. Add this code before the closing body tag:
echo.
echo ^<script^>
echo   window.ServiceBotConfig = {
echo     tenant: 'atlantagutter',
echo     businessName: 'Atlanta Gutter Guard Pros',
echo     primaryColor: '#2c3e50',
echo     phoneNumber: '(470) 851-6780'
echo   };
echo ^</script^>
echo ^<script src="https://superhuman.services/widget.js" async^>^</script^>
echo.
echo 3. Deploy to Cloudflare:
echo    wrangler pages deploy . --project-name=atlanta-gutter-guard-pros
echo.
echo ============================================
echo.

REM Clean up
del html_files.txt

pause
