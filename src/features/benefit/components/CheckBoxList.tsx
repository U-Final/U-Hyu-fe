import type { BenefitType, StoreType } from '@benefit/api/types';
import clsx from 'clsx';

import { PrimaryCheckbox } from '@/shared/components';

const STORE_TYPE_LABELS = {
  온라인: 'ONLINE',
  오프라인: 'OFFLINE',
} as const;

const BENEFIT_TYPE_LABELS = {
  할인: 'DISCOUNT',
  상품증정: 'GIFT',
} as const;

type StoreTypeLabel = keyof typeof STORE_TYPE_LABELS;
type BenefitTypeLabel = keyof typeof BENEFIT_TYPE_LABELS;

interface SelectedItems {
  storeType: StoreType | '' | null;
  benefitType: BenefitType | '' | null;
}

interface CheckBoxListProps {
  selectedItems: SelectedItems;
  onChange: (items: SelectedItems) => void;
}

const CheckBoxList = ({ selectedItems, onChange }: CheckBoxListProps) => {
  const handleStoreTypeToggle = (label: StoreTypeLabel) => {
    const value = STORE_TYPE_LABELS[label];
    const newValue = selectedItems.storeType === value ? '' : value;
    onChange({ ...selectedItems, storeType: newValue });
  };

  const handleBenefitTypeToggle = (label: BenefitTypeLabel) => {
    const value = BENEFIT_TYPE_LABELS[label];
    const newValue = selectedItems.benefitType === value ? '' : value;
    onChange({ ...selectedItems, benefitType: newValue });
  };

  return (
    <div className="flex flex-wrap px-1 gap-4">
      {Object.entries(STORE_TYPE_LABELS).map(([label, value]) => (
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
                ? 'text-black font-bold'
                : 'text-secondary'
            )}
          >
            {label}
          </span>
        </label>
      ))}

      {Object.entries(BENEFIT_TYPE_LABELS).map(([label, value]) => (
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
                ? 'text-black font-bold'
                : 'text-secondary'
            )}
          >
            {label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CheckBoxList;
