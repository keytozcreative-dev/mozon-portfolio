import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` makes every asset path relative, so the SAME build works on
// GitHub Pages (https://<user>.github.io/mozon-portfolio/), Cloudflare,
// Netlify, Vercel or any other static host — no changes needed.
// Keep exactly ONE `base` line in this file.
export default defineConfig({
  base: './',
  plugins: [react()],
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
