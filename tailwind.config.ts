import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101722",
        "ink-soft": "#263244",
        mist: "#edf3f8",
        paper: "#fbfcff",
        line: "#d8e2ec",
        trust: "#1764d8",
        "trust-dark": "#0f459a",
        amber: "#b86b16",
        green: "#0e8b63",
      },
      boxShadow: {
        lift: "0 18px 60px rgba(16, 23, 34, 0.14)",
        crisp: "0 1px 0 rgba(16, 23, 34, 0.08), 0 14px 34px rgba(16, 23, 34, 0.08)",
      },
      fontFamily: {
        display: [
          "Noto Serif SC",
          "Source Han Serif SC",
          "Songti SC",
          "STSong",
          "serif",
        ],
        sans: [
          "Aptos",
          "HarmonyOS Sans SC",
          "MiSans",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
