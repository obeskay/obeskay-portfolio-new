# 🚀 ObeSkay Unified Deployment Script

## Quick Start

### 1. One-Line Deployment & Monitor
This command runs the local dry-run compile check, pushes to Git, triggers Coolify, and monitors the deployment with dual-layer health checks:
```bash
npm run deploy
# or
npm run deploy:monitor
# or
./deploy.sh
```

### 2. Bypass Local Compilation Check
If you want to quickly deploy without executing the local dry-run build validation:
```bash
./deploy.sh --skip-build
```

### 3. Bypass Git Automation
If you do not want the script to automatically commit and push your changes:
```bash
./deploy.sh --skip-git
```

---

## Unified Script Features

The new `deploy.sh` is a highly robust, fully-featured DevOps script that unifies the old `deploy.sh` and `deploy-portfolio.sh` scripts.

1. **Strict Error Handling & Trapping:**
   Uses `set -Eeuo pipefail` along with custom error trapping. Any unexpected command failure is cleanly intercepted, reporting the line number and halting the deployment safely to prevent erroneous builds. Git actions are wrapped to gracefully bypass errors if there are no modifications or origin issues.
   
2. **Premium Interface & Visual Statuses:**
   Uses vibrant console escape color palettes (`[INFO]`, `[SUCCESS]`, `[WARNING]`, `[ERROR]`) to present a beautiful terminal UI showing exactly what phase the pipeline is in.

3. **Local Dry-Run Build Verification:**
   Before triggering the remote server, it executes `npm run build` locally. If compilation fails, the deploy stops immediately. This ensures we never break remote main branch builds due to simple local syntax or type errors.

4. **Git Automation:**
   Automatically detects the current working branch, packages uncommitted changes into a deployment commit, and pushes to remote `origin`. If no changes are detected, it cleanly proceeds.

5. **Coolify API Integration:**
   Seamlessly pings the Coolify Deploy API using the authentication token provided in `.env.local` to trigger a remote build.

6. **Dual-Layer Health Checking:**
   Instead of checking only one layer, the monitor performs a sophisticated two-step validation:
   - **Layer 1:** Verification of the `/api/health` endpoint, making sure the Next.js API router is responding with HTTP 200 and an `{"status": "ok"}` JSON payload.
   - **Layer 2:** Verification of the root homepage (`/`), scraping and ensuring key strings like `"Obed Vargas"` are successfully returned.

---

## Configuration

Environment variables are loaded from `.env.local` in the project root:

```bash
# Coolify Deployment Configuration
PORTFOLIO_APP_ID="vc0kgsogw880c8o4wkw8skko"
BEARER_TOKEN="40|2L2ySFyjYhjidigzh79b3hLAJaqwlsu8og6OgQ8nec47e2ff"
COOLIFY_URL="https://admin.cloud.obeskay.com"
PORTFOLIO_DOMAIN="https://obeskay.com"
```

### Options & Flags

| Flag | Description |
|------|-------------|
| `--skip-build` | Bypasses local dry-run compilation (`npm run build`). |
| `--skip-git` | Bypasses staging, committing, and pushing changes via Git. |
| `-h`, `--help` | Outputs help and usage documentation. |

---

## Pipeline Workflow

```
┌──────────────────────────────────────────────┐
│        1. Parse CLI Arguments & Flags        │
│        (Check if --skip-build/--skip-git)    │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│        2. Local Dry-Run Compile Check        │
│           (Runs npm run build by default)    │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│        3. Git Staging & Automation           │
│        (Commit + push current active branch) │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│     4. Coolify Deployment API Trigger        │
│         (POST /api/v1/applications)          │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│      5. Loop Monitor & Dual-Layer Health     │
│        - Check 1: /api/health → "ok"         │
│        - Check 2: Homepage → "Obed Vargas"   │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│         ✅ DEPLOYMENT FULLY VALIDATED        │
└──────────────────────────────────────────────┘
```
