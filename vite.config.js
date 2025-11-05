import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/unitTest/setup.js',
    pool: 'vmThreads',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{js,ts}'],
    },
  }
});
