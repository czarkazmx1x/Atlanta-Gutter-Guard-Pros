@echo off
echo ====================================================
echo Atlanta Gutter Guard Pros - Deploy with Superhuman
echo ====================================================
echo.

echo All HTML files have been updated to use the
echo Superhuman.services AI chat bot platform!
echo.

echo Widget Configuration:
echo - Tenant: atlantagutter
echo - Platform: https://superhuman.services
echo - Phone: (323) 325-1319
echo.

echo Deploying to Cloudflare Pages...
echo.

wrangler pages deploy . --project-name=atlanta-gutter-guard-pros

echo.
echo ====================================================
echo Deployment Complete!
echo ====================================================
echo.
echo Test your AI chat bot at:
echo 1. Staging: https://d4a73a85.atlanta-gutter-guard-pros.pages.dev
echo 2. Production: https://atlantagutterguardpros.com
echo.
echo The chat widget should appear in the bottom-right corner.
echo.
echo Test messages:
echo - "How much do gutter guards cost?"
echo - "I have pine needle problems"
echo - "Emergency repair needed"
echo.
echo ====================================================
pause
