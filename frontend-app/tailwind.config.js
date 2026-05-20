/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'soft-yellow': '#FFF3CD',
        'pastel-pink': '#FFE0E6',
        lavender: '#E8E0FF',
        'mint-green': '#D4F5E9',
        'light-blue': '#DBEAFE',
        dark: '#1A1A2E',
        'text-primary': '#1A1A2E',
        'text-secondary': '#6B7280',
        'accent-green': '#34D399',
        'accent-red': '#F87171',
        'accent-amber': '#FBBF24',
        'accent-purple': '#A78BFA',
        'nav-dark': 'rgba(26, 26, 46, 0.92)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.06)',
        'soft-lg': '0 8px 40px rgba(0,0,0,0.08)',
        'neu': '6px 6px 16px rgba(0,0,0,0.06), -6px -6px 16px rgba(255,255,255,0.8)',
        'neu-sm': '3px 3px 8px rgba(0,0,0,0.05), -3px -3px 8px rgba(255,255,255,0.7)',
        'float': '0 12px 48px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
}
