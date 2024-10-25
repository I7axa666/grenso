import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/grenso/', // Замените на имя вашего репозитория
  plugins: [react()],
});
