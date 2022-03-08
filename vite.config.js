import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@data': path.resolve(__dirname, 'src/data'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@scripts': path.resolve(__dirname, 'src/scripts'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/images'),
        },
    },
})