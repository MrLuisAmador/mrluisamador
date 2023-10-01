/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#444",
        "light-grey": "#f7f7f7",
        "theme-red": "#cf4646",
        "linkedin-blue": "#287bbc",
        "twitter-blue": "#4099ff",
        "github-orange": "#f1ad72",
        "skills-grey": "#eee",
        "projects-orange": "#9c4002",
        "contact-blue": "#074e68",
        "text-grey": "#313131"
      },
      fontFamily: {
        "title-font": ['var(--title-font)'],
        "text-font": ['var(--text-font)'],
      },
      keyframes: {
        blink: {
          "0%": {opacity: 0},
          "49%": {opacity: 0},
          "50%": {opacity: 1},
        },
      },
      animation: {
        'blink': 'blink 1s infinite;',
      },
    },
  },
  plugins: [],
}

