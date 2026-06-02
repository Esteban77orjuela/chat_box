/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#1364ff',
                    dark: '#010823',
                    light: '#ecf4ff',
                    card: 'rgba(13, 21, 54, 0.4)',
                },
                chat: {
                    dark: '#010823',
                    sidebar: '#020c2e',
                    bubble: {
                        user: '#1364ff',
                        ai: 'rgba(13, 21, 54, 0.6)'
                    }
                }
            },
            fontFamily: {
                kanit: ['Kanit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
