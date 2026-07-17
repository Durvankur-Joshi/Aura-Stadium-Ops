<div align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/aura-stadium-ops.appspot.com/o/aura-logo.png?alt=media" width="120" alt="Aura Logo" />
  <h1>Aura Stadium Ops</h1>
  <p><b>Next-Generation Predictive Event Operations & AI Fan Companion</b></p>
  <p><i>Built for the Google Developer Challenge</i></p>
</div>

---

## 🏆 The Vision

Managing massive stadium events (like the FIFA World Cup) involves critical crowd control challenges, especially during egress (exit). Bottlenecks at stadium gates lead to poor fan experiences and serious safety hazards.

**Aura** solves this using a two-pronged approach powered entirely by **Google Gemini 2.5 Flash**:
1. **The Organizer Dashboard:** A real-time mission control for stadium operators that uses AI to predict congestion and automatically deploy interventions.
2. **The Fan Companion App:** A multilingual voice-to-voice AI assistant that negotiates with fans in real-time—offering them digital perks (like a free drink) to stay in their seats longer, dynamically relieving pressure on crowded exits.

---

## ✨ Key Features

### 🧠 Gemini as the "Operations Brain"
Instead of writing complex, hard-to-maintain routing algorithms, we feed real-time stadium metrics directly into Gemini's system prompt. Gemini acts as an Emergency Coordinator, Transportation Guide, and Sustainability Optimizer, generating JSON responses that instantly update the UI.

### 🗣️ Multilingual Voice-to-Voice AI
Fans can speak into the Companion App in English, Spanish, Hindi, or French. Gemini instantly transcribes, translates, determines the fan's sentiment (angry, panicked, neutral), and verbally responds in their native language while displaying dynamic UI elements (like QR code rewards).

### 📊 Predictive Heatmap Dashboard
The Organizer Dashboard features a live stadium heatmap. As the AI successfully negotiates with fans to delay their exit, the dashboard visually shifts from Red (Critical) to Green (Nominal) in real-time via Firestore listeners.

---

## 🏗️ Architecture & Tech Stack

Aura is a robust, production-ready full-stack monorepo:

- **AI Engine:** Google GenAI SDK (`@google/genai`) using `gemini-2.5-flash` for ultra-low latency negotiation.
- **Backend (Render):** A standalone Express.js/Node.js API that interfaces with Gemini and the Firebase Admin SDK.
- **Frontend (Vercel):** Two distinct React 18 apps (Organizer Dashboard & Fan App) built with Vite, TypeScript, Tailwind CSS, and Framer Motion.
- **Database:** Firebase Firestore for real-time synchronization between the AI Backend and the React Frontends.

---

## 🚀 Live Demo

- **Backend API:** `https://aura-stadium-ops.onrender.com`
- **Frontend URLs:** *(Add your Vercel URLs here)*

---

## 💻 Local Development Setup

To run the entire ecosystem locally on your machine:

**1. Clone the repository**
```bash
git clone https://github.com/Durvankur-Joshi/Aura-Stadium-Ops.git
cd Aura-Stadium-Ops
```

**2. Start the Backend API (Port 5000)**
```bash
cd backend
npm install
# Ensure you copy .env.example to .env and add your GEMINI_API_KEY and Firebase Admin credentials
npm run dev
```

**3. Start the Organizer Dashboard (Port 3000)**
```bash
cd dashboard
npm install
npm run dev
```

**4. Start the Fan Companion App (Port 3001)**
```bash
cd fan-app
npm install
npm run dev
```

---

<div align="center">
  <p>Built with ❤️ using Google Gemini & Firebase</p>
</div>
