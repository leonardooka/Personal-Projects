/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': "url('./images/bg6.jpg')",
        'bg2': "url('./images/bg10.jpg')",
        'bg3': "url('./images/bg5-1.jpg')",
        'bg4': "url('./images/bg8-1.jpg')",
        'bg5': "url('./images/bg9.jpg')",
        'bg6': "url('./images/bg14-3.jpg')",
        'bg7': "url('./images/bg15-1.jpg')",
        'bg8': "url('./images/bg14-2.jpg')",
      }
    },
  },
  plugins: [],
}

