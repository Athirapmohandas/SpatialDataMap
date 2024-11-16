/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      screens: {
        vsm: "360px",
        sm: "530px",
        xsm: "656px",
        md: "768px",
        xmd: "773px",
        slg: "992px",
        lg: "1024px",
        xl: "1280px",
        xxl:"	1600px",
        xxxl: "1800px"
      },
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
