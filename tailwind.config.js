/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        alconica: ['Aclonica', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#164F73',
        secondary: '#2A678C',
        text: '#C7CCD9',
        backgroud: '#181818',
      },
      maxWidth: {
        690: '690px',
      },
    },
  },
  plugins: [],
};
