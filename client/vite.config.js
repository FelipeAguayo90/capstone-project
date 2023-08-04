import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import dns from 'dns';

// dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      // changeOrigin: true,
      // rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
});
