import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {},
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        lightBG: "#FFFFFF",
        darkBackground: "#111827",
        darkBackgroundFront: "rgb(31 41 55 / var(--tw-bg-opacity))",
        navDarkBG: "#212121",
        purpleBackground: "#f8f2f9"
      },
      colors: {
        detail: "#8E44AD",
        primary: "#2ECC71",
        secondary: "#EEEEEE",
        darkBorders: "#242424"
      },
      textColor: {
        lightHline: "#333333",
        purpleTitles: "#6a4972",
        darkHline: "#CCCCCC",
        darkText: "#A3A3A3",
      },
    },
  },
  plugins: [],
};
export default config;
