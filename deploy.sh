#!/bin/bash

# =============================================================================
# 🚀 UNIFIED COOLIFY DEPLOYMENT SCRIPT FOR OBEKSKAY PORTFOLIO
# =============================================================================
# Merged, refined, and robust script combining deploy.sh and deploy-portfolio.sh.
# Features:
#   - Strict error trapping & reporting
#   - Premium color status messaging
#   - Local dry-run build validation (Next.js compilation check)
#   - Git workflow automation with current-branch detection
#   - Coolify trigger API hook
#   - Dual-layer health checks (API /api/health + homepage "Obed Vargas" validation)
#   - Complete customizability via command-line flags
# =============================================================================

# Exit immediately if a command exits with a non-zero status
set -Eeuo pipefail

# Terminal colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Beautiful output helpers
log_section() {
    echo -e "\n${PURPLE}=========================================================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${PURPLE}=========================================================================${NC}\n"
}

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

# Error Handler Trap
error_handler() {
    local exit_code=$?
    local line_number=$1
    echo ""
    log_error "An error occurred on line $line_number (Exit code: $exit_code)"
    log_error "Deployment halted. Please review the errors above."
    echo ""
    exit "$exit_code"
}
trap 'error_handler $LINENO' ERR

# Load environment variables from .env.local if it exists
if [ -f ".env.local" ]; then
    log_info "Loading environment from .env.local..."
    set -a
    source .env.local
    set +a
else
    log_warning ".env.local file not found. Relying on current system environment."
fi

# Fallback Configuration Values
COOLIFY_URL="${COOLIFY_URL:-https://admin.cloud.obeskay.com}"
PORTFOLIO_APP_ID="${PORTFOLIO_APP_ID:-}"
BEARER_TOKEN="${BEARER_TOKEN:-}"
PORTFOLIO_DOMAIN="${PORTFOLIO_DOMAIN:-https://obeskay.com}"
CHECK_INTERVAL="${CHECK_INTERVAL:-45}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-15}"

# Parse Command Line Arguments
SKIP_BUILD=false
SKIP_GIT=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --skip-build) SKIP_BUILD=true ;;
        --skip-git) SKIP_GIT=true ;;
        -h|--help)
            echo -e "${CYAN}ObeSkay Portfolio Deployment Tool${NC}"
            echo ""
            echo "Usage: ./deploy.sh [options]"
            echo ""
            echo "Options:"
            echo "  --skip-build    Skip local dry-run compile check (npm run build)"
            echo "  --skip-git      Skip git commit and push steps"
            echo "  -h, --help      Show this help message"
            echo ""
            exit 0
            ;;
        *)
            log_error "Unknown parameter: $1"
            echo "Run with -h or --help for instructions."
            exit 1
            ;;
    esac
    shift
done

# Validate required variables
if [ -z "$PORTFOLIO_APP_ID" ]; then
    log_error "PORTFOLIO_APP_ID is not set!"
    echo "   Ensure PORTFOLIO_APP_ID is defined in .env.local or your environment."
    exit 1
fi

if [ -z "$BEARER_TOKEN" ]; then
    log_error "BEARER_TOKEN is not set!"
    echo "   Ensure BEARER_TOKEN is defined in .env.local or your environment."
    exit 1
fi

# Make sure we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "package.json not found in the current directory."
    log_error "Please run this script from the project root directory."
    exit 1
fi

# Start Deployment process
echo -e "${CYAN}"
echo "=========================================================="
echo "      🚀 OBEKSKAY PORTFOLIO DEPLOYMENT PIPELINE"
echo "=========================================================="
echo "  Domain:   $PORTFOLIO_DOMAIN"
echo "  Coolify:  $COOLIFY_URL"
echo "  App ID:   $PORTFOLIO_APP_ID"
echo "=========================================================="
echo -e "${NC}"

