/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#FFFFFF',
          900: '#F5F6F7',
          850: '#F8F9FA',
          800: '#FFFFFF',
          700: '#E1E4E8',
          600: '#D1D5DB',
          500: '#E1E4E8',
        },
        steel: {
          50: '#5F6368',
          100: '#1A1A1A',
          200: '#252525',
          300: '#5F6368',
          400: '#7A7F85',
          500: '#9AA0A6',
          600: '#B5BAC1',
          700: '#E1E4E8',
          800: '#E1E4E8',
          900: '#D1D5DB',
        },
        pro: {
          red: '#E52B25',
          'red-dark': '#C5221D',
          'red-light': '#F24236',
          blue: '#0b9bd8',
          'blue-dark': '#0a7ab3',
          'blue-light': '#22c5ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        ultra: '0.3em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
        'card-lg': '0 4px 10px -2px rgba(16,24,40,0.06), 0 10px 24px -8px rgba(16,24,40,0.08)',
        premium: '0 2px 8px rgba(16,24,40,0.04), 0 20px 40px -20px rgba(16,24,40,0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'wave-bar': {
          '0%, 100%': { transform: 'scaleY(0.25)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'wave-bar': 'wave-bar 1.2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.2,1) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'scroll-x': 'scroll-x 40s linear infinite',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(26,26,26,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.04) 1px, transparent 1px)',
        'radial-spot':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(229,43,37,0.08), transparent 70%)',
        'radial-blue':
          'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(11,155,216,0.08), transparent 70%)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
    },
  },
  plugins: [],
};
