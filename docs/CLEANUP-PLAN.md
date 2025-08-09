# 🧹 CODEBASE CLEANUP PLAN

## 📊 CURRENT STATE ANALYSIS

### **📁 Files Count:**
- **Total Files**: ~80+ files
- **HTML Pages**: 20+ (many duplicates/variants)
- **Documentation**: 10+ markdown files
- **Scripts**: 6+ JavaScript files
- **Styles**: 4+ CSS files
- **Batch Files**: 5+ deployment scripts

## 🎯 CLEANUP CATEGORIES

### **1. DOCUMENTATION CLEANUP**
**Files to Archive/Remove:**
- `CALCULATOR-INTEGRATION-SUCCESS.md` ✅ (Done - can archive)
- `CALCULATOR-LIVE-PRODUCTION.md` ✅ (Done - can archive)
- `FIXES-DEPLOYED.md` ✅ (Done - can archive)
- `PRODUCTION-DEPLOYMENT-SUCCESS.md` ✅ (Done - can archive)
- `REAL-PHONE-NUMBER-LIVE.md` ✅ (Done - can archive)
- `IMAGE-FIX-STATUS.md` (Archive)
- `LOCATION-PAGES-VERIFICATION-REPORT.md` (Archive)

**Action**: Move to `docs/archive/` folder

### **2. DUPLICATE/UNUSED HTML FILES**
**To Review/Remove:**
- `index-optimized.html` (duplicate of index.html?)
- `CHAT-BOT-EMBED-CODE.html` (development artifact?)

**Action**: Compare and remove duplicates

### **3. SCRIPT/STYLE CLEANUP**
**Multiple Versions:**
- `flexible-images.js` vs `flexible-images-optimized.js`
- `gutter-widget.js` vs `gutter-widget-production.js`
- `script.js` vs `script-optimized.js`
- `styles.css` vs `styles-non-critical.css` vs `styles-non-critical-accessible.css`

**Action**: Keep only production versions

### **4. DEPLOYMENT SCRIPTS**
**Current Scripts:**
- `CHECK-PERFORMANCE.bat`
- `DEPLOY-ACCESSIBLE.bat`
- `DEPLOY-OPTIMIZED.bat`
- `DEPLOY-WITH-CHAT.bat`
- `TEST-CHAT-LOCAL.bat`
- `fix-all-phone-numbers.ps1` ✅ (Done - can archive)

**Action**: Keep only essential deployment scripts

### **5. BACKUP FOLDER**
**Current**: `backup/` contains old files
**Action**: Archive or remove old backups

### **6. NODE_MODULES & BUILD ARTIFACTS**
**Files:**
- `node_modules/` (should be in .gitignore)
- `optimized-images/` (check if needed)
- `.wrangler/` (Cloudflare cache)

## 🗂️ PROPOSED STRUCTURE

```
gutter-guard-website/
├── 📄 Core Files
│   ├── index.html
│   ├── calculator.html
│   ├── services.html
│   └── sitemap.xml
├── 🎨 Assets
│   ├── styles.css
│   ├── script.js
│   ├── flexible-images.js
│   └── images/
├── 📍 Location Pages
│   ├── leaf-filter-installation-alpharetta.html
│   ├── gutter-guards-roswell-ga.html
│   └── [other location pages]
├── 🤖 Functions
│   └── functions/
├── 📋 Documentation
│   ├── README.md
│   └── docs/
│       ├── deployment.md
│       └── archive/
├── 🔧 Config
│   ├── package.json
│   ├── wrangler.toml
│   └── .gitignore
└── 🚀 Deployment
    └── deploy.bat (single unified script)
```

## ✅ CLEANUP ACTIONS

### **Phase 1: Documentation**
1. Create `docs/` and `docs/archive/` folders
2. Move completed documentation to archive
3. Clean up root-level markdown files

### **Phase 2: Remove Duplicates**
1. Compare optimized vs regular files
2. Keep only production versions
3. Update references in HTML

### **Phase 3: Script Consolidation**
1. Merge deployment scripts into one
2. Remove development-only scripts
3. Update build process

### **Phase 4: Final Cleanup**
1. Update .gitignore
2. Remove unnecessary folders
3. Test deployment after cleanup

## 📈 BENEFITS

### **Performance:**
- ✅ Faster deployments (fewer files)
- ✅ Smaller repository size
- ✅ Cleaner builds

### **Maintenance:**
- ✅ Easier to find files
- ✅ Clear structure
- ✅ Less confusion

### **Development:**
- ✅ Faster local development
- ✅ Clear file purposes
- ✅ Better organization

## 🚨 SAFETY FIRST

### **Before Cleanup:**
1. ✅ Backup current working state
2. ✅ Ensure main site is working
3. ✅ Test all critical pages

### **During Cleanup:**
1. Move files instead of deleting
2. Test after each phase
3. Keep git history

### **After Cleanup:**
1. Full deployment test
2. Verify all pages work
3. Update documentation

**Ready to proceed with cleanup?** 🧹✨