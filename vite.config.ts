import { defineConfig } from 'vite';

// Relative base so the build works on GitHub Pages (/website/) and on a custom domain alike.
export default defineConfig({
  base: './',
  build: { target: 'es2020' },
});
