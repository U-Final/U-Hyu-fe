import { type FC } from 'react';

import RegionFilterDropdown from '@kakao-map/components/layout/RegionFilterDropdown';

import { FilterTabs, SearchInput } from '@/shared/components';

/**
 * MapTopControls 컴포넌트의 Props 인터페이스
 */
interface MapTopControlsProps {
  /** 검색 입력값 */
  searchValue: string;
  /** 검색 입력값 변경 핸들러 */
  onSearchValueChange: (value: string) => void;
  /** 검색 실행 핸들러 (엔터키 입력 시) */
  onSearch: (value: string) => void;
  /** 검색 취소 핸들러 (X 버튼 클릭 시) */
  onSearchCancel: () => void;
  /** 현재 선택된 지역 필터 */
  activeRegionFilter: string;
  /** 지역 필터 변경 핸들러 */
  onRegionFilterChange: (value: string) => void;
  /** 현재 선택된 카테고리 필터 */
  activeCategoryFilter: string;
  /** 카테고리 필터 변경 핸들러 */
  onCategoryFilterChange: (value: string) => void;
}

/**
 * 지도 상단 컨트롤 UI 컴포넌트
 * 검색바, 카테고리 필터탭, 지역 필터 드롭다운을 포함
 * 모바일과 데스크탑에서 반응형으로 동작
 */
const MapTopControls: FC<MapTopControlsProps> = ({
  searchValue,
  onSearchValueChange,
  onSearch,
  onSearchCancel,
  activeRegionFilter,
  onRegionFilterChange,
  onCategoryFilterChange,
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

      {/* 필터 영역 - 모바일에서 겹침 방지 레이아웃 */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center">
        {/* 카테고리 필터탭 */}
        <div className="flex-1 min-w-0 sm:flex sm:justify-center">
          <div className="relative w-full sm:w-auto">
            <div className="pr-8 sm:pr-0 py-1">
              <FilterTabs variant="white" onChange={onCategoryFilterChange} />
            </div>

            {/* 그라데이션 페이드 효과 - 모바일에서만 표시 */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
          </div>
        </div>

        {/* 지역 필터 드롭다운 - 최소 크기로 조정 */}
        <div className="flex-shrink-0 w-auto">
          <RegionFilterDropdown
            value={activeRegionFilter}
            onChange={onRegionFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MapTopControls;
