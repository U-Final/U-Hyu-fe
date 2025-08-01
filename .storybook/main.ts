import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Vite 설정과 경로 별칭 동기화
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@extra-info': path.resolve(__dirname, '../src/features/extra-info'),
      '@benefit': path.resolve(__dirname, '../src/features/benefit'),
      '@home': path.resolve(__dirname, '../src/features/home'),
      '@paths': path.resolve(__dirname, '../src/routes/path.ts'),
      '@user': path.resolve(__dirname, '../src/features/user'),
      '@mypage': path.resolve(__dirname, '../src/features/mypage'),
      '@mymap': path.resolve(__dirname, '../src/features/mymap'),
      '@admin': path.resolve(__dirname, '../src/features/admin'),
      '@kakao-map': path.resolve(__dirname, '../src/features/kakao-map'),
      '@recommendation': path.resolve(__dirname, '../src/features/recommendation'),
      '@barcode': path.resolve(__dirname, '../src/features/barcode'),
    };

    config.publicDir = path.resolve(__dirname, '../public');

    config.assetsInclude = ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'];

    config.server = config.server || {};
    config.server.fs = {
      ...config.server.fs,
      allow: ['..'],
    };

    return config;
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
