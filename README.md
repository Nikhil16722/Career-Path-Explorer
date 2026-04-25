 
# 🧭 Career Path Explorer

An AI-powered career guidance platform. Type any job role and instantly get a complete visual roadmap — positions, skills, salary ranges, learning path, and future scope.

**Powered by Gemini 2.5 Flash · Built with Next.js 14 · 100% Free to run**

---

## ✨ Features

- 🤖 **AI-generated roadmaps** — Gemini 2.5 Flash generates role-specific career data
- 📊 **Visual career ladder** — animated positions with skill bars
- 💰 **Salary chart** — progression from junior to director
- 🗺 **Learning roadmap** — 5 phase step-by-step guide
- 🔮 **Future scope** — industry trends and opportunities
- 🔥 **Trending searches** — most searched roles on the platform
- ⚡ **Smart caching** — Supabase caches results, no repeat AI calls

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/career-path-explorer.git
cd career-path-explorer
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Where to get |
|----------|-------------|
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com) → Get API Key (FREE) |
| `NEXT_PUBLIC_SUPABASE_URL` | [supabase.com](https://supabase.com) → Project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page as above |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page — service_role key |

### 3. Set up Supabase database

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor → New Query**
3. Copy and run the contents of `supabase/migrations/001_init.sql`

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📦 Deploy to Vercel (free)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
gh repo create career-path-explorer --public --push
# or push manually via github.com/new
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. Click **Deploy**

Your live link: `https://career-path-explorer.vercel.app` ✅

---

## 🗂 Project Structure

```
career-path-explorer/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   ├── api/
│   │   │   ├── career/route.ts       # Gemini AI endpoint
│   │   │   ├── trending/route.ts     # Trending roles
│   │   │   └── save/route.ts         # Save to Supabase
│   │   └── explore/[role]/
│   │       ├── page.tsx              # Career result page
│   │       └── loading.tsx           # Skeleton loader
│   ├── components/
│   │   ├── layout/Navbar.tsx
│   │   └── career/
│   │       ├── CareerLadder.tsx      # Visual position spine
│   │       ├── SkillCard.tsx         # Animated skill bar
│   │       ├── RoadmapTimeline.tsx   # Phase timeline
│   │       ├── SalaryChart.tsx       # Recharts salary chart
│   │       ├── FutureScope.tsx       # Trend cards
│   │       └── RoleSearch.tsx        # Search with suggestions
│   ├── lib/
│   │   ├── gemini.ts                 # Gemini AI client
│   │   ├── prompts.ts                # All AI prompts
│   │   ├── supabase.ts               # DB client + helpers
│   │   └── utils.ts                  # Colors, helpers
│   ├── hooks/useCareerData.ts        # SWR data fetching
│   ├── store/useCareerStore.ts       # Zustand state
│   └── types/career.ts               # TypeScript types
├── supabase/migrations/
│   └── 001_init.sql                  # DB schema
├── .env.example
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS | Free |
| Animations | Framer Motion | Free |
| Charts | Recharts | Free |
| AI / LLM | Gemini 2.5 Flash | Free (500 req/day) |
| Database | Supabase (Postgres) | Free (500MB) |
| Hosting | Vercel | Free |
| Repo | GitHub | Free |
| **Total** | | **₹0/month** |

---

## 📄 License

MIT — free to use, modify and deploy.