import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
    tailwindcss(),
    react(),
  ],
  server: {
    host: '0.0.0.0', // Memungkinkan akses dari jaringan
    hmr: {
      host: '192.168.1.13', // Gunakan IP address komputer Anda
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
    },
  },
});
