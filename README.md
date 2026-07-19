# Aura Stadium Ops - Enterprise Operations Platform

Aura Stadium Ops is a production-grade, full-stack Monorepo designed to revolutionize stadium operations during mega-events like the FIFA World Cup 2026. It combines an accessible, multi-lingual AI Fan Companion (React/Vite) with an omniscient Stadium Command Dashboard.

## Architecture

The system is built on a scalable, decoupled architecture:
1. **Fan App (Frontend):** A React/Vite progressive web app built for mobile. It uses the Web Speech API and connects directly to the backend for GenAI negotiation.
2. **Command Dashboard (Frontend):** A React/Vite dashboard for stadium operators. It visualizes live Firestore density metrics and triggers AI campaigns.
3. **Aura Backend (API):** An Express.js microservice hosted on Render that securely interfaces with Google Gemini 2.5 Flash for natural language processing and structured data extraction.
4. **Firebase (Data Layer):** Firestore handles real-time syncing of stadium zones, user statuses, and active AI campaigns.

## Folder Structure

```
aura-stadium-ops/
├── fan-app/            # Mobile-first Fan Companion App
│   └── src/
│       ├── components/ # Pure UI components (React.memo optimized)
│       ├── hooks/      # Reusable custom hooks (useSpeechRecognition)
│       ├── services/   # API communication layer
│       ├── constants/  # Magic strings and Enums
│       └── types/      # Strict TypeScript interfaces
├── dashboard/          # Stadium Command Center
│   └── src/
│       ├── features/   # Feature-sliced domain logic
│       ├── components/ # Reusable UI components
│       └── hooks/      # Firestore real-time hooks
└── backend/            # Express.js API
    └── src/
        ├── ai/         # Gemini connection and prompt templates
        ├── routes/     # Express route handlers
        └── types.ts    # Shared data contracts
```

## AI Workflow

Aura doesn't just chat; it negotiates.
1. A fan speaks: "Gate C is too crowded!"
2. The Fan App sends the transcript to the Backend.
3. The Backend constructs a prompt using current stadium context (budget, perks, active campaigns).
4. Gemini 2.5 Flash analyzes the transcript, extracts sentiment, and formulates a response (e.g., offering a free drink to wait 15 minutes).
5. Gemini outputs a strictly typed JSON object conforming to our `NegotiationResult` schema.
6. The Backend parses the JSON, caches it (LRU caching for efficiency), and returns it to the Fan App.

## Prompt Engineering & Polish

The AI is governed by a strict system prompt (`backend/src/ai/prompts.ts`) that enforces:
- **De-escalation:** Immediate, calm instructions for 'panicked' or 'angry' sentiment.
- **Strict Output Formatting:** Enforced JSON schema with nullable fields for perks.
- **Multilingual Support:** Dynamic language switching based on user preference.

## Performance

- **Memoization:** Heavy use of `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary React re-renders.
- **In-Memory Caching:** The backend caches identical Gemini queries (e.g., standard questions like "where is the bathroom") to save API quotas and drastically reduce latency.

## Accessibility (a11y)

The entire platform is WCAG AA compliant:
- Full screen-reader support via `aria-live`, `aria-atomic`, and `role` attributes.
- Semantic HTML (`<main>`, `<header>`, `<nav>`).
- High contrast colors tailored for colorblind users.

## Testing & CI

- **Vitest & React Testing Library:** Unit testing for critical logic.
- **Strict TypeScript:** Zero `any` types permitted.

## Deployment

- **Frontends:** Deployed globally via Vercel Edge network.
- **Backend:** Deployed as a Web Service on Render.

## Future Scope

- Integration with physical stadium turnstiles.
- Live drone-feed video analysis for crowd density.
