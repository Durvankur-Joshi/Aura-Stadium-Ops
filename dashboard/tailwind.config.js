/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          dark: '#0B0F19',
          card: '#1A1F2C',
          primary: '#3B82F6',
          accent: '#8B5CF6',
          danger: '#EF4444',
          warning: '#F59E0B',
          success: '#10B981'
        }
      }
    },
  },
  plugins: [],
}