# =============================================================================
# STEP 1: DRY-RUN BUILD CHECK (NEXT.JS COMPILATION)
# =============================================================================
if [ "$SKIP_BUILD" = false ]; then
    log_section "🛠️  STEP 1: DRY-RUN BUILD CHECK"
    log_info "Running local dry-run compile check (npm run build) to verify production safety..."
    
    # We run the build, outputting to console so developer sees details if it fails.
    if npm run build; then
        echo ""
        log_success "Local compilation succeeded! Code is production-ready."
    else
        echo ""
        log_error "Local compilation failed!"
        log_error "Please fix build errors before deploying to avoid remote build failures."
        exit 1
    fi
else
    log_section "🛠️  STEP 1: DRY-RUN BUILD SKIPPED"
    log_warning "Bypassing local compilation check."
fi

# =============================================================================
# STEP 2: GIT COMMIT AND PUSH
# =============================================================================
if [ "$SKIP_GIT" = false ] && [ -d ".git" ]; then
    log_section "🔄 STEP 2: GIT AUTOMATION"
    log_info "Checking for uncommitted modifications..."
    
    # Check if there are changes to commit (including untracked files)
    if [ -n "$(git status --porcelain)" ]; then
        log_info "Uncommitted changes detected. Staging and committing..."
        git add .
        COMMIT_MSG="Deploy portfolio: $(date '+%Y-%m-%d %H:%M:%S')"
        
        # We don't want git commit failing to crash the script if no changes actually exist
        if git commit -m "$COMMIT_MSG"; then
            log_success "Changes committed successfully: '$COMMIT_MSG'"
        else
            log_warning "Git commit completed with warning."
        fi
    else
        log_info "No changes detected to commit."
    fi
    
    # Find current branch
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
    log_info "Pushing local commits to remote branch [${CURRENT_BRANCH}]..."
    
    # Git push might fail (e.g. if authentication issue or diverted heads), handle gracefully
    if git push origin "$CURRENT_BRANCH"; then
        log_success "Git push completed successfully!"
    else
        echo ""
        log_warning "Git push failed!"
        log_warning "We will attempt to trigger Coolify, but it may build old code if Git push failed."
    fi
else
    log_section "🔄 STEP 2: GIT AUTOMATION SKIPPED"
    if [ "$SKIP_GIT" = true ]; then
        log_info "Git automation was explicitly bypassed via flag."
    else
        log_warning "No .git directory found. Skipping Git push."
    fi
fi

# =============================================================================
# STEP 3: TRIGGER COOLIFY DEPLOYMENT VIA API
# =============================================================================
log_section "🚀 STEP 3: TRIGGER DEPLOYMENT ON COOLIFY"
log_info "Triggering remote build via Coolify API..."

# Make API call and capture response
DEPLOY_RESPONSE=$(curl -s -X GET \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    -H "Content-Type: application/json" \
    "$COOLIFY_URL/api/v1/deploy?uuid=$PORTFOLIO_APP_ID" \
    2>/dev/null || echo "failed")

if [ "$DEPLOY_RESPONSE" = "failed" ] || echo "$DEPLOY_RESPONSE" | grep -qi "error" || [ -z "$DEPLOY_RESPONSE" ]; then
    log_warning "Failed to trigger deployment via Coolify API!"
    log_warning "API Response: $DEPLOY_RESPONSE"
    log_warning "The server will still attempt to deploy if Coolify's Git webhooks are configured."
else
    log_success "Deployment successfully triggered on Coolify!"
    # Display friendly message from Coolify if available
    MSG=$(echo "$DEPLOY_RESPONSE" | jq -r '.message' 2>/dev/null || echo "$DEPLOY_RESPONSE")
    log_info "Coolify Response: $MSG"
fi

# =============================================================================
# STEP 4: MONITOR DEPLOYMENT & DUAL-LAYER HEALTH CHECKS
# =============================================================================
log_section "📊 STEP 4: MONITOR DEPLOYMENT & HEALTH CHECKS"
log_info "Monitoring status at intervals of ${CHECK_INTERVAL}s (Max attempts: $MAX_ATTEMPTS)..."
log_info "Target Domain: $PORTFOLIO_DOMAIN"
log_info "Layer 1 Check: $PORTFOLIO_DOMAIN/api/health"
log_info "Layer 2 Check: Contains 'fernanda.esr'"
echo ""

