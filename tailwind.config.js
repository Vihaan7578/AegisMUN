/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aegis-black': '#000000',
        'aegis-white': '#FFFFFF',
        'aegis-brown': '#8A4B38',
        'aegis-burgundy': '#811A29',
        'aegis-dark-gray': '#1E1E1E',
        'aegis-off-white': '#F5F5F5',
        'aegis-highlight': '#FFD37E',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'Roboto', 'Poppins', 'sans-serif'],
        'bebas': ['Bebas Neue', 'cursive'],
      },
      fontSize: {
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px -10px #FFD37E' },
          'to': { boxShadow: '0 0 20px -2px #FFD37E' },
        },
      },
    },
  },
  plugins: [],
} 