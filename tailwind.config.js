/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        primary: '#006493',
        primaryLight: '#c8eafa',
        dark: '#595959',
        darkLight: '#757575',
        grey: '#EEEEEE',
        white: '#ffffff',
        green: '#20B038',
        red: '#BD081C',
        yellow: '#FBBC05',
        abu: {
          100: '#D9D9D9',
        },
        transparent: 'transparent',
        shadowNone:'none'
      },
      fontFamily: {
        primary: 'Roboto, sans-serif',
        secondary: 'Poppins, sans-serif',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-children'),
  ],
}