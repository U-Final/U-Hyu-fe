import { PrimaryCheckbox } from '@/shared/components';
import clsx from 'clsx';

const options = ['온라인', '오프라인', '할인', '상품증정'];

interface CheckBoxListProps {
  selectedItems: string[];
  onChange: (items: string[]) => void;
}

const CheckBoxList = ({ selectedItems, onChange }: CheckBoxListProps) => {
  const handleToggle = (label: string) => {
    const newSelected = selectedItems.includes(label)
      ? selectedItems.filter(item => item !== label)
      : [...selectedItems, label];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap px-1 gap-4">
      {options.map(label => (
        <label key={label} className="flex items-center gap-2 cursor-pointer">
          <PrimaryCheckbox
            checked={selectedItems.includes(label)}
            onCheckedChange={() => handleToggle(label)}
          />
          <span
            className={clsx(
              'text-body2 transition-colors',
              selectedItems.includes(label)
                ? 'text-black font-bold '
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
