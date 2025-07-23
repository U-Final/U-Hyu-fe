import clsx from 'clsx';

import { PrimaryCheckbox } from '@/shared/components';

type StoreTypeLabel = '온라인' | '오프라인';
type BenefitTypeLabel = '할인' | '상품증정';

const storeTypeMap: Record<StoreTypeLabel, 'ONLINE' | 'OFFLINE'> = {
  온라인: 'ONLINE',
  오프라인: 'OFFLINE',
};

const benefitTypeMap: Record<BenefitTypeLabel, 'DISCOUNT' | 'GIFT'> = {
  할인: 'DISCOUNT',
  상품증정: 'GIFT',
};

interface CheckBoxListProps {
  selectedItems: {
    storeType: 'ONLINE' | 'OFFLINE' | '' | null;
    benefitType: 'DISCOUNT' | 'GIFT' | '' | null;
  };
  onChange: (items: CheckBoxListProps['selectedItems']) => void;
}

const CheckBoxList = ({ selectedItems, onChange }: CheckBoxListProps) => {
  const handleStoreTypeToggle = (label: StoreTypeLabel) => {
    const value = storeTypeMap[label];
    const newValue = selectedItems.storeType === value ? '' : value;
    onChange({
      ...selectedItems,
      storeType: newValue,
    });
  };

  const handleBenefitTypeToggle = (label: BenefitTypeLabel) => {
    const value = benefitTypeMap[label];
    const newValue = selectedItems.benefitType === value ? '' : value;
    onChange({
      ...selectedItems,
      benefitType: newValue,
    });
  };

  return (
    <div className="flex flex-wrap px-1 gap-4">
      {/* StoreType 그룹 */}
      {Object.keys(storeTypeMap).map(label => {
        const value = storeTypeMap[label as StoreTypeLabel];
        return (
          <label key={label} className="flex items-center gap-2 cursor-pointer">
            <PrimaryCheckbox
              checked={selectedItems.storeType === value}
              onCheckedChange={() =>
                handleStoreTypeToggle(label as StoreTypeLabel)
              }
            />
            <span
              className={clsx(
                'text-body2 transition-colors',
                selectedItems.storeType === value
                  ? 'text-black font-bold '
                  : 'text-secondary'
              )}
            >
              {label}
            </span>
          </label>
        );
      })}

      {/* BenefitType 그룹 */}
      {Object.keys(benefitTypeMap).map(label => {
        const value = benefitTypeMap[label as BenefitTypeLabel];
        return (
          <label key={label} className="flex items-center gap-2 cursor-pointer">
            <PrimaryCheckbox
              checked={selectedItems.benefitType === value}
              onCheckedChange={() =>
                handleBenefitTypeToggle(label as BenefitTypeLabel)
              }
            />
            <span
              className={clsx(
                'text-body2 transition-colors',
                selectedItems.benefitType === value
                  ? 'text-black font-bold '
                  : 'text-secondary'
              )}
            >
              {label}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default CheckBoxList;
