/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sky': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'mint': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'business': {
          blue: '#60A5FA',
          mint: '#6EE7B7',
          gradient: {
            start: '#60A5FA',
            mid: '#4ADE80',
            end: '#6EE7B7',
          }
        },
        'accent-red': '#dc2626',
        'accent-red-dark': '#b91c1c',
        'accent-green': '#10b981',
        'text-light': '#F9FAFB',
        'text-muted': '#6B7280',
        'text-dark': '#1F2937',
        'border-subtle': '#E5E7EB',
      },
      backgroundImage: {
        'business-gradient': 'linear-gradient(135deg, #60A5FA 0%, #4ADE80 50%, #6EE7B7 100%)',
        'business-gradient-soft': 'linear-gradient(135deg, rgba(96, 165, 250, 0.3) 0%, rgba(74, 222, 128, 0.3) 50%, rgba(110, 231, 183, 0.3) 100%)',
        'light-gradient': 'linear-gradient(to bottom, #ffffff, #f0f9ff)',
        'frosted-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5))',
        'frosted-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 12px 48px rgba(0, 0, 0, 0.10)',
        'gradient-glow': '0 4px 24px rgba(96, 165, 250, 0.15), 0 8px 48px rgba(110, 231, 183, 0.10)',
        'gradient-glow-lg': '0 8px 32px rgba(96, 165, 250, 0.20), 0 12px 64px rgba(110, 231, 183, 0.15)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.02)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in',
        'gentle-float': 'gentle-float 4s ease-in-out infinite',
        'soft-pulse': 'soft-pulse 3s ease-in-out infinite',
        'bubble-float': 'bubble-float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'tilt-hover': 'tilt-hover 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'lift-hover': 'lift-hover 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
      },
      keyframes: {
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.02)', opacity: 0.95 },
        },
        'bubble-float': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 0 },
          '10%': { opacity: 0.6 },
          '90%': { opacity: 0.6 },
          '100%': { transform: 'translateY(-100px) scale(1.2)', opacity: 0 },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'tilt-hover': {
          '0%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateX(2deg) rotateY(3deg)' },
        },
        'lift-hover': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      fontFamily: {
        'title': ['HYYaKuHeiW', 'Noto Sans JP', 'sans-serif'],
        'subtitle': ['Adobe Heiti Std', 'Hiragino Sans', 'sans-serif'],
        'sans': ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'sans-serif'],
        'body': ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
      spacing: {
        '7.5': '30px',
      },
      borderRadius: {
        'modern-xl': '20px',
        'modern-lg': '16px',
        'modern-md': '12px',
      },
    },
  },
  plugins: [],
};
