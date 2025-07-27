import { MapPin, Phone, ExternalLink } from 'lucide-react';
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
      <div className={`flex flex-col space-y-3 p-4 ${className}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <SearchResultSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
        <MapPin size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
        <p className="text-gray-400 text-sm mt-2">
          다른 키워드로 검색해보세요
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {results.map((place, index) => (
        <SearchResultItem
          key={place.id}
          place={place}
          onClick={() => onItemClick(place)}
          isSelected={selectedPlaceId === place.id}
          showDistance={true}
          className={index === results.length - 1 ? '' : 'border-b border-gray-100'}
        />
      ))}
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

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (place.url) {
      window.open(place.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (place.phone) {
      window.location.href = `tel:${place.phone}`;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col p-4 cursor-pointer
        transition-all duration-200
        hover:bg-gray-50 active:bg-gray-100
        ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
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
    >
      {/* 장소명과 카테고리 */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-900 truncate ${isSelected ? 'text-blue-700' : ''}`}>
            {place.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatCategory(place.category)}
          </p>
        </div>
        
        {/* 거리 표시 */}
        {showDistance && place.distance && (
          <div className="flex-shrink-0 ml-3">
            <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              {formatDistance(place.distance)}
            </span>
          </div>
        )}
      </div>

      {/* 주소 */}
      <div className="flex items-start mb-3">
        <MapPin size={14} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 truncate">
            {place.roadAddress || place.address}
          </p>
          {place.roadAddress && place.address !== place.roadAddress && (
            <p className="text-xs text-gray-400 truncate mt-1">
              {place.address}
            </p>
          )}
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* 전화번호 */}
          {place.phone && (
            <button
              onClick={handlePhoneClick}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
              aria-label={`${place.phone}로 전화걸기`}
            >
              <Phone size={14} className="mr-1" />
              <span className="truncate max-w-32">{place.phone}</span>
            </button>
          )}
        </div>

        {/* 외부 링크 */}
        {place.url && (
          <button
            onClick={handleExternalLinkClick}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="카카오맵에서 보기"
          >
            <ExternalLink size={14} className="mr-1" />
            <span>상세보기</span>
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * 로딩 중 표시할 스켈레톤 컴포넌트
 */
const SearchResultSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col p-4 animate-pulse">
      {/* 제목과 거리 */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-12 ml-3" />
      </div>

      {/* 주소 */}
      <div className="flex items-start mb-3">
        <div className="w-4 h-4 bg-gray-200 rounded mt-0.5 mr-2" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-full mb-1" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-16" />
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