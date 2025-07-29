import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import React from 'react';

import type { NormalizedPlace } from '../../api/types';
import SearchResultItem from './SearchResultItem';
import SearchResultSkeleton from './SearchResultSkeleton';

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
      <div className={`flex flex-col items-center justify-center py-8 px-4 text-center ${className}`}>
        <MapPin size={40} className="text-gray-300 mb-3" />
        <p className="text-gray-500 text-sm font-medium">{emptyMessage}</p>
        <p className="text-gray-400 text-xs mt-1">
          다른 키워드로 검색해보세요
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
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
              ease: "easeOut"
            }}
          >
            <SearchResultItem
              place={place}
              onClick={() => onItemClick(place)}
              isSelected={selectedPlaceId === place.id}
              showDistance={true}
              className={index === results.length - 1 ? '' : 'border-b border-gray-50'}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


export { SearchResultList };
export default SearchResultList;