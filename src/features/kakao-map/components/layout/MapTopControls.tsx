// src/features/kakao-map/components/layout/MapTopControls.tsx
import { FilterTabs, SearchInput } from '@/shared/components';
import RegionFilterDropdown from '@/features/kakao-map/components/layout/RegionFilterDropdown';
import { type FC } from 'react';

interface MapTopControlsProps {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onSearch: (value: string) => void;
  onSearchCancel: () => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

const MapTopControls: FC<MapTopControlsProps> = ({
  searchValue,
  onSearchValueChange,
  onSearch,
  onSearchCancel,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 space-y-3">
      {/* 검색바 */}
      <SearchInput
        value={searchValue}
        onChange={onSearchValueChange}
        onSearch={onSearch}
        onCancel={onSearchCancel}
        placeholder="장소 검색"
        variant="white"
      />

      {/* 필터 영역 - 모바일 최적화 */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center">
        {/* 카테고리 필터탭 - 데스크탑에서 중앙 정렬, 모바일에서 스크롤 */}
        <div className="flex-1 min-w-0 sm:flex sm:justify-center">
          <div className="relative w-full sm:w-auto">
            <FilterTabs variant="white" onChange={onFilterChange} />

            {/* 그라데이션 페이드 효과 (선택사항) */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
          </div>
        </div>
        <div className="flex-shrink-0 w-full sm:w-auto">
          <RegionFilterDropdown
            value={activeFilter}
            onChange={onFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MapTopControls;
