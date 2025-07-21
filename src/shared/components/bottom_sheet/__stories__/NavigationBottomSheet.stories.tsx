import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, ChevronRight } from 'lucide-react';

import { NavigationBottomSheet } from '../NavigationBottomSheet';

const meta: Meta<typeof NavigationBottomSheet> = {
  title: 'Components/BottomSheet/NavigationBottomSheet',
  component: NavigationBottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBottomSheet>;

const NavigationBottomSheetWrapper = (
  args: React.ComponentProps<typeof NavigationBottomSheet>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});

  const steps = {
    main: {
      title: '필터',
      subtitle: '카테고리를 선택해주세요',
      items: [
        {
          id: 'convenience',
          label: '편의점',
          icon: '🏪',
          hasSubCategory: true,
        },
        { id: 'restaurant', label: '음식점', icon: '🍽️', hasSubCategory: true },
        { id: 'cafe', label: '카페', icon: '☕', hasSubCategory: true },
      ],
    },
    convenience: {
      title: '편의점',
      subtitle: '브랜드를 선택해주세요',
      items: [
        { id: 'gs25', label: 'GS25' },
        { id: 'cu', label: 'CU' },
        { id: 'seven', label: '세븐일레븐' },
      ],
    },
    restaurant: {
      title: '음식점',
      subtitle: '종류를 선택해주세요',
      items: [
        { id: 'korean', label: '한식' },
        { id: 'chinese', label: '중식' },
        { id: 'japanese', label: '일식' },
      ],
    },
    cafe: {
      title: '카페',
      subtitle: '브랜드를 선택해주세요',
      items: [
        { id: 'starbucks', label: '스타벅스' },
        { id: 'ediya', label: '이디야' },
        { id: 'twosomeplace', label: '투썸플레이스' },
      ],
    },
  };

  const renderStepContent = (
    stepId: string,
    stepData: unknown,
    helpers: unknown
  ) => {
    if (!stepData) return null;

    const typedStepData = stepData as {
      items: {
        id: string;
        label: string;
        icon: string;
        count: number;
        hasSubCategory: boolean;
      }[];
    };
    const typedHelpers = helpers as {
      isSelected: (stepId: string, itemId: string) => boolean;
      navigateTo: (stepId: string, title: string, subtitle?: string) => void;
      toggleSelection: (stepId: string, itemId: string) => void;
    };

    return (
      <div className="space-y-3">
        {typedStepData.items.map(
          (item: {
            id: string;
            label: string;
            icon: string;
            hasSubCategory: boolean;
          }) => {
            const isSelected = typedHelpers.isSelected(stepId, item.id);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (
                    item.hasSubCategory &&
                    steps[item.id as keyof typeof steps]
                  ) {
                    typedHelpers.navigateTo(
                      item.id,
                      item.label,
                      `${item.label} 브랜드를 선택해주세요`
                    );
                  } else {
                    typedHelpers.toggleSelection(stepId, item.id);
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.icon && <span className="text-xl">{item.icon}</span>}
                    <div>
                      <div
                        className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}
                      >
                        {item.label}
                      </div>
                    </div>
                  </div>

                  {item.hasSubCategory ? (
                    <ChevronRight size={16} className="text-gray-400" />
                  ) : isSelected ? (
                    <Check size={16} className="text-blue-500" />
                  ) : null}
                </div>
              </div>
            );
          }
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
        <h1 className="text-xl font-bold mb-4">네비게이션 바텀시트 데모</h1>

        {Object.keys(appliedFilters).length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">
              적용된 필터:
            </div>
            <div className="text-sm text-blue-600">
              {JSON.stringify(appliedFilters, null, 2)}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          다단계 필터 열기
        </button>
      </div>

      <NavigationBottomSheet
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        steps={steps}
        initialStep="main"
        renderStepContent={renderStepContent}
        onApply={data => {
          setAppliedFilters(data.selections);
          console.log('Applied filters:', data);
        }}
      />
    </div>
  );
};

export const MultiStepFilter: Story = {
  render: NavigationBottomSheetWrapper,
};
