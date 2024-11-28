import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      tv: { max: "1920px" },
      mac: { max: "1440px" },
      desktop: { max: "1280px" },
      laptop: { max: "1024px" },
      tablet_md: { max: "900px" },
      tablet: { max: "768px" },
      small: { max: "640px" },
      mobile: { max: "430px" },
      final: { max: "375px" }
    },
    extend: {
      colors: {
        primary: "#CAFC01",
        verified: "#05ABFF",
        success: "#00AC4F",
        golden: "#FCC501",
        warning: "#FFCE00",
        error: "#FF5722",
        danger: "#FF0505",
        favorite: "#E91E63",
        main: {
          100: "#1B1B1B",
          200: "#2B2B2B",
          300: "#3B3B3B",
          400: "#CCCCCC",
          900: "#858585 "
        },
        white: {
          100: "#FFFFFF10",
          200: "#FFFFFF20",
          300: "#FFFFFF30",
          400: "#FFFFFF40",
          500: "#FFFFFF50",
          600: "#FFFFFF60",
          700: "#FFFFFF70",
          800: "#FFFFFF80",
          900: "#FFFFFF90",
          DEFAULT: "#FFFFFF"
        },
        black: {
          100: "#00000010",
          200: "#00000020",
          300: "#00000030",
          400: "#00000040",
          500: "#00000050",
          600: "#00000060",
          700: "#00000070",
          800: "#00000080",
          900: "#00000090",
          DEFAULT: "#000000"
        }
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
        space_mono: ["var(--font-space-mono)", ...defaultTheme.fontFamily.sans],
        space_grotesk: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.sans]
      },
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
        900: "900"
      },
      backgroundImage: {
        primary_gradient_tab: "linear-gradient(101deg, #FCC501 -5.36%, #ABFF68 81.92%)",
        primary_gradient_text: "linear-gradient(97deg, #FCC501 8.85%, #ABFF68 97.33%)",

        primary_gradient_button:
          "linear-gradient(274deg, #000 20.77%, rgba(120, 120, 120, 0.53) 99.65%, rgba(255, 255, 255, 0.00) 100.9%)",
        primary_gradient_mask:
          "linear-gradient(266deg, #000 9.07%, rgba(104, 104, 104, 0.16) 61.8%, rgba(255, 255, 255, 0.00) 87.59%)",
        decoration: "url('/img/bg-decoration.png')"
      },
      borderRadius: {
        full: "9999px"
      }
    }
  },
  plugins: []
};
export default config;
