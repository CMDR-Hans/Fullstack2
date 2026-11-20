import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true, // Nos permite usar describe, it y expect sin importarlos en cada archivo
    environment: 'jsdom', // Usa el navegador invisible que instalamos
    setupFiles: './src/setupTests.js', // Archivo de configuración inicial
  }
})
