@echo off
echo Starting local Cloudflare Pages development server...
echo.
echo This will test the chat widget with the secure API locally.
echo Make sure you have wrangler installed: npm install -g wrangler
echo.

REM Start the development server with functions
echo Starting server at http://localhost:8788
echo.
wrangler pages dev . --port 8788

pause
