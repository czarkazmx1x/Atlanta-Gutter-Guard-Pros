# Connect Your Custom Domain to Cloudflare Pages

## Steps to connect atlantagutterguardpros.com:

1. **Log into Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com
   - Navigate to: Pages → atlanta-gutter-guard-pros

2. **Add Custom Domain**
   - Click: "Custom domains" tab
   - Click: "Set up a custom domain"
   - Enter: `atlantagutterguardpros.com`
   - Click: "Continue"

3. **Update DNS Records**
   - Cloudflare will show you the required DNS records
   - Add a CNAME record pointing to: `atlanta-gutter-guard-pros.pages.dev`

4. **Wait for Propagation**
   - DNS changes take 5-30 minutes
   - SSL certificate will be auto-generated

## Your Deployment URLs:

- **Preview URL**: https://e3b01e03.atlanta-gutter-guard-pros.pages.dev
- **Production URL**: https://atlanta-gutter-guard-pros.pages.dev
- **Custom Domain**: https://atlantagutterguardpros.com (after setup)

## Auto-Deployment from GitHub:

To set up automatic deployments when you push to GitHub:

1. Go to: Cloudflare Pages Dashboard
2. Click: Your project → Settings → Builds & deployments
3. Connect GitHub repository: czarkazmx1x/Atlanta-Gutter-Guard-Pros
4. Now every push to main branch will auto-deploy!

## Test Your Chat Widget:

1. Visit: https://e3b01e03.atlanta-gutter-guard-pros.pages.dev
2. Look for the green chat button (bottom-right)
3. Click to open the n8n chat
4. Test a conversation!

Your site is now live on Cloudflare's global network! 🚀
