// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Inclut les fichiers dans le dossier pages
    './components/**/*.{js,ts,jsx,tsx}', // Inclut les fichiers dans le dossier components
    './public/**/*.html', // Inclut les fichiers HTML dans le dossier public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
