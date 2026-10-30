/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteMetaPlugin } from './vite-plugins/siteMeta'

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetaPlugin()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Inlined data: URIs would need a looser Content-Security-Policy (see vercel.json).
    assetsInlineLimit: 0,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    exclude: ['**/node_modules/**', 'tests/e2e/**', 'dist/**'],
  },
})
