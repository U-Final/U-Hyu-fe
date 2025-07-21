import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { DragBottomSheet } from '../DragBottomSheet';

// 경로는 실제 위치에 맞게 수정

const meta: Meta<typeof DragBottomSheet> = {
  title: 'Components/BottomSheet/DragBottomSheet',
  component: DragBottomSheet,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DragBottomSheet>;

/** 공통 콘텐츠 */
const BottomSheetContent = () => (
  <div className="flex flex-col items-center justify-center h-full p-4">
    <h1 className="text-2xl font-bold mb-4">드래그 가능한 바텀 시트</h1>
    <p className="text-lg">이곳에 내용을 추가하세요.</p>
  </div>
);

export const WithTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          바텀 시트 열기 (타이틀 있음)
        </button>
        {open && (
          <DragBottomSheet title="타이틀입니다">
            <BottomSheetContent />
          </DragBottomSheet>
        )}
      </>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="p-2 bg-green-500 text-white rounded"
        >
          바텀 시트 열기 (타이틀 없음)
        </button>
        {open && (
          <DragBottomSheet>
            <BottomSheetContent />
          </DragBottomSheet>
        )}
      </>
    );
  },
};
