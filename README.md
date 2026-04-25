# 🧭 Career Path Explorer

<div align="center">

![Career Path Explorer Banner](https://img.shields.io/badge/Career%20Path%20Explorer-AI%20Powered-6366f1?style=for-the-badge&logo=google&logoColor=white)

**AI-powered career guidance platform — type any job role and get a complete visual roadmap instantly**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Now-6366f1?style=for-the-badge)](https://career-path-explorer-gamma.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Nikhil16722-181717?style=for-the-badge&logo=github)](https://github.com/Nikhil16722/Career-Path-Explorer)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**[🌐 Live Demo](https://career-path-explorer-gamma.vercel.app) · [🐛 Report Bug](https://github.com/Nikhil16722/Career-Path-Explorer/issues) · [✨ Request Feature](https://github.com/Nikhil16722/Career-Path-Explorer/issues)**

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Generated Roadmaps** | Powered by Gemini 2.5 Flash — generates role-specific career data instantly |
| 📊 **Visual Career Ladder** | Animated position spine with skill bars, experience & salary at every level |
| 💰 **Salary Progression Chart** | Interactive bar chart showing salary growth from Junior to Director |
| 🗺 **Step-by-Step Roadmap** | 5-phase learning path with duration, focus areas and skill pills |
| 🔮 **Future Scope** | Industry trends, AI impact, market demand and emerging specializations |
| ⚖️ **Role Comparison** | Compare two job roles side-by-side — skills, salary, roadmap and future scope |
| 🔥 **Trending Searches** | See the most searched roles on the platform powered by Supabase |
| ⚡ **Smart Caching** | Results cached in Supabase — no repeat AI calls, instant load for popular roles |
| 📱 **Fully Responsive** | Works perfectly on mobile, tablet and desktop |
| 🎨 **Best-in-class UI** | Framer Motion animations, Recharts visualizations, beautiful design system |

---

## 🚀 Live Demo

👉 **[https://career-path-explorer-gamma.vercel.app](https://career-path-explorer-gamma.vercel.app)**

### How to use:

**1. Search a role**
- Type any job role in the search box on the homepage
- Examples: `Data Analyst`, `DevOps Engineer`, `UI/UX Designer`, `ML Engineer`
- Click quick chips for instant popular role searches

**2. View your career roadmap**
- See all career positions from Junior to Director/VP
- Each position shows required skills with proficiency bars
- Salary ranges at every level (Indian market)

**3. Explore the learning path**
- 5-phase step-by-step roadmap with timelines
- Skills and tools to learn at each phase
- From foundations to job-ready in 12 months

**4. Check future scope**
- Industry trends and AI impact
- Market demand and job growth stats
- Emerging specializations in the field

**5. Compare two roles**
- Click **Compare** in the navigation bar
- Enter any two roles (e.g. Data Analyst vs Data Scientist)
- See side-by-side salary, skills and roadmap comparison

**6. Share your roadmap**
- Click the **Share** button on any result page
- Link is copied to clipboard — share with anyone worldwide

### Example roles to try:
```
Data Analyst              Full Stack Developer
Data Scientist            DevOps Engineer
Machine Learning Engineer  Product Manager
UI/UX Designer            Cybersecurity Analyst
Cloud Architect           Mobile Developer
Blockchain Developer      Game Developer
```

---

## 🛠 Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Framework | Next.js 14 App Router + TypeScript | Free |
| Styling | Tailwind CSS | Free |
| Animations | Framer Motion | Free |
| Charts | Recharts | Free |
| AI / LLM | Gemini 2.5 Flash | Free (500 req/day) |
| Database | Supabase (Postgres) | Free (500MB) |
| State | Zustand + SWR | Free |
| Hosting | Vercel | Free |
| Repo + CI/CD | GitHub + GitHub Actions | Free |
| **Total** | | **₹0/month** |

---

## 📁 Project Structure

```
career-path-explorer/
├── .github/workflows/
│   ├── ci.yml              # Lint + typecheck on every push
│   └── deploy.yml          # Auto deploy to Vercel on main
├── src/
│   ├── app/
│   │   ├── page.tsx            # Homepage with hero + search
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── globals.css         # Global styles + animations
│   │   ├── api/
│   │   │   ├── career/         # POST → Gemini AI endpoint
│   │   │   ├── trending/       # GET → trending roles
│   │   │   └── save/           # POST/GET → Supabase cache
│   │   ├── explore/[role]/
│   │   │   ├── page.tsx        # Career result page
│   │   │   └── loading.tsx     # Skeleton loader
│   │   ├── compare/            # Role comparison page
│   │   └── saved/              # Saved roadmaps page
│   ├── components/
│   │   ├── career/
│   │   │   ├── CareerLadder.tsx    # Visual position spine
│   │   │   ├── SkillCard.tsx       # Animated skill bar
│   │   │   ├── RoadmapTimeline.tsx # Phase timeline
│   │   │   ├── SalaryChart.tsx     # Recharts salary chart
│   │   │   ├── FutureScope.tsx     # Trend cards
│   │   │   ├── RoleSearch.tsx      # Search with suggestions
│   │   │   └── CompareView.tsx     # Side-by-side comparison
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Input.tsx
│   │       └── Skeleton.tsx
│   ├── lib/
│   │   ├── gemini.ts           # Gemini AI client
│   │   ├── prompts.ts          # All AI prompts
│   │   ├── supabase.ts         # DB client + helpers
│   │   └── utils.ts            # Colors, helpers
│   ├── hooks/
│   │   ├── useCareerData.ts    # SWR data fetching
│   │   ├── useSearch.ts        # Debounced search
│   │   └── useStream.ts        # SSE streaming
│   ├── store/
│   │   └── useCareerStore.ts   # Zustand global state
│   └── types/
│       └── career.ts           # TypeScript types
├── supabase/
│   └── migrations/
│       └── 001_init.sql        # DB schema
└── .env.example
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v20+ — [nodejs.org](https://nodejs.org)
- Git — [git-scm.com](https://git-scm.com)

### Step 1 — Clone

```bash
git clone https://github.com/Nikhil16722/Career-Path-Explorer.git
cd Career-Path-Explorer
npm install
```

### Step 2 — Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
GEMINI_API_KEY=AIzaSy_your_key_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci_your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci_your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

| Key | Where to get |
|-----|-------------|
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com) → Get API Key (FREE) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → Data API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → Data API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → Data API → Reveal |

### Step 3 — Database setup

1. Go to [supabase.com](https://supabase.com) → your project → SQL Editor
2. Copy contents of `supabase/migrations/001_init.sql`
3. Paste and click **Run**

### Step 4 — Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌐 Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "initial commit"
git push origin main
```

1. Go to [vercel.com](https://vercel.com) → Import GitHub repo
2. Add all environment variables
3. Click **Deploy**

Live at: `https://your-project.vercel.app` ✅

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**👨‍💻 Built by [Nikhil Lingala](https://github.com/Nikhil16722)**

⭐ **If this helped you, please star the repo!** ⭐

[![Star on GitHub](https://img.shields.io/github/stars/Nikhil16722/Career-Path-Explorer?style=social)](https://github.com/Nikhil16722/Career-Path-Explorer)

**Powered by Gemini AI · Built with Next.js · Hosted on Vercel · 100% Free**

**[🌐 Live Demo](https://career-path-explorer-gamma.vercel.app) · [📁 GitHub](https://github.com/Nikhil16722/Career-Path-Explorer)**

</div>