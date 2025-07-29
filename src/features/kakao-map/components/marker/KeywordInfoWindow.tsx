import { X } from 'lucide-react';
import React from 'react';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import type { NormalizedPlace } from '../../api/types';

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
      yAnchor={1.2}
      xAnchor={0.5}
      zIndex={1000}
    >
      <div
        className="relative z-50 max-w-64"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {/* 말풍선 꼬리 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-6 border-r-6 border-t-8 border-transparent border-t-white drop-shadow-sm" />
        </div>

        {/* 메인 콘텐츠 */}
        <div 
          className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleClick}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-2">
              <h4 className="font-medium text-gray-900 text-sm truncate mb-1">
                {place.name}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {formatCategory(place.category)}
              </p>
            </div>
            
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="닫기"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

export default KeywordInfoWindow;