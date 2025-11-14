/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // OnlineLabs Brand Colors
        primary: {
          DEFAULT: '#376eb5',   // OnlineLabs Blue
          dark: '#2d5a94',
          light: '#4A8FDB',
        },
      },
      fontFamily: {
        // Default sans-serif: Metropolis → Inter → System
        sans: [
          'var(--font-metropolis)', 
          'var(--font-inter)', 
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif'
        ],
        // Serif voor headers (H1): Playfair Display
        serif: [
          'var(--font-playfair)', 
          'Georgia', 
          'Times New Roman',
          'serif'
        ],
        // Explicit font utilities
        metropolis: ['var(--font-metropolis)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      // Custom animations voor blob en shine effects
      animation: {
        'breath': 'breath 8s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        // Organic breathing voor blob backgrounds
        breath: {
          '0%, 100%': { 
            transform: 'rotate(-5deg) scale(1)' 
          },
          '50%': { 
            transform: 'rotate(-5deg) scale(1.03)' 
          },
        },
        // Shine sweep effect voor image hovers
        shine: {
          '0%': { 
            transform: 'translateX(-100%)' 
          },
          '100%': { 
            transform: 'translateX(100%)' 
          },
        },
      },
      // Container customization
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),  // Voor prose styling
  ],
};