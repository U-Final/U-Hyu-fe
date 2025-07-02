import type { Preview } from '@storybook/react-vite';
import { createElement } from 'react';
import '../src/index.css'; // TailwindCSS 스타일 추가

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    docs: {
      // autodocs 설정
      autodocs: 'tag',
    },
    backgrounds: {
      // 테마별 배경색 설정
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      return createElement(
        'div',
        {
          className: `min-h-screen p-4 ${
            theme === 'dark'
              ? 'dark bg-background text-foreground'
              : 'bg-background text-foreground'
          }`,
          'data-theme': theme,
        },
        createElement(Story)
      );
    },
  ],
};

export default preview;
