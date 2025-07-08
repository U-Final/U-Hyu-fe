/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fill: {
        star: "var(--bg-star)", // SVG 내부 fill 색상
      },
    },
  },
};
