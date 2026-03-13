import { defineConfig } from 'vite';

export default defineConfig({
  base: '/arcadenoe/',
  server: {
    host: '0.0.0.0',
    port: 5500
  },
  preview: {
    host: '0.0.0.0',
    port: 5500
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
