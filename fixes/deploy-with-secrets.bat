@echo off
echo Deploying Atlanta Gutter Guard Pros with API Secrets...
echo.

REM First, add the secret to Cloudflare Pages
echo Setting up Mistral API key as secret...
echo Run this command to add your API key:
echo.
echo wrangler pages secret put MISTRAL_API_KEY
echo.
echo When prompted, paste: hKCnOoLbEXL18JLuj5N2wzTlwXKMmVFr
echo.
echo Press any key after adding the secret...
pause

REM Deploy the site
echo.
echo Deploying to Cloudflare Pages...
wrangler pages deploy . --project-name=atlanta-gutter-guard-pros

echo.
echo Deployment complete!
echo.
echo IMPORTANT: After deployment, verify the secret is active by:
echo 1. Go to Cloudflare Dashboard
echo 2. Navigate to Pages > atlanta-gutter-guard-pros
echo 3. Go to Settings > Environment variables
echo 4. Confirm MISTRAL_API_KEY is listed
echo.
pause
