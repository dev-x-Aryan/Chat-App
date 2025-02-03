/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        floating: "floating 4s infinite ease-in-out",
        floatingReverse: "floatingReverse 4s infinite ease-in-out",
        tileFloating: "tileFloating 8s infinite ease-in-out",
        tileFloatingReverse: "tileFloatingReverse 8s infinite ease-in-out",
      },
      keyframes: {
        floating: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
          "100%": { transform: "translateY(0px) translateX(0px)" },
        },
        floatingReverse: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(20px) translateX(-10px)" },
          "100%": { transform: "translateY(0px) translateX(0px)" },
        },
        tileFloating: {
          "0%" :{ transform: "translateY(0px) rotate(0deg)" },
          "50%" :{ transform: "translateY(-30px) rotate(5deg)" },
          "100%" :{ transform: "translateY(0px) rotate(0deg)" },
        },
        tileFloatingReverse: {
          "0%" :{ transform: "translateY(0px) rotate(0deg)" },
          "50%" :{ transform: "translateY(30px) rotate(-5deg)" },
          "100%" :{ transform: "translateY(0px) rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
}