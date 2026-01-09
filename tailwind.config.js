/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gson-black': '#0D0D0D',   // Fundo principal (Futurista)
        'gson-yellow': '#F2E30C',  // Amarelo vibrante (Destaque principal)
        'gson-gold': '#F2B90C',    // Dourado (CTAs e ícones)
        'gson-beige': '#F2E1AE',   // Bege claro (Textos de destaque ou bordas)
        'gson-sand': '#F2DCC9',    // Tom areia (Textos secundários/suaves)
      },
    },
  },
  plugins: [],
}