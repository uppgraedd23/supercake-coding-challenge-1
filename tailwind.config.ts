import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1369D9",
          hover: "#0F5BC5",
          active: "#0D4FA8",
        },
        text: {
          DEFAULT: "#121D2C",
          secondary: "#64748B",
          tertiary: "#94A3B8",
        },
        card: {
          DEFAULT: "#F5F7FA",
        },
        border: {
          DEFAULT: "#E0E8F0",
          focus: "#1369D9",
          subtle: "#D8E1EA",
        },
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8FAFC",
          active: "#E8EBF0",
        },
      },
      borderRadius: {
        input: "28px",
        popover: "12px",
        button: "8px",
        pill: "20px",
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "30px" }],
        "2xl": ["24px", { lineHeight: "32px", fontWeight: "700" }],
      },
      spacing: {
        "4.5": "18px",
      },
      boxShadow: {
        popover: "0 4px 12px rgba(0, 0, 0, 0.1)",
        card: "0 1px 3px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
} satisfies Config;
