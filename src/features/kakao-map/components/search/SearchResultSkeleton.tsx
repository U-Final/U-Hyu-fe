import React from 'react';

/**
 * 로딩 중 표시할 스켈레톤 컴포넌트
 */
export const SearchResultSkeleton: React.FC = () => {
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

export default SearchResultSkeleton;