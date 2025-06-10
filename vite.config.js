// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import tailwindcss from '@tailwindcss/vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [
//     laravel({
//       input: ['resources/css/app.css', 'resources/js/app.jsx'],
//       refresh: true,
//     }),
//     tailwindcss(),
//     react(),
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'resources/js'),
//     },
//   },
//   server: {
//     host: '0.0.0.0', // Memungkinkan akses dari jaringan
//     hmr: {
//       host: '192.168.1.24', // Gunakan IP address komputer Anda
//       protocol: 'ws',
//     },
//     watch: {
//       usePolling: true,
//     },
//   },
// });
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { networkInterfaces } from 'os';

// Function to get the local IP address
function getLocalIP() {
  const nets = networkInterfaces();
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  
  // Find the first external IPv4 address
  for (const name of Object.keys(results)) {
    if (results[name].length > 0) {
      return results[name][0];
    }
  }
  
  return 'localhost'; // Fallback to localhost
}

const localIP = getLocalIP();

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3890,
    strictPort: true,
    hmr: {
      host: localIP,
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
    },
    cors: true,
    origin: `http://${localIP}:3890`,
  },
}); 