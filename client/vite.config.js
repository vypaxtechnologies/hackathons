import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Fail loudly instead of silently moving to 5174. Two dev servers on the
    // same port is the usual cause of a broken HMR socket: one binds IPv6 ::1
    // and another binds all interfaces, the browser is served the stale one, and
    // the HMR websocket falls back to a direct connection on the other.
    // `strictPort` turns that confusing symptom into an obvious error.
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})