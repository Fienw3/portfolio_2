/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   class: false, // or 'media' or 'class'
   theme: {

    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '800px'},
      // => @media (max-width: 800px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    
   },
   variants: {
     extend: {},
   },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
 }