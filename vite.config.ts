import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const workerOrigin = 'https://glico-foto.business-fabiodenuzzo.workers.dev'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/analyze': {
        target: workerOrigin,
        changeOrigin: true,
        rewrite: () => '/analizza',
      },
    },
  },
})
