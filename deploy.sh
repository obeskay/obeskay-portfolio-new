#!/bin/bash

set -e

# =============================================================================
# COOLIFY DEPLOYMENT SCRIPT
# Loads configuration from .env.local (gitignored) or environment variables
# =============================================================================

# Load environment variables from .env.local if it exists
if [ -f ".env.local" ]; then
    set -a
    source .env.local
    set +a
fi

# Configuration with fallbacks
COOLIFY_URL="${COOLIFY_URL:-https://admin.cloud.obeskay.com}"
PORTFOLIO_APP_ID="${PORTFOLIO_APP_ID:-}"
BEARER_TOKEN="${BEARER_TOKEN:-}"
PORTFOLIO_DOMAIN="${PORTFOLIO_DOMAIN:-https://obeskay.com}"
CHECK_INTERVAL="${CHECK_INTERVAL:-60}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-10}"

# Validate required variables
if [ -z "$PORTFOLIO_APP_ID" ]; then
    echo "❌ Error: PORTFOLIO_APP_ID not set"
    echo "   Solution: Copy .env.example to .env.local and fill in your values"
    exit 1
fi

if [ -z "$BEARER_TOKEN" ]; then
    echo "❌ Error: BEARER_TOKEN not set"
    echo "   Solution: Copy .env.example to .env.local and fill in your values"
    exit 1
fi

# =============================================================================
# DEPLOYMENT EXECUTION
# =============================================================================

echo "============================================"
echo "🚀 COOLIFY DEPLOYMENT - OBEKSKAY PORTFOLIO"
echo "============================================"
echo "Domain: $PORTFOLIO_DOMAIN"
echo "Coolify: $COOLIFY_URL"
echo "App ID: $PORTFOLIO_APP_ID"
echo "============================================"
echo ""

# Step 1: Build
echo "📦 Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""

# Step 2: Git push
if [ -d ".git" ]; then
    echo "🔄 Pushing to Git..."
    git add .
    git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')" || echo "ℹ️  No changes to commit"
    git push ${GIT_REMOTE:-origin} ${GIT_BRANCH:-main} || echo "⚠️  Git push failed, continuing..."
    echo ""
fi

# Step 3: Trigger Coolify deployment
echo "🚀 Triggering Coolify deployment..."
DEPLOY_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    -H "Content-Type: application/json" \
    "$COOLIFY_URL/api/v1/applications/$PORTFOLIO_APP_ID/deploy" \
    2>/dev/null)

if echo "$DEPLOY_RESPONSE" | grep -qi "error"; then
    echo "⚠️  Deploy trigger response: $DEPLOY_RESPONSE"
    echo "ℹ️  Deployment may still proceed via Git webhook"
else
    echo "✅ Deployment triggered successfully!"
fi
echo ""

# Step 4: Monitor deployment
echo "📊 Monitoring deployment status..."
echo "This will check every ${CHECK_INTERVAL}s for up to $MAX_ATTEMPTS attempts"
echo ""

for i in $(seq 1 $MAX_ATTEMPTS); do
    ts=$(date +%H:%M:%S)

    # Get application status
    status=$(curl -s \
        -H "Authorization: Bearer $BEARER_TOKEN" \
        "$COOLIFY_URL/api/v1/applications/$PORTFOLIO_APP_ID" \
        2>/dev/null | jq -r '.status' 2>/dev/null || echo "unknown")

    echo "[$i/$MAX_ATTEMPTS] $ts - Status: $status"

    # Health check
    health_check=$(curl -s "$PORTFOLIO_DOMAIN" 2>&1 | head -c 200)

    # Check if site is responding with our content
    if curl -s "$PORTFOLIO_DOMAIN" 2>&1 | grep -qi "Obed Vargas\|products\|actually work"; then
        echo ""
        echo "✅ HEALTH CHECK PASSED!"
        echo ""
        break
    fi

    if [ $i -lt $MAX_ATTEMPTS ]; then
        echo "⏳ Still building... waiting ${CHECK_INTERVAL}s"
        sleep $CHECK_INTERVAL
    else
        echo ""
        echo "⚠️  Maximum attempts reached"
        echo "ℹ️  Deployment may still be in progress"
        echo "📍 Check manually: $COOLIFY_URL/applications/$PORTFOLIO_APP_ID"
    fi
done

# =============================================================================
# DEPLOYMENT COMPLETE
# =============================================================================

echo ""
echo "============================================"
echo "✅ DEPLOYMENT COMPLETE"
echo "============================================"
echo "🌐 Live Site: $PORTFOLIO_DOMAIN"
echo "🎛️  Dashboard: $COOLIFY_URL/applications/$PORTFOLIO_APP_ID"
echo "============================================"
echo ""

# Final verification
echo "🔍 Final verification:"
curl -I "$PORTFOLIO_DOMAIN" 2>&1 | head -3 || echo "⚠️  Could not verify site"

echo ""
echo "🎉 Done!"
