import type { FilterTabProps } from '@components/filter_tabs/FilterTabs.types';
import {
  FILTER_TABS,
  filterTabVariants,
} from '@components/filter_tabs/FilterTabs.variants';
import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

const FilterTabs: FC<FilterTabProps> = ({
  tabs = FILTER_TABS,
  onChange,
  variant = 'gray',
}) => {
  const [active, setActive] = useState(tabs[0]?.value ?? '');

  const handleClick = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className="scrollbar-hidden flex overflow-x-auto whitespace-nowrap gap-2 p-5">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={clsx(
            filterTabVariants[variant].base,
            'cursor-pointer',
            active === value
              ? filterTabVariants[variant].active
              : filterTabVariants[variant].inactive
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
