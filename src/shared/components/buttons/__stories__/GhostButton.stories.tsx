import type { Meta, StoryObj } from '@storybook/react-vite';

import { GhostButton } from '../GhostButton';

const meta: Meta<typeof GhostButton> = {
  title: 'Buttons/GhostButton',
  component: GhostButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GhostButton>;

export const Default: Story = {
  args: {
    size: 'md',
    children: 'Ghost Button',
  },
  parameters: {
    docs: {
      source: {
        code: `<GhostButton size="md">Ghost Button</GhostButton>`,
      },
    },
  },
};
