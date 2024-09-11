import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'var(--background)',
                green: {
                    dark: '#177362',
                    DEFAULT: '#1fbf92',
                    light: '#8fd9c4',
                },
                blue: {
                    dark: '#1974A6',
                    DEFAULT: '#1da1f2',
                    light: '#50b4f2',
                },
                red: {
                    dark: '#B63838',
                    DEFAULT: '#F24B4B',
                    light: '#FFE6E6',
                },
                grey: {
                    darkest: '#0A0C11',
                    darker: '#11141e',
                    dark: '#343840',
                    light: '#919397',
                    lighter: '#D9D9D9',
                    lightest: '#FAFAFA',
                },
				white: '#FFFFFF',
				black: '#000000'
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;