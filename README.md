<div align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/aura-stadium-ops.appspot.com/o/aura-logo.png?alt=media" width="120" alt="Aura Logo" />
  <h1>Aura Stadium Ops</h1>
  <p><b>Next-Generation Predictive Event Operations & AI Fan Companion</b></p>
  <p><i>Built for the Google Developer Challenge (Smart Stadiums & Tournament Operations)</i></p>
  
  <p>
    <img src="https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-blue?style=for-the-badge&logo=google" alt="Gemini" />
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
    <img src="https://img.shields.io/badge/Testing-Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
    <img src="https://img.shields.io/badge/A11y-WCAG%20AA-005A9C?style=for-the-badge&logo=w3c&logoColor=white" alt="WCAG" />
  </p>
</div>

---

## 🏆 The Vision

Managing massive stadium events (like the FIFA World Cup 2026) involves critical crowd control challenges, especially during egress (exit). Bottlenecks at stadium gates lead to poor fan experiences and serious safety hazards.

**Aura** solves this using a multi-agent system powered entirely by **Google Gemini 2.5 Flash**:
1. **The Organizer Dashboard:** A real-time mission control for stadium operators that uses data to predict congestion.
2. **The Fan Companion App:** A multilingual voice-to-voice AI assistant that negotiates with fans in real-time—offering them digital perks (like a free drink) to stay in their seats longer, dynamically relieving pressure on crowded exits.

---

## 🏗️ Architecture & Tech Stack

Aura is a robust, production-ready full-stack monorepo designed for high scalability, type-safety, and strict WCAG AA accessibility compliance.

- **AI Engine:** Google GenAI SDK (`@google/genai`) using `gemini-2.5-flash` for ultra-low latency negotiation.
- **Backend (Render):** A standalone Express.js/Node.js API that interfaces with Gemini and the Firebase Admin SDK.
- **Frontend (Vercel):** Two distinct React 18 apps (Organizer Dashboard & Fan App) built with Vite, TypeScript, Tailwind CSS, and Framer Motion.
- **Database:** Firebase Firestore for real-time synchronization between the AI Backend and the React Frontends.
- **Testing:** Comprehensive unit and integration testing via `Vitest`, `Supertest`, and `@testing-library/react`.

---

## ✨ Core Features & AI Workflow

### 🧠 Gemini as the "Operations Brain"
Instead of writing complex, hard-to-maintain routing algorithms, we feed real-time stadium metrics directly into Gemini's system prompt. Gemini acts as an Emergency Coordinator, Transportation Guide, and Sustainability Optimizer, generating strict JSON schemas that instantly update the UI.

### 🗣️ Multilingual Voice-to-Voice AI
Fans can speak into the Companion App in English, Spanish, Hindi, or French. Gemini instantly transcribes, translates, determines the fan's sentiment (angry, panicked, neutral), and verbally responds in their native language while displaying dynamic UI elements (like QR code rewards).

### 📊 Predictive Heatmap Dashboard
The Organizer Dashboard features a live stadium dashboard. As the AI successfully negotiates with fans to delay their exit, the dashboard visually shifts from Critical to Nominal in real-time via Firestore listeners. Built with highly optimized `React.memo` and `useMemo` rendering.

---

## 📂 Folder Structure

\`\`\`text
Aura-Stadium-Ops/
├── backend/                  # Express.js API hosted on Render
│   ├── src/ai/gemini.ts      # Core Gemini Prompts & Logic
│   ├── src/routes/           # Express API Endpoints
│   └── src/__tests__/        # Supertest Integration Tests
├── dashboard/                # Organizer React App (Vercel)
│   ├── src/features/         # UI Components (StatsGrid, AIInsights)
│   └── src/features/__tests__# Vitest Component Tests
└── fan-app/                  # Mobile Companion App (Vercel)
    ├── src/App.tsx           # Voice AI Interface
    └── src/__tests__/        # Vitest UI Tests
\`\`\`

---

## 🚀 Live Deployment

- **Backend API:** [https://aura-stadium-ops.onrender.com](https://aura-stadium-ops.onrender.com)
- **Organizer Dashboard:** *(Add Vercel URL)*
- **Fan Companion App:** *(Add Vercel URL)*

*(Note: The Dashboard includes a "Launch Fan App" button in the TopNav to seamlessly jump between the two applications).*

---

## 💻 Local Development Setup

To run the entire ecosystem locally on your machine:

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/Durvankur-Joshi/Aura-Stadium-Ops.git
cd Aura-Stadium-Ops
\`\`\`

**2. Start the Backend API (Port 5000)**
\`\`\`bash
cd backend
npm install
# Copy .env.example to .env and add your GEMINI_API_KEY and Firebase Admin credentials
npm run dev
\`\`\`

**3. Start the Organizer Dashboard (Port 3000)**
\`\`\`bash
cd dashboard
npm install
npm run dev
\`\`\`

**4. Start the Fan Companion App (Port 3001)**
\`\`\`bash
cd fan-app
npm install
npm run dev
\`\`\`

---

## 🧪 Testing Methodology

This project maintains high code quality and test coverage. Tests are written using **Vitest** and **React Testing Library**.

To run tests in any of the three directories (`backend`, `dashboard`, `fan-app`), simply run:
\`\`\`bash
npm run test
\`\`\`
- **Backend:** Mocks Firebase Admin and the Gemini SDK to validate JSON response structures and error handling.
- **Frontend:** Employs JSDOM to validate WCAG AA accessibility attributes, aria-labels, and conditional rendering (e.g., Reward QR generation).

---

## 🔮 Future Improvements

1. **WebSockets:** Migrate from Firestore polling to dedicated WebSockets for even lower latency voice-to-voice communication.
2. **Computer Vision:** Integrate Gemini 1.5 Pro's multimodal capabilities to analyze stadium CCTV feeds and proactively adjust the `StatsGrid` density without relying solely on ticketing data.
3. **PWA Offline Support:** Add a Service Worker to the Fan App to cache static stadium maps if mobile networks become congested.

---

<div align="center">
  <p>Built with ❤️ using Google Gemini & Firebase</p>
</div>
