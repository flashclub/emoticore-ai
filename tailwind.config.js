const colors = require('tailwindcss/colors');

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        blue: colors.blue,
        pink: colors.pink,
        yellow: colors.yellow,
        purple: colors.purple,
        green: colors.green,
        red: colors.red,
        gray: colors.gray,
        gold: colors.amber,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '0.2' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'radar-beam': {
          '0%': {
            transform: 'rotate(0deg)',
            background: 'conic-gradient(from 0deg, transparent 0deg, currentColor 20deg, transparent 40deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
            background: 'conic-gradient(from 360deg, transparent 0deg, currentColor 20deg, transparent 40deg)',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "spin-reverse": "spin 4s linear infinite reverse",
        "ripple": "ripple 3s linear infinite",
        'radar-beam': 'radar-beam 4s linear infinite',
      },
      transitionDelay: {
        '1000': '1000ms',
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
  safelist: [
    {
      pattern: /(from|to|via|bg)-(blue|pink|yellow|purple|green|red|gray|gold)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /bg-gradient-(to|from)-(t|tr|r|br|b|bl|l|tl)/,
    },
    {
      pattern: /opacity-[0-9]+/,
    },
    'bg-opacity-20',
    'bg-gray-100',
  ],
};
export default config;
