import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#10b981",
                    600: "#059669",
                    700: "#047857",
                    800: "#064e3b",
                    900: "#022c22",
                },
                accent: "#d97706",
                success: "#10b981",
                warning: "#f59e0b",
                error: "#ef4444",
                info: "#3b82f6",
            },
            fontFamily: {
                sans: [
                    "Outfit",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "sans-serif",
                ],
            },
            animation: {
                "fade-in": "fadeIn 0.3s ease-out",
                "slide-in": "slideIn 0.3s ease-out",
                "bounce-slow": "bounce 3s infinite",
                float: "float 6s ease-in-out infinite",
                "float-delayed": "float 6s ease-in-out 2s infinite",
                "float-slow": "float 8s ease-in-out infinite",
                "pulse-slow": "pulse 4s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideIn: {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
