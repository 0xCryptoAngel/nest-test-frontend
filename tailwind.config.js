/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#F6F6F6",
        headerColor: "#202F44",
        secondColor: "#30a4e3",
        buttonBg: "#6ccaf5",
        menuTxt: "#828282",
        tableBg: "#39629D",
        tableBg20: "rgba(57, 98, 157, 0.2)",
        buttonColor: "#B2C0FF",
        delBtnBg: "#FFE8E8",
        delBtn: "#ED0000",
        statusColor: "#FFA940",
        statusBg: "rgba(255,169,64, 0.2)",
        progressBar1: "#25C3D0",
        progressBar2: "#FFA940",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.3s ease-out",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    require("tw-elements-react/dist/plugin.cjs"),
  ],
};
