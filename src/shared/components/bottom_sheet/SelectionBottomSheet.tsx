import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { BaseBottomSheet } from './BaseBottomSheet';
import type { SelectionItem } from './bottomSheet.type';

interface SelectionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  items: SelectionItem[];
  selectedItems: string[];
  onItemSelect: (itemId: string) => void;
  multiSelect?: boolean;
  showApplyButton?: boolean;
  onApply?: () => void;
  height?: 'small' | 'medium' | 'large' | 'full' | 'auto';
  autoCloseOnSelect?: boolean;
}

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
                  {item.icon && (
                    <div className={`text-xl ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                      {item.icon}
                    </div>
                  )}
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
                    {item.count && <div className="text-sm text-gray-500">{item.count}개</div>}
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
          <button
            onClick={onApply}
            disabled={selectedItems.length === 0}
            className={`w-full py-3 rounded-xl font-medium transition-colors ${
              selectedItems.length > 0
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            적용하기 {selectedItems.length > 0 && `(${selectedItems.length})`}
          </button>
        </div>
      )}
    </BaseBottomSheet>
  );
};
