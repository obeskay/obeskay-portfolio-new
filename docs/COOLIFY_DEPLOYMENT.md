# 🚀 Coolify Deployment Instructions

**Purpose**: Provide complete deployment instructions for AI agents (Claude Code, OpenCode, etc.) to deploy this portfolio to Coolify.

---

## 📋 Quick Reference

| Item | Value |
|------|-------|
| **Coolify URL** | `https://admin.cloud.obeskay.com` |
| **Application ID** | See `.coolify-secrets.md` |
| **API Token** | See `.coolify-secrets.md` |
| **Production Domain** | `https://obeskay.com` |
| **Deployment Command** | `npm run deploy` |

---

## 🔐 Secrets Location

**IMPORTANT**: Credentials are stored securely in gitignored files:

1. **`.coolify-secrets.md`** - Current credentials with rotation info
2. **`.env.local`** - Active environment variables for scripts
3. **`.env.example`** - Template structure

**To access credentials:**
```bash
# View current secrets
cat .coolify-secrets.md

# Load for manual use
source .env.local

# Export to environment
export $(cat .env.local | xargs)
```

---

## 🎯 Deployment Methods

### Method 1: NPM Script (Recommended)

```bash
npm run deploy
```

This executes `deploy.sh` which:
1. Builds the Next.js application
2. Commits and pushes to Git
3. Triggers Coolify deployment via API
4. Monitors deployment status
5. Performs health checks

### Method 2: Manual Script

```bash
./deploy.sh
```

### Method 3: Coolify Dashboard (Manual)

1. Login: https://admin.cloud.obeskay.com
2. Navigate to: **Applications** → Portfolio
3. Click: **"Deploy Now"**
4. Wait for build (~2-5 minutes)
5. Verify: https://obeskay.com

---

## 📝 Pre-Deployment Checklist

Before deploying, verify:

- [ ] `.env.local` exists with valid credentials
- [ ] Git working directory is clean
- [ ] Build passes locally: `npm run build`
- [ ] Application ID is correct in `.env.local`
- [ ] API token is not expired

---

## 🔄 Step-by-Step Deployment Process

### Step 1: Build Application

```bash
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ Generating static pages
✓ Deployment complete
```

### Step 2: Git Commit & Push

```bash
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
```

Coolify auto-deploys on Git push if webhook is configured.

### Step 3: Trigger Coolify API (Optional)

If Git webhook is not configured, trigger manually:

```bash
curl -X POST \
  -H "Authorization: Bearer $COOLIFY_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  "https://admin.cloud.obeskay.com/api/v1/applications/$COOLIFY_APP_ID/deploy"
```

### Step 4: Monitor Deployment

Check status in Coolify Dashboard:
- URL: `https://admin.cloud.obeskay.com/applications/{APP_ID}`
- Status: `running` → `ready`

Or use the deployment script which monitors automatically.

### Step 5: Health Check

Verify site is live:

```bash
curl -I https://obeskay.com
curl https://obeskay.com | grep -i "Obed Vargas"
```

Expected: HTTP 200, content contains "Obed Vargas"

---

## 🛠️ Environment Variables

Required variables in `.env.local`:

```bash
# Coolify Configuration
COOLIFY_URL="https://admin.cloud.obeskay.com"
COOLIFY_APP_ID="pso4ss4wo0gccoo84gk0og04"
COOLIFY_BEARER_TOKEN="18|xxxxxxxxxxxxxxxxxxxxxxxx"

# Deployment Target
PORTFOLIO_DOMAIN="https://obeskay.com"

# Optional
CHECK_INTERVAL=60
MAX_ATTEMPTS=10
```

---

## 🔍 Finding Your Application ID

1. Login to Coolify: https://admin.cloud.obeskay.com
2. Go to: **Applications**
3. Click on your portfolio application
4. Look at browser URL:
   ```
   https://admin.cloud.obeskay.com/applications/pso4ss4wo0gccoo84gk0og04
                                                      ^^^^^^^^^^^^^^^^^^^^
                                                      This is your APP_ID
   ```

---

## 🔑 Generating New API Token

If token is expired or compromised:

1. **Login to Coolify**: https://admin.cloud.obeskay.com
2. **Go to**: Settings → API Tokens
3. **Click**: "Create New Token"
4. **Name**: `obeskay-portfolio-deploy`
5. **Permissions**: Read + Deploy (minimum required)
6. **Copy token immediately** (format: `18|xxxxxxxxxxxxxxxx`)
7. **Update files**:
   - `.coolify-secrets.md`
   - `.env.local`
8. **Revoke old token** for security

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules .next
npm install
npm run build
```

### API Token Expired

```bash
# Check .coolify-secrets.md for token rotation date
cat .coolify-secrets.md

# Generate new token and update .env.local
```

### Git Push Fails

```bash
# Check remote
git remote -v

# Re-add if needed
git remote add origin https://github.com/obeskay/obeskay-portfolio-new.git
git push -u origin main
```

### Coolify Deployment Stuck

1. Check Coolify logs: Dashboard → Applications → Your App → Logs
2. Look for errors in build output
3. Restart deployment from dashboard
4. Check resource limits (CPU/Memory)

### Health Check Fails

```bash
# Test domain directly
curl https://obeskay.com

# Check DNS propagation
nslookup obeskay.com

# Verify SSL certificate
curl -vI https://obeskay.com
```

---

## 📊 Monitoring & Verification

### Check Deployment Status

```bash
# Via API
curl -H "Authorization: Bearer $COOLIFY_BEARER_TOKEN" \
  "https://admin.cloud.obeskay.com/api/v1/applications/$COOLIFY_APP_ID" | jq '.status'
```

### View Live Site

- **Production**: https://obeskay.com
- **Expected Content**: "Obed Vargas", "products", "actually work"

### Check Build Logs

In Coolify Dashboard:
1. Applications → Your Portfolio
2. Click "View Logs"
3. Filter by deployment timestamp

---

## 🔐 Security Best Practices

1. **Never commit `.env.local` or `.coolify-secrets.md`**
2. **Rotate API tokens every 90 days**
3. **Use minimum required permissions**
4. **Monitor API usage in Coolify dashboard**
5. **Revoke unused tokens immediately**
6. **Use HTTPS for all API calls**

---

## 📚 Related Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Comprehensive deployment guide
- [DEPLOYMENT_SCRIPTS.md](./DEPLOYMENT_SCRIPTS.md) - Script documentation
- `.env.example` - Environment variables template
- `.coolify-secrets.md` - Current credentials

---

## 🤖 AI Agent Instructions

**For Claude Code / OpenCode / Similar:**

When asked to deploy to Coolify:

1. **Read credentials**:
   ```bash
   cat .coolify-secrets.md
   source .env.local
   ```

2. **Verify setup**:
   ```bash
   npm run build
   git status
   ```

3. **Execute deployment**:
   ```bash
   npm run deploy
   ```

4. **Monitor and verify**:
   - Watch for "✅ HEALTH CHECK PASSED!"
   - Check production URL
   - Report deployment status

**Important**: Always use `.env.local` for credentials, never hardcode.

---

**Last Updated**: 2026-02-22  
**Author**: Obed Vargas  
**Contact**: obeskay.mail@gmail.com
