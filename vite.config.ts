/// <reference types="vitest/config" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@extra-info': path.resolve(__dirname, 'src/features/extra-info'),
      '@benefit': path.resolve(__dirname, 'src/features/benefit'),
      '@home': path.resolve(__dirname, 'src/features/home'),
      '@paths': path.resolve(__dirname, 'src/routes/path.ts'),
      '@user': path.resolve(__dirname, 'src/features/user'),
      '@mypage': path.resolve(__dirname, 'src/features/mypage'),
      '@mymap': path.resolve(__dirname, 'src/features/mymap'),
      '@admin': path.resolve(__dirname, 'src/features/admin'),
      '@kakao-map': path.resolve(__dirname, 'src/features/kakao-map'),
      '@recommendation': path.resolve(__dirname, 'src/features/recommendation'),
      '@barcode': path.resolve(__dirname, 'src/features/barcode'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        sw: './sw.js',
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});