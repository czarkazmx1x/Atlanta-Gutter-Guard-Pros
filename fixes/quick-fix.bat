@echo off
echo ===============================================
echo Atlanta Gutter Guard Pros - Quick Fix Script
echo ===============================================
echo.

echo Step 1: Adding Mistral API Key to Cloudflare...
echo.
echo IMPORTANT: When prompted, paste this API key:
echo hKCnOoLbEXL18JLuj5N2wzTlwXKMmVFr
echo.
wrangler pages secret put MISTRAL_API_KEY
echo.

echo Step 2: Deploying to Cloudflare Pages...
echo.
wrangler pages deploy . --project-name=atlanta-gutter-guard-pros
echo.

echo ===============================================
echo Deployment Complete!
echo ===============================================
echo.
echo Test your bot at:
echo https://d4a73a85.atlanta-gutter-guard-pros.pages.dev
echo.
echo Next steps:
echo 1. Open the staging URL in your browser
echo 2. Click the chat widget (bottom right)
echo 3. Test with "How much do gutter guards cost?"
echo 4. Verify AI responses are working
echo.
echo If successful, the bot is ready for production!
echo ===============================================
echo.
pause
