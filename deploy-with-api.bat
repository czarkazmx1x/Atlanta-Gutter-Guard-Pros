@echo off
echo Setting up Cloudflare environment variable...

echo Setting MISTRAL_API_KEY secret...
echo hKCnOoLbEXL18JLuj5N2wzTlwXKMmVFr | npx wrangler pages secret put MISTRAL_API_KEY --project-name atlanta-gutter-guard-pros

echo Deploying with updated environment...
npx wrangler pages deploy . --project-name atlanta-gutter-guard-pros

echo Done!
pause