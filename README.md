# 📊 Financial Dashboard

A modern React-based financial dashboard that integrates with **n8n cloud workflows** via webhooks to provide real-time financial news and comprehensive stock reports.

## 🌐 Live Demo

**🚀 Hosted URL:** [https://financial-dashboard-dmyc.onrender.com](https://financial-dashboard-dmyc.onrender.com)

---

## ✨ Features

### 📰 Financial News
- Browse financial news across multiple categories (General, Forex, Crypto, Merger)
- Real-time updates from Finnhub API
- Responsive card layout with images and summaries
- Direct links to full articles
- Optional filtering by minimum ID

### 📈 Financial Reports
- Get comprehensive financial reports for any stock symbol
- Key metrics and company data
- Clean, organized data presentation
- Instant results

---

## 🏗️ Architecture

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** n8n Cloud Workflows (webhook-based)  
**Deployment:** Render (Static Site with HTTPS)  
**API Integration:** Direct fetch calls to n8n webhooks

### n8n Webhook Endpoints
- **Financial News:** `https://lkx100.app.n8n.cloud/webhook-test/8fa85732-41ed-4d19-ab17-03204077aaf9`
- **Financial Reports:** `https://lkx100.app.n8n.cloud/webhook-test/8c0d0c76-69db-495a-bb78-c038a6bc301a`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/lkx100/financial-dashboard.git
cd financial-dashboard

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with section switching
│   ├── NewsSection.jsx     # Financial news with category filter
│   └── ReportSection.jsx   # Stock reports by symbol
├── pages/
│   └── Home.jsx            # Landing page
├── App.jsx                 # Main app with state-based routing
└── index.css               # Tailwind CSS imports
```

---

## 🔧 Technologies Used

- **React 19** - UI framework
- **Vite 7** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **n8n Cloud** - Workflow automation & API integration
- **Render** - Hosting & deployment

---

## 🌐 Deployment

Deployed as a static site on **Render** with:
- Automatic HTTPS
- Auto-deploy on git push
- Global CDN delivery
- Custom domain support

**Build Configuration:**
- Build Command: `pnpm install && pnpm run build`
- Publish Directory: `./dist`

---

## 🐛 Debugging

Console logs are enabled throughout the application for easy debugging:
- Navigation events
- Form submissions
- API requests & responses
- Error tracking

Open browser DevTools (F12) to view logs.

---

## 📝 License

MIT License - feel free to use this project for learning or production.

---

## 👤 Author

**Lucky Kumar**  
GitHub: [@lkx100](https://github.com/lkx100)
