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
      '@shared': path.resolve(__dirname, '../src/shared'),
      '@components': path.resolve(__dirname, '../src/shared/components'),
      '@constants': path.resolve(__dirname, '../src/shared/constants'),
      '@client': path.resolve(__dirname, '../src/shared/client'),
      '@features': path.resolve(__dirname, '../src/features'),
      '@extra-info': path.resolve(__dirname, '../src/features/extra-info'),
      '@benefit': path.resolve(__dirname, '../src/features/benefit'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@paths': path.resolve(__dirname, '../src/routes/path.ts'),
      '@user': path.resolve(__dirname, '../src/features/user'),
      '@mypage': path.resolve(__dirname, '../src/features/mypage'),
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
