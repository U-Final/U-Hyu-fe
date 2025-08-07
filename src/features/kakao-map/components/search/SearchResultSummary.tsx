import React from 'react';

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
  /** 현재 선택된 카테고리 */
  category?: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const SearchResultSummary: React.FC<SearchResultSummaryProps> = ({
  totalCount,
  currentCount,
  keyword,
  category,
  className = '',
}) => {
  const getCategoryName = (cat?: string) => {
    const categoryMap: { [key: string]: string } = {
      'all': '전체',
      'food': '음식점',
      'shopping': '쇼핑',
      'life': '생활편의',
      'culture': '문화시설',
      'beauty': '뷰티/건강',
      'activity': '스포츠/레저',
      'education': '교육',
      'travel': '여행/숙박'
    };
    return categoryMap[cat || 'all'] || '전체';
  };

  return (
    <div className={`flex flex-col p-4 border-b border-gray-100 bg-gray-50 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            '{keyword}' 검색결과
          </h2>
          {category && category !== 'all' && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              {getCategoryName(category)}
            </span>
          )}
        </div>
        <div className="text-sm font-medium text-blue-600">
          총 {totalCount.toLocaleString()}개
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {currentCount}개 표시
      </div>
    </div>
  );
};

export default SearchResultSummary;