HEALTH_PASSED=false

for i in $(seq 1 $MAX_ATTEMPTS); do
    ts=$(date +%H:%M:%S)
    
    # 1. Fetch Application status from Coolify API
    COOLIFY_STATUS=$(curl -s \
        -H "Authorization: Bearer $BEARER_TOKEN" \
        "$COOLIFY_URL/api/v1/applications/$PORTFOLIO_APP_ID" \
        2>/dev/null | jq -r '.status' 2>/dev/null || echo "unknown")
        
    echo -e "   [Attempt $i/$MAX_ATTEMPTS] $ts - Coolify status: ${YELLOW}$COOLIFY_STATUS${NC}"
    
    # 2. Layer 1 Health Check: API Endpoint (/api/health)
    health_api_url="$PORTFOLIO_DOMAIN/api/health"
    
    # Make curl call to health check endpoint
    health_curl_out=$(curl -s -w "\n%{http_code}" "$health_api_url" 2>/dev/null || echo -e "failed\n000")
    health_body=$(echo "$health_curl_out" | sed '$d')
    health_code=$(echo "$health_curl_out" | tail -n 1)
    
    layer1_ok=false
    if [ "$health_code" -eq 200 ] && echo "$health_body" | grep -qi "ok"; then
        layer1_ok=true
        echo -e "      ${GREEN}✓${NC} Layer 1: /api/health returned HTTP 200 OK (${GREEN}$health_body${NC})"
    else
        echo -e "      ${RED}✗${NC} Layer 1: /api/health failed (HTTP $health_code, Body: $health_body)"
    fi
    
    # 3. Layer 2 Health Check: Verify core page content
    homepage_body=$(curl -s -L "$PORTFOLIO_DOMAIN" 2>/dev/null || echo "failed")
    
    layer2_ok=false
    if echo "$homepage_body" | grep -qi "fernanda.esr"; then
        layer2_ok=true
        echo -e "      ${GREEN}✓${NC} Layer 2: Homepage content verified ('fernanda.esr' found)"
    else
        echo -e "      ${RED}✗${NC} Layer 2: Homepage content missing key strings"
    fi
    
    # Verify both layers succeeded
    if [ "$layer1_ok" = true ] && [ "$layer2_ok" = true ]; then
        HEALTH_PASSED=true
        echo ""
        log_success "🎉 DUAL-LAYER HEALTH CHECK PASSED!"
        break
    fi
    
    if [ $i -lt $MAX_ATTEMPTS ]; then
        echo -e "      ${BLUE}⏳ Deployment in progress... sleeping ${CHECK_INTERVAL}s${NC}\n"
        sleep "$CHECK_INTERVAL"
    fi
done

# If health check failed, alert user and return exit code 1
if [ "$HEALTH_PASSED" = false ]; then
    echo ""
    log_error "❌ DEPLOYMENT VERIFICATION FAILED OR TIMED OUT!"
    log_error "The dual-layer health check did not pass within the allowed attempts ($MAX_ATTEMPTS)."
    log_error "Please check the deployment logs on Coolify dashboard:"
    log_error "👉 $COOLIFY_URL/applications/$PORTFOLIO_APP_ID"
    exit 1
fi

# =============================================================================
# DEPLOYMENT COMPLETE
# =============================================================================
echo ""
echo -e "${GREEN}=========================================================================${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT AND VERIFICATION COMPLETELY SUCCESSFUL!${NC}"
echo -e "${GREEN}=========================================================================${NC}"
echo -e "${BLUE}🌐 Live Site:${NC}      $PORTFOLIO_DOMAIN"
echo -e "${BLUE}🎛️  Coolify App:${NC}    $COOLIFY_URL/applications/$PORTFOLIO_APP_ID"
echo -e "${GREEN}=========================================================================${NC}"
echo ""
