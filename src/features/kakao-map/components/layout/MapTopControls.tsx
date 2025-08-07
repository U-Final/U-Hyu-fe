import { type FC, useEffect, useRef } from 'react';

import RegionFilterDropdown from '@kakao-map/components/layout/RegionFilterDropdown';

import { FilterTabs } from '@/shared/components';

import type {
  KakaoKeywordSearchResponse,
  NormalizedPlace,
} from '../../api/types';
import { MapZoomLevelIndicator } from '../controls/MapZoomLevelIndicator';
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
  /** 검색 메타 정보 */
  searchMeta?: KakaoKeywordSearchResponse['meta'] | null;
  /** 검색이 실행되었는지 여부 */
  hasSearched?: boolean;
  /** 지도 인스턴스 (줌 레벨 표시용) */
  map?: kakao.maps.Map | null;
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
  activeCategoryFilter,
  onCategoryFilterChange,
  onToggleBottomSheet,
  isBottomSheetOpen,
  keywordResults = [],
  isSearching = false,
  selectedPlace,
  onSearchResultClick,
  onCloseSearchResults,
  searchMeta,
  hasSearched = false,
  map,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSearchResultsVisible =
    isSearching ||
    keywordResults.length > 0 ||
    (hasSearched && keywordResults.length === 0);

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
      className="absolute top-4 left-14 right-4 z-10 space-y-0.5 pointer-events-none"
    >
      <div className="absolute top-0 right-0 z-20 pointer-events-auto">
        <BottomSheetToggleButton
          isOpen={isBottomSheetOpen}
          onToggle={onToggleBottomSheet}
        />
      </div>

      <div className="flex items-stretch gap-1 ml-0 mr-[40px] pointer-events-auto relative">
        <div className="flex-1 h-[36px]">
          <MapSearchInput
            value={searchValue}
            onChange={onSearchValueChange}
            onSearch={onSearch}
            onCancel={onSearchCancel}
            placeholder="장소 검색"
            variant="white"
          />
        </div>

        <div className="flex-shrink-0 h-[36px]">
          <RegionFilterDropdown
            value={activeRegionFilter}
            onChange={onRegionFilterChange}
          />
        </div>

        {isSearchResultsVisible && (
          <div
            className="absolute top-full mt-2
    left-0 right-0
    -ml-0 -mr-[40px]
    bg-white rounded-xl shadow-2xl border border-gray-100
    z-[9999]"
          >
            <SearchResultList
              results={keywordResults}
              loading={isSearching}
              onItemClick={onSearchResultClick || (() => {})}
              selectedPlaceId={selectedPlace?.id}
              hasSearched={hasSearched}
              emptyMessage="검색 결과가 없습니다."
              className="max-h-80"
              keyword={searchValue}
              totalCount={searchMeta?.total_count || keywordResults.length}
              category={activeCategoryFilter}
              showSummary={true}
            />
          </div>
        )}
      </div>

      <div className="-ml-14 -mr-4 overflow-x-auto pointer-events-auto">
        <FilterTabs variant="white" onChange={onCategoryFilterChange} />
      </div>

      <div className="flex justify-start pointer-events-none -ml-14 pl-4">
        <MapZoomLevelIndicator map={map ?? null} />
      </div>
    </div>
  );
};

export default MapTopControls;
