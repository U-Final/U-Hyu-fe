import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import React from 'react';

import type { NormalizedPlace } from '../../api/types';

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
export const SearchResultList: React.FC<SearchResultListProps> = ({
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

interface SearchResultItemProps {
  /** 장소 정보 */
  place: NormalizedPlace;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 선택 상태 */
  isSelected?: boolean;
  /** 거리 표시 여부 */
  showDistance?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 검색 결과 개별 아이템 컴포넌트
 */
export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  place,
  onClick,
  isSelected = false,
  showDistance = true,
  className = '',
}) => {
  const formatDistance = (distance?: number) => {
    if (!distance) return '';
    
    if (distance < 1000) {
      return `${distance}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  const formatCategory = (category: string) => {
    // 카테고리 문자열에서 마지막 부분만 추출 (예: "음식점 > 한식 > 삼겹살" → "삼겹살")
    const parts = category.split(' > ');
    return parts[parts.length - 1] || category;
  };

  return (
    <motion.div
      onClick={onClick}
      className={`
        relative flex items-center p-4 cursor-pointer
        ${isSelected ? 'bg-blue-50' : 'bg-white'}
        ${className}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${place.name} 선택`}
      initial={{ scale: 1, backgroundColor: isSelected ? '#eff6ff' : '#ffffff' }}
      whileHover={{ 
        scale: 1.02,
        backgroundColor: isSelected ? '#dbeafe' : '#f9fafb',
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1, ease: "easeInOut" }
      }}
      animate={{
        backgroundColor: isSelected ? '#eff6ff' : '#ffffff'
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 300, damping: 20 },
        backgroundColor: { duration: 0.2, ease: "easeInOut" }
      }}
    >
      {/* 선택 표시 */}
      {isSelected && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* 장소 아이콘 */}
      <div className="flex-shrink-0 mr-3">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center
          ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}
        `}>
          <MapPin 
            size={18} 
            className={isSelected ? 'text-blue-600' : 'text-gray-600'} 
          />
        </div>
      </div>

      {/* 장소 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className={`
              text-sm font-semibold truncate mb-1
              ${isSelected ? 'text-blue-700' : 'text-gray-900'}
            `}>
              {place.name}
            </h3>
            <p className="text-xs text-gray-500 mb-1">
              {formatCategory(place.category)}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {place.roadAddress || place.address}
            </p>
          </div>
          
          {/* 거리 표시 */}
          {showDistance && place.distance && (
            <div className="flex-shrink-0 ml-3">
              <span className={`
                inline-flex items-center px-2 py-1 text-xs rounded-full font-medium
                ${isSelected 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {formatDistance(place.distance)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * 로딩 중 표시할 스켈레톤 컴포넌트
 */
const SearchResultSkeleton: React.FC = () => {
  return (
    <div className="flex items-center p-4 animate-pulse">
      {/* 아이콘 */}
      <div className="flex-shrink-0 mr-3">
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
      </div>

      {/* 장소 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
          
          {/* 거리 표시 */}
          <div className="flex-shrink-0 ml-3">
            <div className="h-6 bg-gray-200 rounded-full w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 검색 결과 요약 정보 컴포넌트
 */
interface SearchResultSummaryProps {
  /** 총 결과 수 */
  totalCount: number;
  /** 현재 표시 중인 결과 수 */
  currentCount: number;
  /** 검색 키워드 */
  keyword: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const SearchResultSummary: React.FC<SearchResultSummaryProps> = ({
  totalCount,
  currentCount,
  keyword,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 ${className}`}>
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          '{keyword}' 검색결과
        </h2>
      </div>
      <div className="text-sm text-gray-500">
        {currentCount}개 표시 / 총 {totalCount}개
      </div>
    </div>
  );
};

export default SearchResultList;