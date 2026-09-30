/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Vypax base surfaces — deep, neutral, editorial */
        ink: {
          950: '#07080B',
          900: '#0D0F14',
          850: '#12151C',
          800: '#171B24',
          700: '#222836',
          600: '#313A4C'
        },
        /* Primary accent — acid lime */
        lime: {
          300: '#DBFF7A',
          400: '#C6F24E',
          500: '#A9DC2E',
          600: '#8CB91F'
        },
        /* Secondary accent — warm amber */
        amber: {
          400: '#FFC14D',
          500: '#FFB020',
          600: '#E08F00'
        },
        /* Tertiary accent — coral */
        coral: {
          400: '#FF7A5C',
          500: '#FF5A3C'
        },
        /* Text ramp */
        mist: {
          100: '#F4F6F8',
          200: '#E2E6EC',
          300: '#C3CAD6',
          400: '#9BA3AF',
          500: '#6F7787'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4.75rem)', { lineHeight: '1.03', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4.4vw, 3.4rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.6rem, 3vw, 2.4rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }]
      },
      maxWidth: {
        page: '1280px',
        prose: '68ch'
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '13': '3.25rem',
        '18': '4.5rem'
      },
      height: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '13': '3.25rem',
        '18': '4.5rem'
      },
      width: {
        '4.5': '1.125rem',
        '5.5': '1.375rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 18px 50px -22px rgba(0,0,0,0.9)',
        'lime-glow': '0 0 0 1px rgba(198,242,78,0.35), 0 18px 45px -18px rgba(198,242,78,0.4)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'marquee-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'pulse-ring': {
          '0%': { opacity: '0.7', transform: 'scale(0.85)' },
          '70%': { opacity: '0', transform: 'scale(1.7)' },
          '100%': { opacity: '0', transform: 'scale(1.7)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'marquee-x': 'marquee-x 32s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24, 0, 0.38, 1) infinite'
      }
    }
  },
  plugins: []
}
