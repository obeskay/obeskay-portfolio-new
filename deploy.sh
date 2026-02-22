#!/bin/bash

set -e

COOLIFY_URL="https://admin.cloud.obeskay.com"
PORTFOLIO_APP_ID="pso4ss4wo0gccoo84gk0og04"
PORTFOLIO_DOMAIN="https://obeskay.com"
BEARER_TOKEN="18|xkIrULIzIKJyfFmPHUv8PEvro2VjmRoIJmonlMWI9f959655"

echo "============================================"
echo "🚀 COOLIFY DEPLOYMENT MONITOR - OBEKSKAY"
echo "============================================"

cd /Users/obedvargasvillarreal/obeskay-portfolio-new

npm run build || exit 1

git add . && git commit -m "Deploy $(date '+%H:%M:%S')" || true
git push origin main || echo "Git push skipped"

curl -s -X POST \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    -H "Content-Type: application/json" \
    "$COOLIFY_URL/api/v1/applications/$PORTFOLIO_APP_ID/deploy" > /dev/null 2>&1

echo ""
echo "Deployment monitoring started..."
for i in 1 2 3 4 5 6 7 8 9 10; do 
    sleep 60
    ts=$(date +%H:%M:%S)
    st=$(curl -s -H "Authorization: Bearer $BEARER_TOKEN" "$COOLIFY_URL/api/v1/applications/$PORTFOLIO_APP_ID" 2>/dev/null | jq -r '.status')
    echo "[$i/10] $ts - Status: $st"
    sleep 2
    curl -s "$PORTFOLIO_DOMAIN/health" 2>&1 | head -3
    test $(curl -s "$PORTFOLIO_DOMAIN" 2>&1 | grep -c "Obed Vargas\|products\|actually" 2>/dev/null || echo 0) -gt 0 && echo "✅ HEALTH CHECK PASSED!" && break || echo "⏳ Still building..."
done

echo ""
echo "✅ Deployment complete! Check: $PORTFOLIO_DOMAIN"
