# Deployment Documentation

This folder contains all deployment-related documentation for the ObeSkay Portfolio.

## Files

| File | Description |
|------|-------------|
| `COOLIFY_DEPLOYMENT.md` | Complete Coolify deployment guide with credentials location |
| `DEPLOYMENT_GUIDE.md` | Step-by-step deployment instructions for multiple platforms |
| `DEPLOYMENT_SCRIPTS.md` | Documentation for deploy.sh and deploy-portfolio.sh scripts |
| `PROJECT_SUMMARY.md` | Project implementation summary |

## Quick Deploy

```bash
# Configure credentials (one-time setup)
cp .env.example .env.local
# Edit .env.local with your Coolify credentials

# Deploy
npm run deploy
```

## Coolify Setup

1. Login: https://admin.cloud.obeskay.com
2. Applications → Portfolio (App ID: `pso4ss4wo0gccoo84gk0og04`)
3. Enable auto-deploy from GitHub `main` branch
4. Deploy!

For detailed instructions, see [COOLIFY_DEPLOYMENT.md](./COOLIFY_DEPLOYMENT.md).
