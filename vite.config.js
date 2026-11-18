import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` produces relative asset URLs, so the same build works on
// GitHub Pages (https://<user>.github.io/<repo>/), Netlify, Vercel,
// Cloudflare Pages or any static host — without changing configuration.
export default defineConfig({
  base: './',
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssMinify: true,
  },
});
