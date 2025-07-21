import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   base: '/wordle/', // 👈 this is crucial for Render deployment
  plugins: [react()],
})
