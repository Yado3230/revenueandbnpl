/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#01ADED",

          secondary: "#F000B8",

          accent: "#37CDBE",

          neutral: "#3D4451",

          "base-100": "#FFFFFF",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",

          "back-200": "#F2F2F2",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
