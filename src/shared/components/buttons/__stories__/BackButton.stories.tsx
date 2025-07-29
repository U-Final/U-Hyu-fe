import type { Meta, StoryObj } from '@storybook/react-vite';

import BackButton from '../BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'Buttons/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    ariaLabel: {
      control: 'text',
      defaultValue: '이전 화면으로 돌아가기',
    },
    className: {
      control: 'text',
      description: 'Tailwind 기반 커스텀 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
  parameters: {
    docs: {
      source: {
        code: `<BackButton onClick={() => {}} />`,
      },
    },
  },
};

export const WithCustomAriaLabel: Story = {
  args: {
    onClick: () => {},
    ariaLabel: '뒤로 가기 버튼입니다',
  },
  parameters: {
    docs: {
      source: {
        code: `<BackButton ariaLabel="뒤로 가기 버튼입니다" onClick={() => {}} />`,
      },
    },
  },
};

export const WithCustomStyle: Story = {
  args: {
    onClick: () => {},
    className: 'bg-red-100 border-red-300 text-red-700',
  },
  parameters: {
    docs: {
      source: {
        code: `<BackButton className="bg-red-100 border-red-300 text-red-700" onClick={() => {}} />`,
      },
    },
  },
};
