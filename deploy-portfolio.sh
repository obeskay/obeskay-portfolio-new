#!/bin/bash

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
PORTFOLIO_DOMAIN="${PORTFOLIO_DOMAIN:-https://obeskay.com}"
BEARER_TOKEN="${BEARER_TOKEN:-}"
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

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "============================================"
echo "🚀 OBEKSKAY PORTFOLIO DEPLOYMENT"
echo "============================================"
echo "Domain: $PORTFOLIO_DOMAIN"
echo "Coolify: $COOLIFY_URL"
echo "App ID: $PORTFOLIO_APP_ID"
echo "============================================"
echo ""

if [ ! -f "package.json" ]; then
    log_error "Please run this script from the portfolio root directory"
    exit 1
fi

log_info "Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    log_error "Build failed! Please fix errors before deploying"
    exit 1
fi

log_success "Build completed successfully!"

if [ -d ".git" ]; then
    log_info "Pushing changes to Git..."
    git add .
    git commit -m "Deploy portfolio - $(date '+%Y-%m-%d %H:%M:%S')" || true
    git push origin main || log_warning "Git push failed, continuing with manual deploy..."
fi

log_info "Triggering Coolify deployment..."
DEPLOY_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    -H "Content-Type: application/json" \
    "$COOLIFY_URL/api/v1/applications/$PORTFOLIO_APP_ID/deploy" \
    2>/dev/null)

if echo "$DEPLOY_RESPONSE" | grep -q "error"; then
    log_warning "Could not trigger auto-deploy. Manual deployment may be required."
    log_info "Response: $DEPLOY_RESPONSE"
else
    log_success "Deployment triggered!"
fi

echo ""
log_info "Starting deployment monitoring..."
echo "Deployment monitoring started..."

for i in $(seq 1 $MAX_ATTEMPTS); do
    ts=$(date +%H:%M:%S)

    status=$(curl -s \
        -H "Authorization: Bearer $BEARER_TOKEN" \
        "$COOLIFY_URL/api/v1/applications/$PORTFOLIO_APP_ID" \
        2>/dev/null | jq -r '.status' 2>/dev/null || echo "unknown")

    echo "[$i/$MAX_ATTEMPTS] $ts - Status: $status"

    health_response=$(curl -s "$PORTFOLIO_DOMAIN/api/health" 2>&1 || echo "failed")
    echo "  Health: $health_response"

    if echo "$health_response" | grep -qi "ok"; then
        echo ""
        log_success "✅ HEALTH CHECK PASSED!"
        log_success "🎉 Portfolio deployed successfully at $PORTFOLIO_DOMAIN"
        break
    fi

    if [ $i -lt $MAX_ATTEMPTS ]; then
        log_info "⏳ Still building... waiting ${CHECK_INTERVAL}s"
        echo ""
        sleep $CHECK_INTERVAL
    else
        echo ""
        log_warning "⚠️  Maximum attempts reached"
        log_warning "Deployment may still be in progress. Check manually at:"
        log_warning "$COOLIFY_URL/applications/$PORTFOLIO_APP_ID"
    fi
done

echo ""
echo "============================================"
echo "DEPLOYMENT SUMMARY"
echo "============================================"
echo "Domain: $PORTFOLIO_DOMAIN"
echo "Coolify Dashboard: $COOLIFY_URL"
echo "Application ID: $PORTFOLIO_APP_ID"
echo "============================================"

log_info "Performing final health check..."
curl -I "$PORTFOLIO_DOMAIN" 2>&1 | head -5

echo ""
log_info "Done! 🚀"
