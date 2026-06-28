# Helium Growth Opportunity Intelligence System

Helium Growth Opportunity Intelligence System is a premium, production-ready AI SaaS product designed to help Helium's sales team automatically identify, rank, and prioritize high-value direct-to-consumer (D2C) brands for checkout and conversion rate optimization (CRO).

Instead of manually auditing hundreds of e-commerce pages, this platform crawls and analyzes websites using the Gemini API. It detects conversion bottlenecks (leaks), calculates a priority score, determines the perfect timing for outreach, crafts a customized sales pitch, and generates tailored cold email templates.

---

## Technical Stack & Architecture

### Frontend (React Single Page App)
* **Framework:** React 18, Vite (fast HMR bundler)
* **Styling:** Tailwind CSS (modern dark-theme design tokens, glassmorphism panel styles)
* **Animations:** Framer Motion (page slide transitions, responsive drawer slides)
* **Visualizations:** Recharts (Area, Pie, and Bar graphs visualizing priorities, industries, and common leaks)
* **Icons:** Lucide React

### Backend (Express Node server)
* **Engine:** Express.js running in ES Modules (`type: module`)
* **AI Engine:** Google Gemini API (`@google/generative-ai` SDK) utilizing `gemini-1.5-flash` with JSON output schemas
* **Robustness:** Built-in self-healing offline modes. If no Gemini API key is configured or if the server goes offline, the system automatically redirects to an immersive mock client database engine.

---

## Core Features

1. **AI Conversion Leak Auditing:** Automatically checks for Poor Mobile UX, Checkout Friction, Slow Speeds, Lack of Trust Seals, weak CTAs, and Navigation hurdles.
2. **Sales Playbook Synthesis:** Identifies "Why Helium?", "Why Now?" (urgency triggers), and generates structured proof points.
3. **Outreach Email Compiler:** Drafts personalized greeting, opening hooks, value propositions, and calls-to-action with a one-click copy buffer.
4. **Interactive Dashboard:** Advanced search, dynamic sorting (by priority, confidence, traffic, catalog size), multi-parameter dropdown filters (industry, size, priority score, leak category), and inline status selectors.
5. **Team Collaboration:** Save internal sales follow-up notes, toggle bookmarks, and update target outreach pipelines.
6. **Data Export:** Instant download of target brand intelligence tables as formatted CSV spreadsheets.

---

## Local Installation

### 1. Backend Server Setup
Navigate to the `backend` folder, copy the environment configuration, install the Node packages, and run the server.

```bash
cd backend
cp .env.example .env
npm install
npm run start
```
*Note: Open `backend/.env` and paste your `GEMINI_API_KEY` to run live audits. If left blank, the backend runs in mock audit simulator mode.*

### 2. Frontend Client Setup
Open a second terminal, navigate to the `frontend` folder, install the client dependencies, and start the development bundler.

```bash
cd frontend
npm install
npm run dev
```

*The frontend server runs on [http://localhost:3000](http://localhost:3000) and automatically proxies API calls to [http://localhost:5000](http://localhost:5000).*

---

## Core Folder Structure

```
Helium/
├── backend/
│   ├── services/
│   │   └── gemini.js         # Google Gen AI SDK interface
│   ├── utils/
│   │   └── mockParser.js     # High-fidelity D2C preset reports
│   ├── server.js             # Express API router (GET, POST, PUT, DELETE)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx   # Collapsible sidebar filtering
    │   │   ├── Navbar.jsx    # Domain search & action trigger
    │   │   ├── BrandTable.jsx# Grid display & inline updates
    │   │   ├── DomainInput.jsx# Multi-step progress log panel
    │   │   ├── VisualCharts.jsx# Recharts analytics
    │   │   └── AnalysisDrawer.jsx# Detailed slide-out audit
    │   ├── services/
    │   │   └── api.js        # REST Client
    │   ├── utils/
    │   │   └── mockData.js   # स्टैंडअलोन standalone browser fallback data
    │   ├── App.jsx           # Main state manager
    │   ├── index.css         # Tailwind master stylesheet
    │   └── main.jsx
    └── package.json
```

---

## Future Improvements
* **Live Scraper Integration:** Direct HTML scraper parsing headers, scripts, and image file weights before submitting to Gemini.
* **Email API Sync:** Integration with SendGrid or HubSpot to send outreach emails directly from the sales playbook drawer.
* **Collaborative Multi-Tenancy:** Real-time multi-agent activity tracking using WebSockets to see which salesperson is contacting which brand.
