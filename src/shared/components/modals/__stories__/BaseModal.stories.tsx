import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseModal from '../BaseModal';

const meta: Meta<typeof BaseModal> = {
  title: 'Components/Modal/BaseModal',
  component: BaseModal,
};

export default meta;

type Story = StoryObj<typeof BaseModal>;

const BaseModalWrapper = () => {
  const [visible, setVisible] = useState(true);

  if (!visible)
    return <button onClick={() => setVisible(true)}>모달 열기</button>;

  return (
    <BaseModal title="BaseModal 예시 타이틀">
      <p>이 영역은 children으로 전달된 내용입니다.</p>
    </BaseModal>
  );
};

export const Default: Story = {
  render: () => <BaseModalWrapper />,
};
