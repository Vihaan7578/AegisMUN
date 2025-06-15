/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aegis-black': 'var(--clr-aegis-black)',
        'aegis-white': 'var(--clr-aegis-white)',
        'aegis-brown': 'var(--clr-aegis-brown)',
        'aegis-burgundy': 'var(--clr-aegis-burgundy)',
        'aegis-dark-gray': 'var(--clr-aegis-dark-gray)',
        'aegis-off-white': 'var(--clr-aegis-off-white)',
        'aegis-highlight': 'var(--clr-aegis-highlight)',
      },
      fontFamily: {
        // Primary font for body text and general content
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Secondary font for headings and important text
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        // Accent font for special elements (hero text, logos)
        'display': ['Bebas Neue', 'Impact', 'Arial Black', 'sans-serif'],
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