import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-inter-tight)", "Inter Tight", "system-ui", "sans-serif"],
        "inter-tight-bold": ["var(--font-inter-tight)", "Inter Tight", "system-ui", "sans-serif"], // Added for Inter Tight Bold
      },
      fontWeight: {
        light: "300", // Inter Light - default body text
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800", // Inter Tight Bold - headings
        black: "900",
      },
      colors: {
        // Brand colors from the palette with specific usage
        brand: {
          "burnt-sienna": "#E97F52", // For faucets.beta text
          pear: "#CADE42",
          "spring-wood": "#F7F6F1", // Main background
          "snow-drift": "#F7F9F8", // Info cards background
          night: "#0B1713", // Buttons and primary text
        },
        background: "hsl(var(--background))", // Spring Wood
        foreground: "hsl(var(--foreground))", // Night
        card: {
          DEFAULT: "hsl(var(--card))", // Snow Drift
          foreground: "hsl(var(--card-foreground))", // Night
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // Snow Drift
          foreground: "hsl(var(--popover-foreground))", // Night
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // Night for buttons
          foreground: "hsl(var(--primary-foreground))", // Spring Wood
          50: "#f0f9ff",
          500: "#0B1713", // Night
          600: "#0A1511",
          700: "#09130F", // Darker Night for hover
          900: "#06100C",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Snow Drift
          foreground: "hsl(var(--secondary-foreground))", // Night
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Snow Drift
          foreground: "hsl(var(--muted-foreground))", // Night
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Burnt Sienna
          foreground: "hsl(var(--accent-foreground))", // Spring Wood
        },
        destructive: {
          DEFAULT: "0 84.2% 60.2%",
          foreground: "0 0% 98%",
        },
        border: "hsl(var(--border))", // Snow Drift
        input: "hsl(var(--input))", // Snow Drift
        ring: "hsl(var(--ring))", // Night
        chart: {
          "1": "hsl(var(--chart-1))", // Burnt Sienna
          "2": "hsl(var(--chart-2))", // Pear
          "3": "hsl(var(--chart-3))", // Night
          "4": "hsl(var(--chart-4))", // Spring Wood
          "5": "hsl(var(--chart-5))", // Snow Drift
        },
      },
      borderRadius: {
        lg: "0px", // Removed rounded corners
        md: "0px", // Removed rounded corners
        sm: "0px", // Removed rounded corners
        xs: "4px", // Very slightly rounded
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "slide-in-left-fade": {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "pop-in-fade": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-left-fade-staggered": "slide-in-left-fade 0.6s ease-out forwards",
        "pop-in-fade": "pop-in-fade 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
}
export default config
