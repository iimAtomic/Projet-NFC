/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'background': '#000000',
        'primary-text': '#FFFFFF',
        'accent': '#8A2BE2',
        'accent-light': '#A020F0',
        'accent-dark': '#6B1A8B',
        'secondary': '#FFD700',
        'gray-900': '#0F0F0F',
        'gray-800': '#1A1A1A',
        'gray-700': '#2D2D2D',
        'gray-600': '#404040',
        'gray-500': '#666666',
        'gray-400': '#999999',
        'gray-300': '#CCCCCC',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'accent': '0 0 20px rgba(138, 43, 226, 0.3)',
        'accent-lg': '0 0 40px rgba(138, 43, 226, 0.4)',
        'glow': '0 0 30px rgba(138, 43, 226, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-accent': 'pulseAccent 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseAccent: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(138, 43, 226, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
