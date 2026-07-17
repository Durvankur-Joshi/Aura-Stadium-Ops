# Aura Backend (Express)

This is the Express.js backend for the Aura Stadium Ops platform, designed to be deployed on Render. It replaces the Firebase Cloud Functions requirement so you can use the free Spark plan on Firebase while still calling external APIs (Gemini).

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your Firebase Admin credentials and Gemini API Key.
   
3. Run the development server:
   ```bash
   npm run dev
   ```

## Render Deployment Guide

1. Push this `backend/` folder to a GitHub repository.
2. Go to [Render.com](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the following build and run commands:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. **Environment Variables on Render:**
   You MUST add the following environment variables in the Render dashboard:
   
   - `FIREBASE_PROJECT_ID` = your-project-id
   - `FIREBASE_CLIENT_EMAIL` = your-firebase-admin-email
   - `FIREBASE_PRIVATE_KEY` = `"-----BEGIN PRIVATE KEY-----\nYourKeyHere...\n-----END PRIVATE KEY-----\n"`
   - `GEMINI_API_KEY` = your-gemini-key

> **CRITICAL FIX FOR RENDER PRIVATE KEY:** 
> Render's environment variable parser sometimes breaks the `\n` characters in the Firebase private key. 
> To fix this, wrap your entire private key string in double quotes (`"`) when pasting it into the Render dashboard, just like the example above. The code in `src/firebase.ts` is explicitly written to parse this and fix the newlines!

## Updating the Frontend (Fan App / Dashboard)
In your Vercel deployment for the Fan App and Dashboard, you just need to add the environment variable pointing to your new Render URL:
`VITE_BACKEND_URL` = `https://your-render-app-name.onrender.com`
