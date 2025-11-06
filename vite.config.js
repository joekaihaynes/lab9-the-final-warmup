import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '../tests/unitTest/setup.js', // relative to root
    include: ['../tests/unitTest/**/*.test.js'], // include tests outside src
    pool: 'vmThreads',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['**/*.{js,ts}'],
    },
  },
});