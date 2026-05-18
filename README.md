# ANTIGRAVITY — Engineering Portfolio Platform

> A cinematic, full-stack developer portfolio and technical journal built by **Krishna Latwal** — Cloud & DevOps Engineer.

[![CI Pipeline](https://github.com/krishnalatwal/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/krishnalatwal/Portfolio/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

---

## What Is This?

ANTIGRAVITY is not a template. It is a bespoke, production-grade engineering platform designed around three principles:

- **Cinematic Aesthetics** — print-manga editorial layouts, atmospheric Three.js starfields, paper grain texture overlays, smooth Framer Motion transitions
- **Engineering Depth** — async telemetry pipeline, resilient API fallback architecture, MDX devlog system, GitHub Activity feed, CI/CD validation
- **Total Content Control** — every word, project, link, and feature flag is driven by data files. Zero UI edits needed for content changes.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                        FRONTEND                          │
│   React 19 + Vite 8 + Zustand + Framer Motion           │
│   Three.js · MDX Parser · Tailwind CSS · SectionIcons   │
├─────────────────────────────────────────────────────────┤
│                     DATA LAYER                           │
│   profile.js · projects.js · skills.js                  │
│   socials.js · settings.js · content/devlogs/*.mdx      │
├─────────────────────────────────────────────────────────┤
│                        BACKEND                           │
│        Node.js + Express REST API (Port 5000)            │
│   /api/profile · /api/projects · /api/skills             │
│   /api/contact · /api/telemetry                          │
├─────────────────────────────────────────────────────────┤
│                       DATABASE                           │
│              MongoDB Atlas (Mongoose ODM)                │
│   Collections: messages · telemetry                      │
└─────────────────────────────────────────────────────────┘
```

---

## Feature Set

| Feature | Description |
|---|---|
| 🌌 **Three.js Starfield** | Atmospheric WebGL canvas background on the Hero section |
| 🖼️ **Manga Panel System** | Reusable print-style desaturated image panels with vertical text |
| 🌗 **Dark / Light Mode** | Smooth HSL token-based theme transitions, persisted via Zustand |
| 📖 **MDX Devlog System** | Filesystem-based engineering journal — add `.mdx`, push, done |
| 🔍 **Reading Mode** | Floating Focus Read toggle on articles — dissolves UI, widens text |
| 📡 **GitHub Activity Feed** | Live repo cards + commit timeline with sessionStorage caching |
| 📬 **Contact Form** | Validated form submissions stored in MongoDB Atlas |
| 📊 **Async Telemetry** | Non-blocking event logger tracking visits, clicks, and interactions |
| ⚙️ **CI/CD Pipeline** | GitHub Actions validates frontend build and backend on every push |
| 🔌 **Resilient API** | Falls back to local static data when backend is offline |

---

## Project Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
│
├── frontend/
│   ├── src/
│   │   ├── content/
│   │   │   └── devlogs/        # ← Add new .mdx articles here
│   │   │       ├── telemetry-system.mdx
│   │   │       ├── portfolio-architecture.mdx
│   │   │       └── krishinetra-breakdown.mdx
│   │   │
│   │   ├── data/               # ← Edit content here, never in components
│   │   │   ├── profile.js      # Personal info, bio, contact details
│   │   │   ├── projects.js     # All project data and case studies
│   │   │   ├── skills.js       # Skills list with icon mappings
│   │   │   ├── socials.js      # Social platform links
│   │   │   └── settings.js     # Feature flags, nav, hero, github config
│   │   │
│   │   ├── sections/           # Presentational UI — reads from data/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── GithubActivity.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── Devlog.jsx
│   │   │   └── ArticleDetail.jsx
│   │   │
│   │   ├── components/         # Reusable primitives
│   │   │   ├── MangaPanel.jsx
│   │   │   ├── SocialIcons.jsx # Single source for all brand SVG icons
│   │   │   ├── Container.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── store/
│   │   │   ├── portfolioStore.js  # Zustand: API fetch + fallback + GitHub
│   │   │   └── themeStore.js
│   │   │
│   │   └── utils/
│   │       ├── telemetry.js    # Fire-and-forget async event logger
│   │       └── mdxParser.jsx   # Zero-dependency MDX frontmatter parser
│   │
│   └── public/manga/           # Static image assets for panels
│
└── backend/
    ├── data/                   # JSON fallback data for API routes
    ├── models/
    │   ├── Message.js          # Contact form schema
    │   └── Telemetry.js        # User interaction event schema
    ├── routes/api.js
    └── server.js
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- A [MongoDB Atlas](https://cloud.mongodb.com/) cluster (free tier works perfectly)

### 1. Clone

```bash
git clone https://github.com/krishnalatwal/Portfolio.git
cd Portfolio
```

### 2. Configure Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```ini
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.xxxx.mongodb.net/portfolio
```

```bash
npm run dev
# → API running at http://localhost:5000
```

### 3. Run Frontend

```bash
cd ../frontend
npm install
npm run dev
# → App running at http://localhost:5173
```

---

## Content Workflow

The entire content layer is data-driven. You never need to touch a UI component to update content.

### Update Profile Info
Edit `frontend/src/data/profile.js`:
```js
export const profileData = {
  name: 'Your Name.',
  title: 'YOUR ROLE',
  description: 'Your one-line pitch.',
  contact: {
    email: 'you@example.com',
    // ...
  }
}
```

### Add a New Project
Append to `frontend/src/data/projects.js` — the case study page renders automatically:
```js
{
  id: 4,
  slug: "my-new-project",
  title: "My New Project",
  subtitle: "Short tagline",
  description: "Card description.",
  image: "/manga/project4.jpg",
  tags: ["React", "Python"],
  liveUrl: "https://...",
  githubUrl: "https://github.com/...",
  details: { overview: "...", techStack: "...", ... }
}
```

### Update Social Links
Edit `frontend/src/data/socials.js`:
```js
{ id: 'github', url: 'https://github.com/your-username', icon: 'github' }
```

### Publish a Devlog Article
Drop a `.mdx` file into `frontend/src/content/devlogs/`:
```mdx
---
title: "My Article Title"
slug: "my-article-slug"
subtitle: "One-line description"
category: "Systems"
tags: ["Node.js", "MongoDB"]
publishedAt: "2026-06-01"
readingTime: "5 min read"
summary: "Short summary for the listing card."
---

# My Article Title

Article body goes here. Standard markdown, plus custom components:

<TransmissionQuote
  quote="Engineering is the art of making things work."
  source="Field Note #01"
/>
```

Push to GitHub → CI validates → Vercel deploys automatically.

### Toggle Features
Edit `frontend/src/data/settings.js`:
```js
features: {
  threeJsBackground: true,
  githubActivityFeed: true,
  devlogSection: true,
  readingModeToggle: true,
  // ...
}
```

---

## CI/CD Pipeline

Every `push` or `pull_request` to `main` triggers `.github/workflows/ci.yml`:

| Job | Steps |
|---|---|
| `frontend-build` | Install deps → `npm run build` → validate compilation |
| `backend-validation` | Install deps → validate Node.js environment |

---

## Deployment

### Frontend — Vercel *(recommended)*
1. Connect `krishnalatwal/Portfolio` repo to [Vercel](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Build command: `npm run build` · Output: `dist`
4. Deploy — every push to `main` auto-deploys

### Backend — Render *(recommended)*
1. Connect repo to [Render](https://render.com)
2. Set **Root Directory** to `backend`
3. Start command: `node server.js`
4. Add environment variable: `MONGODB_URI`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 + Vite 8 |
| Styling | Vanilla CSS + Tailwind CSS v4 |
| Animations | Framer Motion |
| 3D Background | Three.js + React Three Fiber |
| State Management | Zustand |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Mongoose) |
| Content | MDX (filesystem-based, zero CMS) |
| CI/CD | GitHub Actions |
| Deployment | Vercel (frontend) + Render (backend) |

---

## License

MIT — feel free to fork, adapt, and build your own version.
Give a ⭐ if this helped you.

---

*Built with restraint. Designed with intention. Engineered to last.*
