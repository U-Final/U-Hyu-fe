import React from 'react';

import { motion } from 'framer-motion';

import type { NormalizedPlace } from '../../api/types';
import { CategoryIconContainer } from './CategoryIcon';

export interface SearchResultItemProps {
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
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${place.name} 선택`}
      initial={{
        scale: 1,
        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
      }}
      whileHover={{
        scale: 1.02,
        backgroundColor: isSelected ? '#dbeafe' : '#f9fafb',
        transition: { duration: 0.15, ease: 'easeOut' },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1, ease: 'easeInOut' },
      }}
      animate={{
        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        backgroundColor: { duration: 0.2, ease: 'easeInOut' },
      }}
    >
      {isSelected && (
        <>
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 bg-blue-50 border-l-4 border-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
      <div className="flex-shrink-0 mr-3">
        <CategoryIconContainer
          category={place.category}
          categoryGroupCode={place.categoryGroupCode}
          size={18}
          containerSize={40}
          isSelected={isSelected}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3
              className={`
              text-sm font-semibold truncate mb-1
              ${isSelected ? 'text-blue-700' : 'text-gray-900'}
            `}
            >
              {place.name}
            </h3>
            <p className="text-xs text-gray-500 mb-1">
              {formatCategory(place.category)}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {place.roadAddress || place.address}
            </p>
          </div>

          {showDistance && place.distance && (
            <div className="flex-shrink-0 ml-3">
              <span
                className={`
                inline-flex items-center px-2 py-1 text-xs rounded-full font-medium
                ${
                  isSelected
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }
              `}
              >
                {formatDistance(place.distance)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResultItem;
