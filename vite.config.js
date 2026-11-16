import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleApiRequest } from './server/apiHandler.js'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            handleApiRequest(req, res)
          } else {
            next()
          }
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            handleApiRequest(req, res)
          } else {
            next()
          }
        })
      },
    },
  ],
  server: {
    host: 'localhost',
    port: 5173,
  },
  preview: {
    host: 'localhost',
    port: 5173,
  },
})
