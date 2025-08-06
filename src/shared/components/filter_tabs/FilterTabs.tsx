import type { FC } from 'react';
import { useRef, useState } from 'react';

import { useDrag } from '@use-gesture/react';
import clsx from 'clsx';

import type { FilterTabProps } from '@/shared/components/filter_tabs/FilterTabs.types';
import {
  FILTER_TABS,
  filterTabVariants,
} from '@/shared/components/filter_tabs/FilterTabs.variants';
import { trackFilterUsed } from '@/shared/utils/actionlogTracker';

const FilterTabs: FC<FilterTabProps> = ({
  tabs = FILTER_TABS,
  value,
  onChange,
  variant = 'gray',
}) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.value ?? '');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const active = value !== undefined ? value : internalActive;

  const handleClick = (clickedValue: string) => {
    if (isDragging.current) {
      return;
    }

    if (value === undefined) {
      setInternalActive(clickedValue);
    }
    onChange?.(clickedValue);

    if (clickedValue !== 'all') {
      trackFilterUsed(clickedValue);
    }
  };

  const bind = useDrag(
    ({ active, delta: [dx], first, last, event }) => {
      if (!scrollContainerRef.current) return;

      if (first) {
        isDragging.current = false;
      }

      if (active && Math.abs(dx) > 3) {
        isDragging.current = true;
        event?.preventDefault();
        event?.stopPropagation();

        const currentScrollLeft = scrollContainerRef.current.scrollLeft;
        scrollContainerRef.current.scrollLeft = currentScrollLeft - dx;
      }

      if (last) {
        setTimeout(() => {
          isDragging.current = false;
        }, 50);
      }
    },
    {
      threshold: 3,
      axis: 'x',
      preventScroll: true,
      pointer: { touch: true },
      from: () => [scrollContainerRef.current?.scrollLeft || 0, 0],
    }
  );

  return (
    <div
      ref={scrollContainerRef}
      {...bind()}
      className="flex overflow-x-auto gap-2 py-1 whitespace-nowrap select-none touch-pan-x"
      style={
        variant === 'white'
          ? {
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              paddingLeft: 'calc(50vw - 50% + 1rem)',
              paddingRight: 'calc(50vw - 50% + 1rem)',
              overscrollBehavior: 'contain',
            }
          : {
              overscrollBehavior: 'contain',
            }
      }
      onWheel={e => {
        // 마우스 휠로 좌우 스크롤 지원
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.scrollLeft += e.deltaY;
      }}
      onTouchStart={e => {
        // 터치 시작 시 페이지 스크롤 방지 준비
        e.stopPropagation();
      }}
      onTouchMove={e => {
        // 터치 이동 시 페이지 스크롤 방지
        if (isDragging.current) {
          e.preventDefault();
          e.stopPropagation();
        }
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
                  backgroundColor: `${color}15`, // 활성 상태 미묘한 배경
                  borderColor: `${color}15`,
                }
              : {}
          }
        >
          {IconComponent && (
            <IconComponent
              className="w-4 h-4 flex-shrink-0"
              style={{
                color: color || '#6b7280', // 항상 카테고리 고유 색상 표시
              }}
            />
          )}
          <span
            className="whitespace-nowrap"
            style={{
              color: color || '#6b7280', // 항상 카테고리 고유 색상 표시
            }}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
