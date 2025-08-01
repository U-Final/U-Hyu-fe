import { type FC, useEffect, useRef } from 'react';

import RegionFilterDropdown from '@kakao-map/components/layout/RegionFilterDropdown';

import { FilterTabs } from '@/shared/components';

import type { NormalizedPlace } from '../../api/types';
import { MapSearchInput } from '../search/MapSearchInput';
import { SearchResultList } from '../search/SearchResultList';
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
  /** 키워드 검색 결과 */
  keywordResults?: NormalizedPlace[];
  /** 검색 로딩 상태 */
  isSearching?: boolean;
  /** 선택된 장소 */
  selectedPlace?: NormalizedPlace | null;
  /** 검색 결과 아이템 클릭 핸들러 */
  onSearchResultClick?: (place: NormalizedPlace) => void;
  /** 검색 결과 닫기 핸들러 */
  onCloseSearchResults?: () => void;
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
  keywordResults = [],
  isSearching = false,
  selectedPlace,
  onSearchResultClick,
  onCloseSearchResults,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSearchResultsVisible = keywordResults.length > 0 || isSearching;

  // 외부 클릭 시 검색 결과 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchResultsVisible &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        onCloseSearchResults
      ) {
        onCloseSearchResults();
      }
    };

    if (isSearchResultsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isSearchResultsVisible, onCloseSearchResults]);

  // ESC 키 눌렀을 때 검색 결과 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        isSearchResultsVisible &&
        onCloseSearchResults
      ) {
        onCloseSearchResults();
      }
    };

    if (isSearchResultsVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isSearchResultsVisible, onCloseSearchResults]);
  return (
    <div
      ref={containerRef}
      className="absolute top-4 left-4 right-4 z-10 space-y-2.5"
    >
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
          <MapSearchInput
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
      <div className="-mx-4 overflow-x-auto">
        <FilterTabs variant="white" onChange={onCategoryFilterChange} />
      </div>

      {/* 검색 결과 리스트 */}
      {isSearchResultsVisible && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 z-30 backdrop-blur-sm overflow-hidden">
          <SearchResultList
            results={keywordResults}
            loading={isSearching}
            onItemClick={onSearchResultClick || (() => {})}
            selectedPlaceId={selectedPlace?.id}
            emptyMessage="검색 결과가 없습니다."
            className="max-h-80 overflow-y-auto"
          />
        </div>
      )}
    </div>
  );
};

export default MapTopControls;
