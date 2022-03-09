const { resolve } = require('path')
const { defineConfig } = require('vite')

// https://vitejs.dev/config/
export default defineConfig({
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