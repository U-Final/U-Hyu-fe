import { PrimaryButton } from '@shared/components/buttons/PrimaryButton';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import React from 'react';
import { BaseBottomSheet } from './BaseBottomSheet';
import type { SelectionBottomSheetProps, SelectionItem } from './bottomSheet.type';

export const SelectionBottomSheet: React.FC<SelectionBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  items,
  selectedItems,
  onItemSelect,
  multiSelect = false,
  showApplyButton = false,
  onApply,
  height = 'medium',
  autoCloseOnSelect = false,
}) => {
  const handleItemClick = (itemId: string) => {
    onItemSelect(itemId);

    if (!multiSelect && autoCloseOnSelect) {
      setTimeout(() => onClose(), 300);
    }
  };

  const renderBrandIcon = (item: SelectionItem) => {
    // 브랜드 로고 렌더링 함수
    const getSizeClasses = (size: string = 'medium') => {
      switch (size) {
        case 'small':
          return 'w-8 h-8';
        case 'large':
          return 'w-12 h-12';
        case 'medium':
        default:
          return 'w-10 h-10';
      }
    };

    if (item.brandImageUrl) {
      const sizeClass = getSizeClasses(item.iconSize);
      const circularClass = item.useCircularIcon ? 'rounded-full' : 'rounded-lg';

      return (
        <div
          className={`${sizeClass} bg-gray-100 ${circularClass} overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm`}
        >
          <img
            src={item.brandImageUrl}
            alt={`${item.label} 브랜드 로고`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<span class="text-xs text-gray-400">${item.label.charAt(
                  0
                )}</span>`;
              }
            }}
          />
        </div>
      );
    }

    if (item.icon) {
      return (
        <div className={`${getSizeClasses(item.iconSize)} flex items-center justify-center`}>
          {typeof item.icon === 'string' ? <span className="text-xl">{item.icon}</span> : item.icon}
        </div>
      );
    }

    return null;
  };

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      height={height}
    >
      <div className="space-y-1">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id);

          return (
            <motion.button
              key={item.id}
              onClick={() => !item.isDisabled && handleItemClick(item.id)}
              disabled={item.isDisabled}
              className={`w-full p-4 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              } ${item.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileTap={!item.isDisabled ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {renderBrandIcon(item)}
                  <div>
                    <div
                      className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}
                    >
                      {item.label}
                    </div>
                    {item.description && (
                      <div className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {multiSelect && isSelected && <Check size={16} className="text-blue-500" />}
                  {item.rightElement === '>' && (
                    <ChevronRight size={16} className="text-gray-400" />
                  )}
                  {item.rightElement && item.rightElement !== '>' && item.rightElement}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {showApplyButton && multiSelect && onApply && (
        <div className="mt-6">
          <PrimaryButton
            onClick={onApply}
            disabled={selectedItems.length === 0}
            className="w-full py-3 rounded-xl"
          >
            적용하기 {selectedItems.length > 0 && `(${selectedItems.length})`}
          </PrimaryButton>
        </div>
      )}
    </BaseBottomSheet>
  );
};
