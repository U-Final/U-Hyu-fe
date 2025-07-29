import type { FC } from 'react';
import { useState } from 'react';

import clsx from 'clsx';

import type { FilterTabProps } from '@/shared/components/filter_tabs/FilterTabs.types';
import {
  FILTER_TABS,
  filterTabVariants,
} from '@/shared/components/filter_tabs/FilterTabs.variants';
import { trackFilterUsed } from '@/shared/utils/actionlogTracker';

const FilterTabs: FC<FilterTabProps> = ({
  tabs = FILTER_TABS,
  onChange,
  variant = 'gray',
}) => {
  const [active, setActive] = useState(tabs[0]?.value ?? '');

  const handleClick = (value: string) => {
    setActive(value);
    onChange?.(value);

    // 🎯 이게 전부!
    if (value !== 'all') {
      trackFilterUsed(value); // 'shopping' 그대로 전달
    }
  };

  return (
    <div
      className="filter-tabs-scroll flex whitespace-nowrap gap-2 py-1"
      onWheel={e => {
        // 마우스 휠로 좌우 스크롤 지원
        e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY;
      }}
      onTouchMove={e => {
        // 터치 이벤트 전파 방지
        e.stopPropagation();
      }}
    >
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={clsx(
            filterTabVariants[variant].base,
            'filter-tab-button cursor-pointer',
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
