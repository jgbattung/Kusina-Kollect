import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-500": '#ffa726',
        "primary-800": '#BD7B1B',
        "secondary-500": '#ffb74d',
        "accent-500": '#ffcc80',
        "complementary-500": '#003366',
        "complementary-800": '#012140',
        "light-200": '#f7f7f7',
        "supplementary-200": '#E7E8D8',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      minWidth: {
        '60': '240px',
        '70': '280px',
        '75': '300px',
        '80': '320px',
        '90': '360px',
        '100': '400px',
        '105': '420px',
        '115': '460px',
        '120': '480px',
        '130': '520px',
        '160': '640px',
      },
      maxWidth:{
        '30': '120px',
        '40': '160px',
        '60': '240px',
        '70': '280px',
        '75': '300px',
        '80': '320px',
        '90': '360px',
        '100': '400px',
        '105': '420px',
        '115': '460px',
        '120': '480px',
        '130': '520px',
        '160': '640px',
      },
      maxHeight: {
        '70': '280px',
        '75': '300px',
        '80': '320px',
        '90': '360px',
        '100': '400px',
        '105': '420px',
        '115': '460px',
        '120': '480px',
        '130': '520px',
        '160': '640px',
      },
      minHeight: {
        '60': '240px',
        '70': '280px',
        '75': '300px',
        '80': '320px',
        '90': '360px',
        '100': '400px',
        '105': '420px',
        '115': '460px',
        '120': '480px',
        '130': '520px',
        '160': '640px',
      },
      width: {
        '100': '400px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config