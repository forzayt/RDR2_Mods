# RDR2 Mod Haven

A community-driven mod marketplace for **Red Dead Redemption 2**, 

---

## ✨ Overview

RDR2 Mod Haven is a modern, fast-loading mod catalog where users can browse, filter, sort, and discover community-made modifications for Red Dead Redemption 2. The project is designed as a **single-page application** with SSR and a clean, responsive UI featuring day/night mode.

### Current Features (MVP)

- 📦 **Mod Catalog** — Displays mods from a local `mods.json` with title, author, category, rating, download count, and verification badge
- 🔍 **Search** — Instant text filtering across mod titles, authors, and categories
- 🏷️ **Category Filtering** — Filter by Weapons, Horses, Towns, Landscapes, Characters, or view All
- 📊 **Sorting** — Sort by Most Downloaded, Newest, or Top Rated
- ✅ **Verification Filter** — Toggle to show only verified mods
- 🌙 **Dark / Light Mode** — One-click theme toggle for the entire experience
- 📢 **Featured Banner** — A prominent hero section showcasing a highlighted mod
- ⬆️ **Upload Page** — Dedicated route for uploading new mods (`/upload`)

### UI/UX Design

- **Dark-first palette** with warm Western-themed accents (brass, primary)
- Glassmorphism cards with backdrop blur
- Hover animations on mod cards
- Sticky navigation bar
- Responsive layout: mobile-first with columns scaling from 1 to 4

---

## 📂 Project Structure

```
RDR2_Mods/
├── src/                      # Application source code
│   ├── assets/               # Mod images & featured banners
│   ├── components/ui/        # Shared UI components (Radix-based)
│   ├── data/                 # Static data (mods.json)
│   ├── hooks/                # React custom hooks
│   ├── lib/                  # Utilities & error handling
│   ├── routes/               # TanStack Start file-based routes
│   │   ├── index.tsx         # Main catalog page (/)
│   │   ├── upload.tsx        # Mod upload page (/upload)
│   │   └── __root.tsx        # App layout shell
│   ├── server-functions/     # Backend serverless functions
│   │   └── submit-mod.ts     # Mod submission handler
│   ├── router.tsx            # Router configuration
│   ├── start.ts              # Start screen for dev
│   └── styles.css             # Global CSS & Tailwind imports
├── public/                   # Static assets (favicon, robots.txt)
├── .env                      # Environment variables
└── package.json              # Project dependencies & scripts
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (18+) — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **Bun**

### Installation

```bash
# Clone the repository
git clone <this-repository-url>
cd <repository-name>

# Install dependencies
npm i

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🛠️ Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | TanStack Start (React-based) |
| **Router** | TanStack React Router v1 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Radix UI + `clsx` + `tailwind-merge` |
| **State** | TanStack Query |
| **Validation** | Zod |
| **Icons** | Lucide React |
| **Animations** | Framer Motion (`tw-animate-css`) |
| **Build Tool** | Vite |
| **Runtime** | Bun / Node.js |

---

## 📐 Data Model

Mods are stored in `src/data/mods.json` as a JSON array:

```json
[
  {
    "id": "en-graved-cattleman",
    "title": "Engraved Cattleman",
    "category": "Weapons",
    "author": "Ash Hollow",
    "rating": 4.7,
    "downloads": 62100,
    "updated": "2026-02-03",
    "image": "revolver",          // Matches key in src/assets/
    "verified": true,
    "featured": false
  }
]
```

### Category Reference

| Category | Image Key |
|---|---|
| Weapons | `mod-revolver`, `mod-rifles` |
| Horses | `mod-mare`, `mod-stallion` |
| Towns | `mod-town`, `mod-bridge` |
| Landscapes | `mod-canyon`, `mod-ridge` |
| Characters | `mod-duster` |

---

## 🌐 Route Overview

| Route | File | Description |
|---|---|---|
| `/` | `src/routes/index.tsx` | Mod catalog with search, filter, sort |
| `/upload` | `src/routes/upload.tsx` | Mod upload form |
| Shell | `src/routes/__root.tsx` | App layout with header/footer |

---

## 🧩 Component Architecture

All reusable UI components live in `src/components/ui/`, built on top of **Radix Primitive** components:

- `accordion`, `alert`, `alert-dialog`, `badge`
- `button`, `calendar`, `chart`, `checkbox`
- `dialog`, `drawer`, `dropdown-menu`, `form`
- `input`, `label`, `list`, `navigation-menu`
- `pagination`, `popover`, `progress`, `radio-group`
- `select`, `sheet`, `slider`, `table`, `tabs`, `textarea`

This component library is designed for **composition** and can be used independently across routes.

---

## 📝 Next Steps / TODO

- [ ] Replace local `mods.json` with a backend API (Supabase / Firebase)
- [ ] Add mod detail pages (`/mod/:id`)
- [ ] User authentication (login / signup)
- [ ] Mod upload form with file upload & preview
- [ ] Pagination / infinite scroll for large mod lists
- [ ] Tags, descriptions, and version history per mod
- [ ] Admin dashboard for moderation

---

## 📄 License

Built with [Lovable](https://lovable.dev) — fully open to contribution.