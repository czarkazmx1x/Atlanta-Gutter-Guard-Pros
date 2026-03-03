@echo off
echo ===============================================
echo  🚀 ATLANTA GUTTER GUARD PROS - DEPLOYMENT
echo ===============================================
echo.

cd /d "C:\Users\jacos\Desktop\gutter-guard-website"

echo 📋 What's being deployed:
echo ✅ Main website (index.html, calculator.html, services.html)
echo ✅ All location pages (20+ cities)
echo ✅ Chat bot functionality (AI-powered)
echo ✅ Cloudflare Pages Functions
echo ✅ Updated phone numbers and content
echo.

echo 🔍 Pre-deployment checks...
if not exist "index.html" (
    echo ❌ ERROR: index.html not found!
    pause
    exit /b 1
)

if not exist "calculator.html" (
    echo ❌ ERROR: calculator.html not found!
    pause
    exit /b 1
)

echo ✅ Core files verified
echo.

echo 📤 Deploying to Cloudflare Pages...
npx wrangler pages deploy . --project-name atlanta-gutter-guard-pros

if %ERRORLEVEL% == 0 (
    echo.
    echo 🎉 DEPLOYMENT SUCCESSFUL!
    echo.
    echo 🌐 Your website is live at:
    echo    https://atlantagutterguardpros.com
    echo.
    echo 📱 Key pages to test:
    echo    • Homepage with calculator link
    echo    • Calculator functionality
    echo    • Phone number (323-325-1319
    echo    • All location pages
    echo.
    echo 📊 Monitor performance:
    echo    • Check Cloudflare Pages dashboard
    echo    • Monitor website traffic
    echo    • Test calculator conversions
) else (
    echo.
    echo ❌ DEPLOYMENT FAILED!
    echo Check the error messages above and try again.
    echo.
)

echo.
pause