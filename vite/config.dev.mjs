import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker'

export default defineConfig({
    base: './',
    plugins: [
        checker({
            typescript: true,
        })
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080
    }
});
