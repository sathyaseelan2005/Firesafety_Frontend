export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'kanex-red': '#D32F2F',    // Deep Red
        'kanex-orange': '#F57C00', // Orange
        'kanex-yellow': '#FFC107', // Vivid Yellow
        'theme-bg': '#FFFFFF',     // White Background
        'theme-surface': '#FFFFFF', // White Surface (was Dark)
        'theme-surface-hover': '#e5e7eb', // Gray-200 hover for contrast
        'theme-accent': '#C62828', // Strong Red Accent
        'theme-text': '#000000',   // Black text for Yellow Background
        'theme-text-on-surface': '#000000', // Black text for White Surface (was White)
        'theme-text-muted': '#4B5563', // Grey for secondary text
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
