const { resolve } = require('path')
const { defineConfig } = require('vite')

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                teams: resolve(__dirname, 'teams/index.html'),
            },
        },
    },
    base: "/Failygames/",
    resolve: {
        alias: {
            '@data': resolve(__dirname, 'src/data'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@scripts': resolve(__dirname, 'src/scripts'),
            '@styles': resolve(__dirname, 'src/styles'),
            '@images': resolve(__dirname, 'src/images'),
        },
    },
})