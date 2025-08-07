@echo off
echo 🧪 TESTING CHAT BOT LOCALLY WITH CLOUDFLARE PAGES
echo.

cd /d "C:\Users\jacos\Desktop\gutter-guard-website"

echo 🔑 Make sure to set your Mistral API key:
echo    wrangler secret put MISTRAL_API_KEY --local
echo.

echo 🚀 Starting local development server...
echo.
echo 📍 When ready, test at:
echo    http://localhost:8788
echo.
echo 💬 Chat bot will be available on all pages!
echo.

npx wrangler pages dev . --local

pause