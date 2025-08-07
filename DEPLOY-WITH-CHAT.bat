@echo off
echo 🚀 DEPLOYING ATLANTA GUTTER GUARD PROS WITH CHAT BOT
echo.

cd /d "C:\Users\jacos\Desktop\gutter-guard-website"

echo 📋 What's being deployed:
echo ✅ Chat widget on ALL pages (main site + blog)
echo ✅ Serverless chat API (Cloudflare Pages Functions)
echo ✅ AI-powered responses (Mistral AI)
echo ✅ Professional gutter guard expertise
echo.

echo 🔑 Setting up Mistral API key...
wrangler secret put MISTRAL_API_KEY

echo.
echo 📤 Deploying to Cloudflare Pages...
npx wrangler pages deploy . --project-name gutter-guard-georgia --compatibility-date 2024-01-01

echo.
echo 🎉 DEPLOYMENT COMPLETE!
echo.
echo 🌐 Your website is now live with AI chat bot:
echo    https://atlantagutterguardpros.com
echo.
echo 💬 Chat bot features:
echo    • Available on ALL pages
echo    • AI-powered gutter expertise
echo    • Lead generation and scheduling
echo    • 24/7 customer support
echo.
echo 📊 Monitor chat performance:
echo    Check Cloudflare Pages Functions logs
echo    Monitor website traffic and conversions
echo.
pause