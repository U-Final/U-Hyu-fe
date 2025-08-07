import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import type { NormalizedPlace } from '../../api/types';
import SearchResultItem from './SearchResultItem';
import SearchResultSkeleton from './SearchResultSkeleton';
import { SearchResultSummary } from './SearchResultSummary';

export { SearchResultSummary } from './SearchResultSummary';
export { SearchResultItem } from './SearchResultItem';
export { SearchResultSkeleton } from './SearchResultSkeleton';

interface SearchResultListProps {
  results: NormalizedPlace[];
  loading?: boolean;
  onItemClick: (place: NormalizedPlace) => void;
  selectedPlaceId?: string;
  className?: string;
  emptyMessage?: string;
  keyword?: string;
  totalCount?: number;
  category?: string;
  showSummary?: boolean;
  hasSearched?: boolean;
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
  hasSearched = false,
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

  if (hasSearched && results.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
      >
        <div className="mb-6 w-32 h-32 flex items-center justify-center">
          <img
            src="/images/empty/empty-state.png"
            alt="검색 결과 없음"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-lg font-semibold text-gray-700 text-sm mb-1">
          {emptyMessage}
        </p>
        <p className="text-gray-400 text-xs">다른 키워드로 다시 검색해보세요</p>
      </div>
    );
  }

  if (!hasSearched || results.length === 0) {
    return null;
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
