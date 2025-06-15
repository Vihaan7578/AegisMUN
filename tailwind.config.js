/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Mobile-first responsive design
      'mobile': {'max': '767px'},
      'tablet': {'min': '768px', 'max': '1023px'},
      'desktop': {'min': '1024px'},
      // Landscape and portrait orientations
      'landscape': {'raw': '(orientation: landscape)'},
      'portrait': {'raw': '(orientation: portrait)'},
      // High DPI screens
      'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
    },
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
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
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