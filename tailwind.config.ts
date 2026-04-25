import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
            colors: {
                brand: {
                    50: "#eef2ff",
                    100: "#e0e7ff",
                    200: "#c7d2fe",
                    400: "#818cf8",
                    500: "#6366f1",
                    600: "#4f46e5",
                    700: "#4338ca",
                    800: "#3730a3",
                    900: "#312e81",
                },
                teal: {
                    50: "#f0fdfa",
                    400: "#2dd4bf",
                    500: "#14b8a6",
                    600: "#0d9488",
                },
            },
            animation: {
                "fade-up": "fadeUp 0.5s ease forwards",
                "fade-in": "fadeIn 0.4s ease forwards",
                "slide-in": "slideIn 0.4s ease forwards",
                "pulse-slow": "pulse 3s ease-in-out infinite",
                "bar-grow": "barGrow 0.8s ease forwards",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideIn: {
                    "0%": { opacity: "0", transform: "translateX(-12px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                barGrow: {
                    "0%": { width: "0%" },
                    "100%": { width: "var(--bar-width)" },
                },
            },
            backgroundImage: {
                "grid-pattern":
                    "linear-gradient(to right, rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.05) 1px, transparent 1px)",
            },
            backgroundSize: {
                grid: "40px 40px",
            },
        },
    },
    plugins: [],
};

export default config; 
