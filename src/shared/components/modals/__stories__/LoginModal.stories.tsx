import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginModal from '../LoginModal';

const meta: Meta<typeof LoginModal> = {
  title: 'Components/Modal/LoginModal',
  component: LoginModal,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoginModal>;

const LoginModalWrapper = () => {
  const [visible, setVisible] = useState(true);

  if (!visible)
    return (
      <button
        onClick={() => setVisible(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        로그인 모달 열기
      </button>
    );

  return <LoginModal />;
};

export const Default: Story = {
  render: () => <LoginModalWrapper />,
};
