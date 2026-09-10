import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: [
      'gsap',
      'gsap/ScrollTrigger',
      'lenis',
      'framer-motion',
      'pixi.js',
      'pixi-filters/zoom-blur',
      'pixi-filters/motion-blur',
      'remotion',
      '@remotion/player',
    ],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/pixi.js') || id.includes('pixi-filters')) {
            return 'pixi'
          }
          if (id.includes('framer-motion') || id.includes('node_modules/gsap')) {
            return 'motion'
          }
          if (id.includes('remotion')) {
            return 'remotion'
          }
          return undefined
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
})
