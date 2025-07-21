/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";


// ES Module 환경에서 __dirname 대신 사용
const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/shared/components"),
      "@features": path.resolve(__dirname, "src/features"),
      "@extra-info": path.resolve(__dirname, "src/features/extra-info"),
      "@benefit": path.resolve(__dirname, "src/features/benefit"),
      "@home" : path.resolve(__dirname, "src/features/home"),
      "@paths": path.resolve(__dirname, "src/routes/path.ts"),
      "@user": path.resolve(__dirname, "src/features/user"),
      "@mypage": path.resolve(__dirname, "src/features/mypage"),
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
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});

// import { userApi } from "@user/api/userApi";
