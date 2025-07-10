import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SelectionBottomSheet } from '../SelectionBottomSheet';

const meta: Meta<typeof SelectionBottomSheet> = {
  title: 'Components/BottomSheet/SelectionBottomSheet',
  component: SelectionBottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SelectionBottomSheet>;

const SelectionBottomSheetWrapper = (args: React.ComponentProps<typeof SelectionBottomSheet>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemSelect = (itemId: string) => {
    if (args.multiSelect) {
      setSelectedItems((prev) =>
        prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
      );
    } else {
      setSelectedItems([itemId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
        <h1 className="text-xl font-bold mb-4">선택형 바텀시트 데모</h1>

        {selectedItems.length > 0 && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="text-sm font-medium text-green-800">선택된 항목:</div>
            <div className="text-sm text-green-600">{selectedItems.join(', ')}</div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-green-500 text-white px-6 py-3 rounded-lg"
        >
          선택형 바텀시트 열기
        </button>
      </div>

      <SelectionBottomSheet
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedItems={selectedItems}
        onItemSelect={handleItemSelect}
        onApply={() => {
          console.log('Applied:', selectedItems);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const SingleSelection: Story = {
  render: SelectionBottomSheetWrapper,
  args: {
    title: '공유하기',
    multiSelect: false,
    autoCloseOnSelect: true,
    items: [
      { id: 'kakao', label: '카카오톡', icon: '💬', description: '친구에게 공유' },
      { id: 'instagram', label: '인스타그램', icon: '📸', description: '스토리에 공유' },
      { id: 'facebook', label: '페이스북', icon: '📘', description: '타임라인에 공유' },
      { id: 'copy', label: '링크 복사', icon: '📋', description: '클립보드에 복사' },
    ],
  },
};

export const MultiSelection: Story = {
  render: SelectionBottomSheetWrapper,
  args: {
    title: '카테고리 선택',
    subtitle: '원하는 카테고리를 모두 선택해주세요',
    multiSelect: true,
    showApplyButton: true,
    items: [
      { id: 'food', label: '음식', icon: '🍽️', description: '맛집 정보' },
      { id: 'cafe', label: '카페', icon: '☕', description: '커피전문점' },
      { id: 'shopping', label: '쇼핑', icon: '🛍️', description: '쇼핑몰/매장' },
      { id: 'beauty', label: '뷰티', icon: '💄', description: '미용실/네일샵' },
      { id: 'health', label: '건강', icon: '💊', description: '병원/약국' },
      { id: 'education', label: '교육', icon: '📚', description: '학원/도서관' },
    ],
  },
};

export const WithSettings: Story = {
  render: SelectionBottomSheetWrapper,
  args: {
    title: '설정',
    subtitle: '앱 설정을 관리하세요',
    multiSelect: false,
    items: [
      {
        id: 'notifications',
        label: '알림 설정',
        icon: '🔔',
        description: '푸시 알림 관리',
        rightElement: '>',
      },
      {
        id: 'location',
        label: '위치 서비스',
        icon: '📍',
        description: '위치 정보 사용',
        rightElement: '>',
      },
      {
        id: 'theme',
        label: '테마 설정',
        icon: '🎨',
        description: '다크/라이트 모드',
        rightElement: '>',
      },
      {
        id: 'language',
        label: '언어 설정',
        icon: '🌐',
        description: '앱 언어 변경',
        rightElement: '>',
      },
      {
        id: 'privacy',
        label: '개인정보',
        icon: '🔒',
        description: '데이터 및 개인정보',
        rightElement: '>',
      },
      { id: 'help', label: '도움말', icon: '❓', description: '사용법 및 FAQ', rightElement: '>' },
    ],
  },
};

export const BrandSelection: Story = {
  render: SelectionBottomSheetWrapper,
  args: {
    title: '브랜드 선택',
    subtitle: '관심있는 브랜드를 선택해주세요',
    multiSelect: true,
    showApplyButton: true,
    items: [
      {
        id: 'gs25',
        label: 'GS25',
        icon: <img src="/images/brands/GS25.png" alt="GS25" className="w-6 h-6 object-contain" />,
        description: '편의점',
      },
      {
        id: 'cu',
        label: 'CU',
        icon: <img src="/images/brands/CU.png" alt="CU" className="w-6 h-6 object-contain" />,
        description: '편의점',
      },
      {
        id: 'seven',
        label: '세븐일레븐',
        icon: (
          <img
            src="/images/brands/세븐일레븐.png"
            alt="세븐일레븐"
            className="w-6 h-6 object-contain"
          />
        ),
        description: '편의점',
      },
      {
        id: 'cgv',
        label: 'CGV',
        icon: <img src="/images/brands/CGV.png" alt="CGV" className="w-6 h-6 object-contain" />,
        description: '영화관',
      },
      {
        id: 'lotte',
        label: '롯데시네마',
        icon: (
          <img
            src="/images/brands/롯데시네마.png"
            alt="롯데시네마"
            className="w-6 h-6 object-contain"
          />
        ),
        description: '영화관',
      },
      {
        id: 'goobne',
        label: '굽네치킨',
        icon: (
          <img
            src="/images/brands/굽네치킨.png"
            alt="굽네치킨"
            className="w-6 h-6 object-contain"
          />
        ),
        description: '치킨 프랜차이즈',
      },
      {
        id: 'paris',
        label: '파리바게뜨',
        icon: (
          <img
            src="/images/brands/파리바게뜨.png"
            alt="파리바게뜨"
            className="w-6 h-6 object-contain"
          />
        ),
        description: '베이커리',
      },
      {
        id: 'baskin',
        label: '베스킨라빈스',
        icon: (
          <img
            src="/images/brands/베스킨라빈스.png"
            alt="베스킨라빈스"
            className="w-6 h-6 object-contain"
          />
        ),
        description: '아이스크림',
      },
      {
        id: 'wonder',
        label: '원더파크',
        icon: (
          <img
            src="/images/brands/원더파크.png"
            alt="원더파크"
            className="w-6 h-6 object-contain"
          />
        ),
        description: '놀이공원',
      },
      {
        id: 'tous',
        label: '뚜레쥬르',
        icon: (
          <img
            src="/images/brands/뚜레쥬르.png"
            alt="뚜레쥬르"
            className="w-6 h-6 object-contain"
          />
        ),
        description: '베이커리',
      },
    ],
  },
};
