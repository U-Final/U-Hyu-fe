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
  onChange,
  variant = 'gray',
}) => {
  const [active, setActive] = useState(tabs[0]?.value ?? '');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleClick = (value: string) => {
    // 드래그 중이었다면 클릭 무시
    if (isDragging.current) {
      return;
    }

    setActive(value);
    onChange?.(value);

    // 🎯 이게 전부!
    if (value !== 'all') {
      trackFilterUsed(value); // 'shopping' 그대로 전달
    }
  };

  // use-gesture 라이브러리를 사용한 드래그 핸들링
  const bind = useDrag(
    ({ active, delta: [dx], first, last, event }) => {
      if (!scrollContainerRef.current) return;

      if (first) {
        isDragging.current = false;
      }

      if (active && Math.abs(dx) > 3) {
        isDragging.current = true;
        // 페이지 스크롤 방지
        event?.preventDefault();
        event?.stopPropagation();
        
        // 드래그 델타값을 직접 사용하여 1:1 비율로 스크롤
        const currentScrollLeft = scrollContainerRef.current.scrollLeft;
        scrollContainerRef.current.scrollLeft = currentScrollLeft - dx;
      }

      if (last) {
        // 드래그 종료 후 짧은 지연으로 클릭 방지 해제
        setTimeout(() => {
          isDragging.current = false;
        }, 50);
      }
    },
    {
      // 드래그 설정
      threshold: 3, // 3px 이상 움직여야 드래그로 인식
      axis: 'x', // 수평 드래그만 허용
      preventScroll: true, // 페이지 스크롤 방지
      pointer: { touch: true }, // 터치 지원
      from: () => [scrollContainerRef.current?.scrollLeft || 0, 0], // 현재 스크롤 위치에서 시작
    }
  );

  return (
    <div
      ref={scrollContainerRef}
      {...bind()}
      className="flex overflow-x-auto gap-2 py-3 whitespace-nowrap select-none touch-pan-x"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        paddingLeft: 'calc(50vw - 50% + 1rem)',
        paddingRight: 'calc(50vw - 50% + 1rem)',
        overscrollBehavior: 'contain',
      }}
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
