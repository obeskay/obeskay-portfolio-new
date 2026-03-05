# Obed Vargas - Portfolio (Next.js 15)

> **Modern portfolio built with Next.js 15, React 19, and Tailwind 4**
>
> A clean, modern, and responsive portfolio showcasing my expertise in TypeScript, Next.js, AI agents, and web development.

## ✨ Features

- 🎨 **Modern Dark Design** - Clean, professional dark interface
- 📱 **Fully Responsive** - Optimized for all devices (mobile-first)
- ⚡ **Performance** - Built with Next.js 15 and React 19 for optimal speed
- 🎯 **SEO Optimized** - Full metadata, Open Graph, and Twitter cards
- 🚀 **Animations** - Subtle, smooth animations using Framer Motion
- 🐳 **Docker Ready** - Included Dockerfile for easy deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Docker / Coolify / Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd obeskay-portfolio-new

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

## 📦 Deployment

### Coolify (Recommended)

**Quick Deploy:**
```bash
# Configure secrets (one-time setup)
cp .env.example .env.local
# Edit .env.local with your Coolify credentials

# Deploy
npm run deploy
```

**Manual Deploy:**
See [docs/COOLIFY_DEPLOYMENT.md](docs/COOLIFY_DEPLOYMENT.md) for complete instructions.

1. **Push your code** to a Git repository (GitHub, GitLab, etc.)
2. **Create a new application** in Coolify
3. **Select your Git repository**
4. **Configure the build settings**:
   - Build Type: Dockerfile
   - Dockerfile Path: `./Dockerfile`
5. **Deploy!**

Coolify will automatically:
- Pull your code
- Build the Docker image
- Deploy the application
- Set up SSL certificates (if configured)

### Docker

**Using Docker Compose:**
```bash
docker-compose up -d
docker-compose logs -f
```

**Using Docker directly:**
```bash
docker build -t obeskay-portfolio .
docker run -p 3000:3000 obeskay-portfolio
```

### Alternative Platforms

- **Vercel**: `vercel` (install Vercel CLI first)
- **Railway**: Connect GitHub repo, auto-deploys
- **Render**: Deploy from Git repository

## 📁 Project Structure

```
obeskay-portfolio-new/
├── app/
│   ├── favicon.ico
│   ├── globals.css       # Global styles with Tailwind 4
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main portfolio page
├── docs/                 # Deployment documentation
├── public/
│   └── img/              # Images and assets
├── .dockerignore         # Docker ignore file
├── Dockerfile            # Production Docker image
├── docker-compose.yml    # Docker Compose configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Portfolio Sections

- **Hero**: Introduction with profile image and social links
- **About**: Personal information and quick facts
- **Skills**: Technical skills with animated progress bars
- **Projects**: Featured projects with tech stack and links
- **Contact**: Contact information and social media links

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **SEO**: Fully optimized for search engines
- **Accessibility**: WCAG compliant with semantic HTML

## 🔧 Customization

### Update Profile Information

Edit `app/page.tsx` to modify:
- Personal information
- Skills and proficiency levels
- Projects and links
- Contact details

### Update Styles

Modify `app/globals.css` for:
- Color scheme
- Typography
- Animation effects
- Custom scrollbar

### Update Metadata

Edit `app/layout.tsx` to change:
- Page title
- Description
- Keywords
- Open Graph settings

## 📞 Contact

- **Email**: obeskay.mail@gmail.com
- **Phone**: +52 55 6034 8476
- **GitHub**: [@obeskay](https://github.com/obeskay)
- **LinkedIn**: [obeskay](https://linkedin.com/in/obeskay)
- **Location**: Mexico City, Mexico

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Obed Vargas**
