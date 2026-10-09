/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./public/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkBlue: '#002B49',
          cream: '#FFF5E4',
          red: '#C21525',
          darkRed: '#6B0000',
          lightBlue: '#679BBF',
        }
      }
    },
  },
  plugins: [],
}
