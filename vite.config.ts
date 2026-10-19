import { defineConfig } from 'vite';

// Relative base so the build works on GitHub Pages (/website/) and on a custom domain alike.
// Two pages: the studio site and the Montevo One product page (/one/).
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    rollupOptions: {
      input: { main: 'index.html', one: 'one/index.html' },
    },
  },
});
