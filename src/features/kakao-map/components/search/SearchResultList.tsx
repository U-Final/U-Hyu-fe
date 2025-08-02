import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import type { NormalizedPlace } from '../../api/types';
import SearchResultItem from './SearchResultItem';
import SearchResultSkeleton from './SearchResultSkeleton';
import { SearchResultSummary } from './SearchResultSummary';

// Re-export components for backward compatibility
export { SearchResultSummary } from './SearchResultSummary';
export { SearchResultItem } from './SearchResultItem';
export { SearchResultSkeleton } from './SearchResultSkeleton';

interface SearchResultListProps {
  /** 검색 결과 목록 */
  results: NormalizedPlace[];
  /** 로딩 상태 */
  loading?: boolean;
  /** 결과 아이템 클릭 핸들러 */
  onItemClick: (place: NormalizedPlace) => void;
  /** 선택된 장소 ID */
  selectedPlaceId?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 빈 결과일 때 표시할 메시지 */
  emptyMessage?: string;
  /** 검색 키워드 */
  keyword?: string;
  /** 총 결과 수 */
  totalCount?: number;
  /** 현재 카테고리 */
  category?: string;
  /** 요약 정보 표시 여부 */
  showSummary?: boolean;
}

/**
 * 카카오 키워드 검색 결과를 표시하는 리스트 컴포넌트
 */
const SearchResultList: React.FC<SearchResultListProps> = ({
  results,
  loading = false,
  onItemClick,
  selectedPlaceId,
  className = '',
  emptyMessage = '검색 결과가 없습니다.',
  keyword = '',
  totalCount = 0,
  category,
  showSummary = false,
}) => {
  if (loading) {
    return (
      <div className={`flex flex-col ${className}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <SearchResultSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
      >
        <div className="mb-6 w-32 h-32 flex items-center justify-center">
          <img
            src="/images/recommendation/empty-state-2.png"
            alt="검색 결과 없음"
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          검색 결과가 없습니다
        </h3>
        <p className="text-gray-500 text-sm mb-1">{emptyMessage}</p>
        <p className="text-gray-400 text-xs">다른 키워드로 다시 검색해보세요</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {showSummary && keyword && results.length > 0 && (
        <SearchResultSummary
          totalCount={totalCount || results.length}
          currentCount={results.length}
          keyword={keyword}
          category={category}
        />
      )}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {results.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
            >
              <SearchResultItem
                place={place}
                onClick={() => onItemClick(place)}
                isSelected={selectedPlaceId === place.id}
                showDistance={true}
                className={
                  index === results.length - 1 ? '' : 'border-b border-gray-50'
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { SearchResultList };
export default SearchResultList;
