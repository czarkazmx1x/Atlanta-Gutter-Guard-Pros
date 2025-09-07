@echo off
echo Setting up secure Cloudflare environment...
echo This adds your Mistral API key as a secure secret (not visible in code)

echo %MISTRAL_API_KEY% | npx wrangler pages secret put MISTRAL_API_KEY --project-name atlanta-gutter-guard-pros

echo API key added securely!
echo Deploying with secure backend...

npx wrangler pages deploy . --project-name atlanta-gutter-guard-pros

echo Done! Your API key is now secure on the server.
pause