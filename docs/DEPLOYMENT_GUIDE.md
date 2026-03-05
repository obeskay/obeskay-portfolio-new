# 🚀 Deployment Guide - obeskay.com Portfolio

## Quick Start Commands

### Local Development
```bash
cd obeskay-portfolio-new
npm install
npm run dev
```

### Build & Run (Production)
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker-compose up -d
```

## Deployment Options

### Option 1: Coolify (Recommended)

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Setup in Coolify**
   - Log in to your Coolify instance: https://admin.cloud.obeskay.com
   - Click "New Application"
   - Select your Git provider
   - Choose repository and branch
   - **Build Settings**:
     - Build Type: `Dockerfile`
     - Docker Context: `/`
     - Docker Dockerfile Path: `./Dockerfile`
   - Click "Deploy"

3. **Configure Domain**
   - In application settings, add domain: `obeskay.com`
   - Coolify will automatically generate SSL certificate

### Option 2: Docker (Any VPS)

```bash
# Clone the repository
git clone <your-repo-url>
cd obeskay-portfolio-new

# Build and run
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 3: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

### Option 4: Railway, Render, or Fly.io

These platforms support Docker deployments directly. Import your repository and they'll detect the Dockerfile automatically.

## Environment Variables

No environment variables required for this portfolio. It's fully static.

Optional variables (for future enhancements):
```env
NODE_ENV=production
PORT=3000
```

## Performance Optimization

The portfolio is already optimized with:
- Static generation (SSG)
- Image optimization
- Code splitting
- CSS purging (Tailwind)
- Minified assets

## Monitoring

### Add Analytics (Optional)

1. **Vercel Analytics**:
   ```bash
   npm install @vercel/analytics
   ```
   Add to `app/layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>{children}<Analytics /></body>
       </html>
     );
   }
   ```

2. **Plausible** (privacy-friendly):
   Add script to `app/layout.tsx` from your Plausible dashboard.

## Backup Strategy

Since this is a static site, your Git repository IS your backup. Keep it synced and you're safe.

For additional peace of mind:
- Enable Git backups
- Export Coolify configuration periodically

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Docker Issues
```bash
# Rebuild container
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Images Not Loading
Check that `/public/img/` directory exists and contains the images.

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

## Customization After Deployment

### Update Profile Info
Edit `app/page.tsx`:
- Name, title, bio
- Skills and levels
- Projects and links
- Contact information

### Change Colors
Edit `app/globals.css`:
- Modify `--accent`, `--background`, etc.
- Gradient colors

### Add/Remove Sections
Edit `app/page.tsx` to add new sections or remove existing ones.

## Security Notes

- No database = no SQL injection risk
- Static site = no server-side code execution
- HTTPS enabled by default on Coolify
- CSP headers can be added in `next.config.ts` if needed

## Scaling

This portfolio can handle unlimited traffic:
- Static content served from CDN
- No database queries
- No server-side rendering overhead
- Images optimized and cached

## Updates

To update after deployment:
1. Make changes locally
2. Test: `npm run build && npm start`
3. Commit and push to Git
4. Coolify will auto-redeploy

---

**Need Help?**
- Check the main README.md for more details
- Review PROJECT_SUMMARY.md for implementation details
- Contact: obeskay.mail@gmail.com
