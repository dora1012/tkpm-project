/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      
      colors: {
          'white': '#FFFFFF',
          'black': '#242424',
          'grey': '#F3F3F3',
          'dark-grey': '#5A5A5A',
          'red': '#FF4E4E',
          'transparent': 'transparent',
          'twitter': '#1DA1F2',
          'purple': '#8B46FF',
          'teal': '#28DBD0',
          'dark-cyan': '#008B8B',
          'smoke': '#848884',
          'coral-pink': '#F88379',
          'flamingo': '#FC8EAC',
          'crimson': '#E32636',
          'salmon': '#FF8C69',
          'coral-pink1': '#f87979'
      },

      fontSize: {
          'sm': '12px',
          'base': '14px',
          'xl': '16px',
          '2xl': '20px',
          '3xl': '28px',
          '4xl': '38px',
          '5xl': '50px',
      },

      extend: {
          fontFamily: {
            inter: ["'Inter'", "sans-serif"],
            gelasio: ["'Gelasio'", "serif"]
          },
      },

  },
  plugins: [],
};