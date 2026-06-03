export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#2a2a2a'
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#e1c668'
        },
        accent: {
          green: '#27ae60'
        },
        light: '#f8f9fa'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
