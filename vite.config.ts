import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Project page trên GitHub Pages: https://ldky90.github.io/ldktech-solutions/
  // Nếu chuyển sang custom domain: đổi base thành '/'
  base: '/ldktech-solutions/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
  },
})
