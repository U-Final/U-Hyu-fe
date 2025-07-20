import type { Meta, StoryObj } from '@storybook/react-vite';

import { PrimaryButton } from '../PrimaryButton';

const meta: Meta<typeof PrimaryButton> = {
  title: 'Buttons/PrimaryButton',
  component: PrimaryButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {
  args: {
    size: 'md',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      source: {
        code: `<PrimaryButton size="md">Primary Button</PrimaryButton>`,
      },
    },
  },
};

export const Loading: Story = {
  args: {
    size: 'md',
    isLoading: true,
    children: '로딩 중...',
  },
  parameters: {
    docs: {
      source: {
        code: `<PrimaryButton size="md" isLoading>로딩 중...</PrimaryButton>`,
      },
    },
  },
};
