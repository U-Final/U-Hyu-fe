import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { BaseBottomSheet } from '../BaseBottomSheet';
import type { BaseBottomSheetProps } from '../bottomSheet.type';

const meta: Meta<typeof BaseBottomSheet> = {
  title: 'Components/BottomSheet/BaseBottomSheet',
  component: BaseBottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    height: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full', 'auto'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseBottomSheet>;

const BaseBottomSheetWrapper = (args: BaseBottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg"
      >
        바텀시트 열기
      </button>

      <BaseBottomSheet
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Default: Story = {
  render: BaseBottomSheetWrapper,
  args: {
    title: '기본 바텀시트',
    children: (
      <div className="space-y-4">
        <p>기본적인 기능을 가진 바텀시트입니다.</p>
        <div className="space-y-2">
          <div className="bg-gray-100 p-4 rounded-lg">콘텐츠 항목 1</div>
          <div className="bg-gray-100 p-4 rounded-lg">콘텐츠 항목 2</div>
          <div className="bg-gray-100 p-4 rounded-lg">콘텐츠 항목 3</div>
        </div>
      </div>
    ),
  },
};

export const WithBackButton: Story = {
  render: BaseBottomSheetWrapper,
  args: {
    title: '뒤로가기 버튼 포함',
    subtitle: '이 시트는 뒤로가기 버튼이 있습니다',
    showBackButton: true,
    onBack: () => {
      // 뒤로가기 버튼 클릭 처리
    },
    children: (
      <div className="space-y-4">
        <p>이 바텀시트는 헤더에 뒤로가기 버튼이 포함되어 있습니다.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold">네비게이션 기능</h3>
          <p className="text-sm text-gray-600">다단계 플로우에 사용하세요</p>
        </div>
      </div>
    ),
  },
};

export const DifferentHeights: Story = {
  render: BaseBottomSheetWrapper,
  args: {
    title: '큰 높이',
    height: 'large',
    children: (
      <div className="space-y-4">
        <p>이 시트는 'large' 높이 옵션을 사용합니다.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded">
            콘텐츠 항목 {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};
