import type { FC } from 'react';
import { useState } from 'react';

import clsx from 'clsx';

import type { FilterTabProps } from '@/shared/components/filter_tabs/FilterTabs.types';
import {
  FILTER_TABS,
  filterTabVariants,
} from '@/shared/components/filter_tabs/FilterTabs.variants';

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
    <div
      className="filter-tabs-scroll flex whitespace-nowrap gap-2 py-1 w-full overflow-x-auto"
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
      {tabs.map(({ label, value, icon: IconComponent, color }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className={clsx(
            filterTabVariants[variant].base,
            'filter-tab-button cursor-pointer gap-1.5',
            active === value
              ? filterTabVariants[variant].active
              : filterTabVariants[variant].inactive
          )}
          style={
            active === value && color
              ? {
                  backgroundColor: `${color}20`, // 20% opacity background
                  borderColor: color,
                  color: color,
                  boxShadow: `0 8px 32px ${color}30, 0 0 0 2px ${color}40`,
                }
              : {}
          }
        >
          {IconComponent && (
            <IconComponent 
              className="w-4 h-4 flex-shrink-0" 
              style={{ 
                color: active === value && color ? color : 'inherit' 
              }} 
            />
          )}
          <span className="whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
