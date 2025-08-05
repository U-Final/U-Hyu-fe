import React, { useState } from 'react';

import { X } from 'lucide-react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import type { NormalizedPlace } from '../../api/types';

// 텍스트 길이 제한 상수
const TEXT_LIMITS = {
  name: 15,
  category: 20,
};

// 텍스트가 제한을 초과하는지 확인하는 헬퍼 함수
const shouldShowExpand = (text: string, limit: number): boolean => {
  return text.length > limit;
};

// 축약된 텍스트를 반환하는 헬퍼 함수
const getTruncatedText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

// 더보기 버튼 컴포넌트
const ExpandButton: React.FC<{
  isExpanded: boolean;
  onClick: () => void;
}> = ({ isExpanded, onClick }) => {
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      onTouchEnd={handleTouchEnd}
      className="inline text-blue-500 hover:text-blue-700 font-medium text-xs ml-1 transition-colors duration-200 touch-manipulation"
      aria-label={isExpanded ? '접기' : '더보기'}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {isExpanded ? '접기' : '더보기'}
    </button>
  );
};

/**
 * 간단한 버전의 키워드 인포윈도우
 * 장소명, 카테고리, 닫기 버튼만 포함
 */
interface KeywordInfoWindowProps {
  /** 장소 정보 */
  place: NormalizedPlace;
  /** 닫기 핸들러 */
  onClose: () => void;
  /** 클릭 핸들러 */
  onClick?: (place: NormalizedPlace) => void;
}

export const KeywordInfoWindow: React.FC<KeywordInfoWindowProps> = ({
  place,
  onClose,
  onClick,
}) => {
  const position = { lat: place.latitude, lng: place.longitude };
  const [expandedSections, setExpandedSections] = useState({
    name: false,
    category: false,
  });

  // 섹션 확장/축소 토글 함수
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatCategory = (category: string) => {
    const parts = category.split(' > ');
    return parts[parts.length - 1] || category;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(place);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <CustomOverlayMap
      position={position}
      yAnchor={2}
      xAnchor={0.5}
      zIndex={1000}
    >
      <div className="relative z-50">
        {/* 말풍선 꼬리 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-white drop-shadow-sm" />
        </div>

        {/* 메인 콘텐츠 */}
        <div
          className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 sm:p-3 cursor-pointer hover:bg-gray-50 transition-colors w-[200px] sm:w-[240px] md:w-[260px] max-w-[85vw]"
          onClick={handleClick}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-1 sm:pr-2">
              <div className="font-medium text-gray-900 text-xs sm:text-sm mb-1">
                {shouldShowExpand(place.name, TEXT_LIMITS.name) ? (
                  <>
                    {expandedSections.name
                      ? place.name
                      : getTruncatedText(place.name, TEXT_LIMITS.name)}
                    <ExpandButton
                      isExpanded={expandedSections.name}
                      onClick={() => toggleSection('name')}
                    />
                  </>
                ) : (
                  place.name
                )}
              </div>
              <div className="text-xs text-gray-500">
                {shouldShowExpand(
                  formatCategory(place.category),
                  TEXT_LIMITS.category
                ) ? (
                  <>
                    {expandedSections.category
                      ? formatCategory(place.category)
                      : getTruncatedText(
                          formatCategory(place.category),
                          TEXT_LIMITS.category
                        )}
                    <ExpandButton
                      isExpanded={expandedSections.category}
                      onClick={() => toggleSection('category')}
                    />
                  </>
                ) : (
                  formatCategory(place.category)
                )}
              </div>
            </div>

            <button
              onClick={handleClose}
              className="flex-shrink-0 p-0.5 sm:p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="닫기"
            >
              <X size={10} className="sm:hidden" />
              <X size={12} className="hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

export default KeywordInfoWindow;
