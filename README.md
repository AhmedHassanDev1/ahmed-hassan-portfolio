# Ahmed Hassan — Portfolio

> **Full-Stack AI Product Developer**  
> A modern, dark-themed portfolio built with Next.js, React, and TypeScript — showcasing projects, services, workflow, and contact in one polished experience.

![Full page preview](./overview/screenshots/01-full-page-desktop.png)

---

## Overview

This repository contains the source code for **Ahmed Hassan's personal portfolio website**: a single-page product focused on full-stack development, AI-powered systems, and SaaS delivery.

The site combines editorial typography, orange-on-black branding, interactive workflow visualization, 3D hero accents, and a production-ready contact API.

For a detailed walkthrough with section screenshots, see **[overview/OVERVIEW.md](./overview/OVERVIEW.md)**.

---

## Features

| Area | Highlights |
|------|------------|
| **Hero** | Full-viewport intro, availability badge, capability links, core stack strip, Three.js visual layer |
| **About** | Profile narrative + animated terminal-style profile card |
| **Skills** | Grouped technology grid (Interface, Systems, AI Products, Delivery) |
| **Workflow** | 7-stage product process with desktop map + mobile timeline |
| **Projects** | Featured work grid with rich card layouts and visual treatments |
| **Services** | Six service offerings with responsive imagery |
| **Contact** | Form backed by `/api/contact` (Nodemailer + Gmail) |
| **Footer** | Navigation, services, social links, newsletter UI |

Additional UX details:

- Responsive navigation with mobile drawer and scroll-aware styling
- Motion system with `prefers-reduced-motion` support
- Content separated from presentation (`content/` + `components/`)
- Accessible focus states and semantic section structure

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Components | shadcn/ui, Base UI, Lucide, React Icons |
| 3D / Motion | Three.js, custom motion primitives |
| Email | Nodemailer (Gmail SMTP) |
| Tooling | ESLint, PostCSS |

---

## Project Structure

```text
portfolio/
├── app/
│   ├── api/contact/          # Contact form API route
│   ├── styles/               # Global design tokens & section styles
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/               # Navbar, sections, containers
│   ├── motion/               # Reveal, stagger, parallax, etc.
│   ├── ui/                   # Button, card, glass panel
│   └── visual/               # Hero 3D, workflow pipeline, project tilt
├── content/                  # Copy & structured content (no JSX)
├── overview/
│   ├── OVERVIEW.md           # Detailed product overview + screenshots
│   └── screenshots/          # Captured site previews
├── public/                   # Images, service art, project assets
├── scripts/
│   └── capture-screenshots.mjs
└── types/
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** (or pnpm / yarn)

### Installation

```bash
git clone <repository-url>
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Create a `.env` file in the project root for the contact form:

```env
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
CONTACT_EMAIL=recipient@example.com
```

| Variable | Description |
|----------|-------------|
| `GMAIL_USER` | Gmail account used to send mail |
| `GMAIL_APP_PASSWORD` | Gmail App Password (not your login password) |
| `CONTACT_EMAIL` | Inbox that receives portfolio inquiries |

Without these variables, the contact form returns a server configuration error.

---

## Page Sections

| Section | ID | Description |
|---------|----|-------------|
| Hero | `#home` | Introduction and primary CTA |
| About | `#about` | Profile, principles, terminal card |
| Skills | `#skills` | Technology groups |
| Workflow | `#workflow` | Product delivery stages |
| Projects | `#projects` | Selected case studies |
| Services | `#services` | Offerings and capabilities |
| Contact | `#contact` | Inquiry form |

---

## Screenshots

Preview images are stored under `overview/screenshots/`:

| File | View |
|------|------|
| `01-full-page-desktop.png` | Full desktop page |
| `02-hero-desktop.png` | Hero section |
| `05-workflow-desktop.png` | Workflow section |
| `06-projects-desktop.png` | Projects section |
| `10-hero-mobile.png` | Hero (mobile) |

Regenerate screenshots (requires a running local server):

```bash
# Terminal 1
npm run build && npm run start

# Terminal 2
$env:SCREENSHOT_BASE_URL="http://localhost:3000"   # PowerShell
node scripts/capture-screenshots.mjs
```

---

## Design Identity

- **Palette:** black / charcoal surfaces, warm white text, orange accent (`#ff6a3d`)
- **Typography:** Inter, Newsreader (italic highlights), Roboto
- **Tone:** product-focused, technical, premium dark UI
- **Motion:** restrained; respects reduced-motion preferences

---

## Author

**Ahmed Hassan**  
Full-Stack & AI Product Developer — Giza, Egypt

- GitHub: [@AhmedHassanDev1](https://github.com/AhmedHassanDev1)
- LinkedIn: [Ahmed Hassan](https://www.linkedin.com/in/ahmed-hassan-02a006235/)
- Email: ahmedhassan.dev20@gmail.com

---

## License

Private portfolio project. All rights reserved © 2026 Ahmed Hassan.
