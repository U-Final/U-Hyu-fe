import { type FC } from 'react';

import RegionFilterDropdown from '@kakao-map/components/layout/RegionFilterDropdown';

import { FilterTabs, SearchInput } from '@/shared/components';

import BottomSheetToggleButton from './BottomSheetToggleButton';

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
  /** 바텀시트 토글 핸들러 */
  onToggleBottomSheet: () => void;
  /** 바텀시트 열림/닫힘 상태 */
  isBottomSheetOpen: boolean;
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
  onToggleBottomSheet,
  isBottomSheetOpen,
}) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 space-y-2.5">
      {/* 바텀시트 토글 버튼 - 오른쪽 고정 위치 */}
      <div className="absolute top-0 right-0 z-20">
        <BottomSheetToggleButton 
          isOpen={isBottomSheetOpen} 
          onToggle={onToggleBottomSheet} 
        />
      </div>

      {/* 상단 라인: 검색바 + 지역 필터 */}
      <div className="flex items-stretch gap-2.5 ml-[52px] mr-[52px]">
        {/* 검색바 - 대부분 공간 사용 */}
        <div className="flex-1 h-[44px]">
          <SearchInput
            value={searchValue}
            onChange={onSearchValueChange}
            onSearch={onSearch}
            onCancel={onSearchCancel}
            placeholder="장소 검색"
            variant="white"
          />
        </div>

        {/* 지역 필터 드롭다운 - 고정 크기 */}
        <div className="flex-shrink-0 h-[44px]">
          <RegionFilterDropdown
            value={activeRegionFilter}
            onChange={onRegionFilterChange}
          />
        </div>
      </div>

      {/* 하단 라인: 카테고리 필터탭 전체 너비 사용 */}
      <div className="w-full">
        <FilterTabs variant="white" onChange={onCategoryFilterChange} />
      </div>
    </div>
  );
};

export default MapTopControls;
