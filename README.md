<div align="center">

<br />

![HireSense AI](https://img.shields.io/badge/HireSense-AI-4338ca?style=for-the-badge&labelColor=0f0f0f)

# HireSense AI

### Your resume is being rejected before anyone reads it.

ATS systems filter out 75% of resumes automatically. HireSense tells you exactly why — and rewrites your resume to get past them.

<br />

[![Live Demo](https://img.shields.io/badge/Live_Demo-hire--sense--ai--theta.vercel.app-0f0f0f?style=for-the-badge&logo=vercel&logoColor=white)](https://hire-sense-ai-theta.vercel.app/)
[![Made with Gemini](https://img.shields.io/badge/Powered_by-Gemini_AI-4338ca?style=for-the-badge&logo=google&logoColor=white)]()
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-10b981?style=for-the-badge)]()

<br />

![HireSense Dashboard](/image2.png)

</div>

---

## The Problem

You apply to 50 jobs. You hear back from 2.

It's not because you're unqualified. It's because **Applicant Tracking Systems (ATS)** reject your resume before a human ever sees it — automatically, silently, and for reasons you can't see.

Missing keywords. Wrong formatting. Poor structure. That's all it takes.

---

## The Solution

HireSense AI scans your resume the way an ATS does, shows you exactly what's wrong, and then **rewrites your resume** to fix it — not just tells you to.

```
Upload Resume + Job Description
         ↓
   AI Analyzes (ATS Score + Keyword Gaps + Issues)
         ↓
   One Click → Fully Rewritten Resume
         ↓
   Download PDF — Ready to Apply
```

---

## Features

| Feature | What it does |
|---|---|
| 🎯 **ATS Match Score** | Instant 0–100% score against any job description |
| 🔍 **Keyword Analysis** | Shows exactly which keywords are missing and which matched |
| 💡 **AI Recommendations** | Actionable suggestions powered by Gemini AI |
| ✍️ **Resume Rewrite** | Full AI rewrite — not just suggestions, a ready-to-use resume |
| 📄 **PDF Export** | Download your optimized resume as a clean, professional PDF |
| 📊 **Analysis History** | Track all your analyses in one dashboard |
| 🔐 **Secure Auth** | JWT-based authentication with cookie sessions |
| ⚡ **Rate Limiting** | Daily analysis limits to ensure fair usage |

---

## Tech Stack

### Frontend
```
Next.js          — React framework with App Router
Zustand          — Lightweight global state management
TanStack Query   — Server state, caching, and sync
Axios            — HTTP client
GSAP             — Professional animations + ScrollTrigger
Lenis            — Smooth scroll
Tailwind CSS     — Utility-first styling
```

### Backend
```
Node.js          — Runtime
Express.js       — Web framework
MongoDB          — NoSQL database
Mongoose         — ODM for MongoDB
Multer           — File upload handling
pdf-parse        — PDF text extraction
Puppeteer        — PDF generation for optimized resumes
Gemini AI API    — Resume analysis + rewriting
```

### Infrastructure
```
Vercel           — Frontend deployment
Render           — Backend deployment
MongoDB Atlas    — Cloud database
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the repo

```bash
git clone https://github.com/FaydArshan94/hiresense-ai.git
cd hiresense-ai
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## How It Works

### Resume Analysis Flow

```
1. User uploads PDF resume
       ↓
2. pdf-parse extracts raw text
       ↓
3. User pastes job description
       ↓
4. Gemini AI compares resume vs JD:
   - Calculates match score (0-100%)
   - Identifies matched keywords
   - Finds missing keywords
   - Generates actionable suggestions
       ↓
5. Results saved to MongoDB
       ↓
6. User sees score, gaps, recommendations
```

### Resume Rewrite Flow

```
1. User clicks "Rewrite Resume AI"
       ↓
2. Backend fetches existing analysis + raw resume text
       ↓
3. Gemini AI rewrites resume:
   - Adds missing keywords naturally
   - Strengthens bullet points
   - Keeps real experience intact
   - No fabrication
       ↓
4. Puppeteer generates clean PDF
       ↓
5. User downloads optimized resume
```

---

## Project Structure

```
hiresense-ai/
├── frontend/
│   └── src/
│       ├── app/              # Next.js App Router pages
│       ├── components/
│       │   ├── layout/       # Navbar, Footer, Hero, sections
│       │   └── ui/           # Reusable UI components
│       └── store/            # Zustand stores
│
└── backend/
    └── src/
        ├── ai/
        │   ├── prompts/      # Gemini prompt builders
        │   ├── services/     # AI + PDF generation services
        │   └── contracts/    # Response schema validation
        ├── controllers/      # Route handlers
        ├── models/           # Mongoose schemas
        ├── middlewares/      # Auth, error handling
        └── routes/           # Express routes
```

---

## API Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Resume
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/resume/upload` | Upload PDF resume |

### Job Description
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/jd/upload` | Upload job description |

### AI Analysis
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/analyze-resume` | Run ATS analysis |
| POST | `/api/ai/rewrite-resume` | Rewrite + download PDF |
| GET | `/api/ai/history` | Get analysis history |
| GET | `/api/ai/usage` | Get daily usage |
| GET | `/api/ai/:id` | Get analysis by ID |

---

## Roadmap

- [x] ATS score analysis
- [x] Keyword gap detection
- [x] AI-powered resume rewrite
- [x] PDF export
- [x] Analysis history dashboard
- [ ] Cover letter generator
- [ ] LinkedIn profile optimizer
- [ ] Interview preparation tips based on gaps
- [ ] Team/recruiter dashboard
- [ ] Chrome extension

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## Contact

**Fayd Arshan**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-fayd--arshan-0077b5?style=flat&logo=linkedin)](https://www.linkedin.com/in/fayd-arshan-6716a6294/)
[![X](https://img.shields.io/badge/X-@ArshanFayd6142-1da1f2?style=flat&logo=x)](https://x.com/ArshanFayd6142)
[![Email](https://img.shields.io/badge/Email-arshanw94@gmail.com-ea4335?style=flat&logo=gmail)](mailto:arshanw94@gmail.com)

---

<div align="center">

**Built with ❤️ by Fayd Arshan**

*Making job hunting fair, one resume at a time.*

[![Star this repo](https://img.shields.io/github/stars/FaydArshan94/hiresense-ai?style=social)](https://github.com/FaydArshan94/hiresense-ai)

</div>