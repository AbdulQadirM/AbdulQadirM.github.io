import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kage: resolve(__dirname, 'kage/index.html'), // immersive ThreeUI version at /kage/
      },
    },
    chunkSizeWarningLimit: 1100, // the lazy three.js chunk is ~265 KB gzipped and only loads on capable desktops
  },
})
