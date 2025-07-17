import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search, X } from 'lucide-react';
import { IconButton } from '../IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const CloseIcon: Story = {
  args: {
    icon: <X className="w-4 h-4" />,
  },
  parameters: {
    docs: {
      source: {
        code: `<IconButton icon={<X className="w-4 h-4" />} />`,
      },
    },
  },
};

export const SearchIcon: Story = {
  args: {
    icon: <Search className="w-4 h-4" />,
  },
  parameters: {
    docs: {
      source: {
        code: `<IconButton icon={<Search className="w-4 h-4" />} />`,
      },
    },
  },
};
