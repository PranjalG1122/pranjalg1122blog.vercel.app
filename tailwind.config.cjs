/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        desktop: "72rem",
        md: "768px",
        sm: "640px",
        lg: "1024px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
