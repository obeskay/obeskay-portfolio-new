# 🚀 ObeSkay Deployment Scripts

## Quick Deploy

### Option 1: One-Line Deploy (Recommended)
```bash
npm run deploy
```

### Option 2: Full Deploy with Monitoring
```bash
npm run deploy:monitor
```

### Option 3: Manual Script
```bash
./deploy.sh
```

---

## Scripts Overview

### `deploy.sh` - Quick Deploy
Simple deployment script that:
1. Builds the Next.js application
2. Commits and pushes to Git
3. Triggers Coolify deployment via API
4. Monitors deployment status (10 attempts, 60s each)
5. Performs health checks

**Usage:**
```bash
./deploy.sh
# or
npm run deploy
```

### `deploy-portfolio.sh` - Full Monitoring
Complete deployment with detailed monitoring:
1. Validates directory
2. Builds with error checking
3. Git push (optional if fails)
4. API deployment trigger
5. Status monitoring with color output
6. Health check validation
7. Final deployment summary

**Usage:**
```bash
./deploy-portfolio.sh
# or
npm run deploy:monitor
```

---

## Configuration

Edit `deploy.sh` or `deploy-portfolio.sh` to update:

```bash
COOLIFY_URL="https://admin.cloud.obeskay.com"
PORTFOLIO_APP_ID="pso4ss4wo0gccoo84gk0og04"
PORTFOLIO_DOMAIN="https://obeskay.com"
BEARER_TOKEN="your-bearer-token"
```

### Finding Your App ID

1. Login to Coolify: https://admin.cloud.obeskay.com
2. Go to Applications
3. Click on your portfolio app
4. App ID is in the URL: `/applications/pso4ss4wo0gccoo84gk0og04`

### Getting Bearer Token

1. Coolify Dashboard → Settings → API Tokens
2. Generate new token
3. Copy the token (format: `18|xxxxxxxxxxxxxxxx`)

---

## Deployment Process

```
┌─────────────────────────────────────┐
│  1. npm run build                   │
│     Build Next.js app               │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  2. git push origin main            │
│     Push to Git repo                │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  3. Coolify API Deploy Trigger      │
│     POST /api/v1/applications/ID   │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  4. Wait & Monitor (60s x 10)       │
│     Check status every minute       │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  5. Health Check                    │
│     Verify site is live             │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  ✅ DEPLOYMENT COMPLETE             │
└─────────────────────────────────────┘
```

---

## Manual Deployment (Coolify Dashboard)

If scripts fail, deploy manually:

1. **Login:** https://admin.cloud.obeskay.com
2. **Navigate:** Applications → Your Portfolio
3. **Click:** "Deploy Now" button
4. **Wait:** ~2-5 minutes for build
5. **Verify:** Visit https://obeskay.com

---

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Git Push Fails
```bash
git status
git add .
git commit -m "Manual commit"
git push origin main
```

### Coolify API Error
- Verify Bearer token is valid
- Check App ID is correct
- Try manual deployment from dashboard

### Health Check Fails
- DNS propagation (wait 5-10 min)
- SSL certificate generation (automatic)
- Check Coolify logs for errors

---

## Monitoring

### Coolify Dashboard
https://admin.cloud.obeskay.com/applications/YOUR_APP_ID

### Live Site
https://obeskay.com

### Health Endpoint
```bash
curl https://obeskay.com/api/health
```

---

## Environment

| Variable | Value |
|----------|-------|
| NODE_ENV | production |
| PORT | 3000 |
| HOSTNAME | 0.0.0.0 |

---

**Tip:** Scripts use `set -e` for fail-fast behavior. Any error stops deployment immediately.
