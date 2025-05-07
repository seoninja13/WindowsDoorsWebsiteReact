/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'ww-blue': '#004b8d', // Window World primary blue
        'ww-light-blue': '#0077c8', // Window World light blue
        'ww-red': '#e31837', // Window World red
        'ww-dark-blue': '#003366', // Window World dark blue (for hover states)
        'ww-light-gray': '#f5f5f5', // Light gray background
        'ww-gray': '#e0e0e0', // Medium gray
        'ww-dark-gray': '#333333', // Dark gray for text
        'ww-footer-bg': '#1a1a1a', // Footer background color
        'ww-green': '#00a651', // Window World green
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'nav': '16px',
        'heading-xl': '42px',
        'heading-lg': '36px',
        'heading-md': '28px',
        'heading-sm': '22px',
        'body-lg': '18px',
        'body': '16px',
        'body-sm': '14px',
      },
      borderRadius: {
        'ww': '4px', // Standard border radius
        'ww-lg': '8px', // Larger border radius for cards
      },
      boxShadow: {
        'ww': '0 2px 4px rgba(0, 0, 0, 0.1)', // Standard shadow
        'ww-lg': '0 4px 8px rgba(0, 0, 0, 0.15)', // Larger shadow for cards
        'ww-xl': '0 8px 16px rgba(0, 0, 0, 0.2)', // Extra large shadow for modals
      },
      spacing: {
        'ww-section': '80px', // Standard section spacing
        'ww-container': '1200px', // Max container width
      },
      maxWidth: {
        'ww-container': '1200px', // Custom Window World container width
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [],
}
