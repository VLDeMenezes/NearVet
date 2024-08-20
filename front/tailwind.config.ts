import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
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
        ligthBG: "#FFF1DB",
        darkBG: "#333333",
      },
      colors: {
        detail: "#8E44AD",
        primary: "#2ECC71",
        secondary: "#EEEEEE",
      },
      textColor: {
        ligthHline: "#333333",
        ligthText: "#686868",
        darkHline: "#CCCCCC",
        darkText: "#A3A3A3",
      },
    },
  },
  plugins: [],
};
export default config;
