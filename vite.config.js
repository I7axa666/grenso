import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   base: '/grenso/', // Замените на имя вашего репозитория
//   plugins: [react()],
// });


export default defineConfig({
base: '/grenso/', // Замените на имя вашего репозитория, если необходимо
plugins: [react()],
server: {
    proxy: {
     '/grenso-api': {
        target: 'https://solo-develop.ru',
        changeOrigin: true,
        secure: false,
     },
    },
},
});