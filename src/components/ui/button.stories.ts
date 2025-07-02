import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { createElement } from 'react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'shadcn/ui의 Button 컴포넌트입니다. 다양한 variant와 size를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: '버튼의 스타일 variant',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: '버튼의 크기',
    },
    asChild: {
      control: { type: 'boolean' },
      description: '자식 요소로 렌더링할지 여부',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 여부',
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    variant: 'default',
    children: '기본 버튼',
  },
};

// 모든 Variant들
export const Variants: Story = {
  render: () =>
    createElement(
      'div',
      { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
      createElement(Button, { variant: 'default' }, 'Default'),
      createElement(Button, { variant: 'destructive' }, 'Destructive'),
      createElement(Button, { variant: 'outline' }, 'Outline'),
      createElement(Button, { variant: 'secondary' }, 'Secondary'),
      createElement(Button, { variant: 'ghost' }, 'Ghost'),
      createElement(Button, { variant: 'link' }, 'Link')
    ),
  parameters: {
    docs: {
      description: {
        story: '사용 가능한 모든 버튼 variant들을 보여줍니다.',
      },
    },
  },
};

// 크기별 버튼
export const Sizes: Story = {
  render: () =>
    createElement(
      'div',
      { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
      createElement(Button, { size: 'sm' }, 'Small'),
      createElement(Button, { size: 'default' }, 'Default'),
      createElement(Button, { size: 'lg' }, 'Large'),
      createElement(Button, { size: 'icon' }, '🎯')
    ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 버튼들을 보여줍니다.',
      },
    },
  },
};

// 비활성화된 버튼
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화된 버튼',
  },
};

// 로딩 상태 버튼
export const Loading: Story = {
  args: {
    disabled: true,
    children: '로딩 중...',
  },
  parameters: {
    docs: {
      description: {
        story: '로딩 상태를 나타내는 버튼입니다.',
      },
    },
  },
};
