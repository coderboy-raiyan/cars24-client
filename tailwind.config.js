/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "btn-base": "#ef6e0b",
        "btn-base-hover": "#d5640e",
        primary: "#ef6e0b",
      },
    },
  },

  plugins: [daisyui],
};
