/// <reference types="vitest/config" />
// https://vite.dev/config/
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";





// ES Module 환경에서 __dirname 대신 사용
const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
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
      '@kakao-map': path.resolve(__dirname, 'src/features/kakao-map'),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
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

// import { userApi } from "@user/api/userApi";