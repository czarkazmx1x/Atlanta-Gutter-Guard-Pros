# 🚀 Deploying Atlanta Gutter Guard Pros to Cloudflare

## Option 1: Cloudflare Pages (Easiest - Via Web Interface)

### Steps:
1. **Go to**: https://dash.cloudflare.com/
2. **Navigate to**: Pages (in left sidebar)
3. **Click**: "Create a project"
4. **Connect GitHub**:
   - Click "Connect to Git"
   - Authorize Cloudflare to access your GitHub
   - Select: `czarkazmx1x/Atlanta-Gutter-Guard-Pros`
5. **Configure build**:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `/`
   - Root directory: `/`
6. **Click**: "Save and Deploy"

### Result:
- Your site will be available at: `[project-name].pages.dev`
- Auto-deploys when you push to GitHub
- Free SSL certificate included

---

## Option 2: Deploy via Wrangler CLI

### Install Wrangler:
```bash
npm install -g wrangler
```

### Create wrangler.toml:
```toml
name = "atlanta-gutter-guard-pros"
type = "webpack"
account_id = "YOUR_ACCOUNT_ID"
workers_dev = true
route = ""
zone_id = ""

[site]
bucket = "./"
entry-point = "workers-site"
```

### Deploy:
```bash
cd Atlanta-Gutter-Guard-Pros
wrangler publish
```

---

## Option 3: Direct Upload (Via Dashboard)

1. **Go to**: Cloudflare Pages Dashboard
2. **Click**: "Create a project"
3. **Choose**: "Direct Upload"
4. **Drag and drop** your entire project folder
5. **Click**: "Deploy site"

---

## 🌟 Recommended: Use Cloudflare Pages

**Why?**
- Automatic deployments from GitHub
- Free hosting
- Global CDN
- Automatic SSL
- Preview deployments for branches

**Your site will be live at:**
- `atlanta-gutter-guard-pros.pages.dev`
- Or connect your custom domain: `atlantagutterguardpros.com`

---

## Custom Domain Setup

Once deployed to Cloudflare Pages:
1. Go to your project settings
2. Click "Custom domains"
3. Add `atlantagutterguardpros.com`
4. Update your DNS records as instructed

---

## Need Help?

The easiest method is Option 1 - just connect your GitHub repo through the Cloudflare dashboard and it will auto-deploy!
