/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                ieee: {
                    orange: '#FF6B35',
                    white: '#FFFFFF',
                    dark: '#2C2C2C', // Restored Dark Base
                    'dark-card': '#3D3D3D', // Neutral Dark Card
                    light: '#F5F5F5',
                }
            }
        },
    },
    plugins: [],
}
