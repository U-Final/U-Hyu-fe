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

export default SearchResultSummary;