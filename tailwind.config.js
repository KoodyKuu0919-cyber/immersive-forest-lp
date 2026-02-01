/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'forest': {
                    50: '#f2fcf5',
                    100: '#e1f8e8',
                    200: '#c3ecd2',
                    300: '#94dbb3',
                    400: '#5dc090',
                    500: '#39a473',
                    600: '#28835b',
                    700: '#23694b',
                    800: '#1f533e',
                    900: '#1a4435',
                    950: '#0d251d',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
