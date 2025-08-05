import { useState } from 'react';

import type { Store } from '@kakao-map/types/store';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface RecommendedStoreInfoWindowProps {
  store: Store;
  position: { lat: number; lng: number };
}

// 텍스트 길이 제한 상수
const TEXT_LIMITS = {
  benefit: 60,
  address: 35,
  storeName: 20,
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

export const RecommendStoreInfoWindow: React.FC<
  RecommendedStoreInfoWindowProps
> = ({ store, position }) => {
  const [expandedSections, setExpandedSections] = useState({
    benefit: false,
    address: false,
    storeName: false,
  });

  // 섹션 확장/축소 토글 함수
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <CustomOverlayMap
      position={position}
      yAnchor={1.3}
      xAnchor={0.5}
      zIndex={1000}
    >
      <div className="relative">
        {/* 말풍선 꼬리 - 뒤쪽에 배치 */}
        <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-6 h-6 z-0">
          <svg width="24" height="24" viewBox="0 0 24 24" className="">
            <polygon points="12,24 0,0 24,0" fill="white" />
          </svg>
        </div>

        <div
          className="relative z-10 bg-white rounded-[14px] shadow-lg border border-gray-200 p-4 w-[300px] min-h-[160px] border-b-0 animate-fadeIn"
          onClick={e => {
            e.stopPropagation();
          }}
          onMouseDown={e => {
            e.stopPropagation();
          }}
          onMouseUp={e => {
            e.stopPropagation();
          }}
          onTouchStart={e => {
            e.stopPropagation();
          }}
          onTouchEnd={e => {
            e.stopPropagation();
          }}
          onTouchMove={e => {
            e.stopPropagation();
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={store.logoImage}
                alt={`${store.storeName} 로고`}
                className="w-full h-full object-cover"
                onError={e => {
                  e.currentTarget.src = '/images/brands/default-brand-logo.png';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-bold text-black text-lg">
                {shouldShowExpand(
                  store.storeName || '',
                  TEXT_LIMITS.storeName
                ) ? (
                  <>
                    {expandedSections.storeName
                      ? store.storeName
                      : getTruncatedText(
                          store.storeName || '',
                          TEXT_LIMITS.storeName
                        )}
                    <ExpandButton
                      isExpanded={expandedSections.storeName}
                      onClick={() => toggleSection('storeName')}
                    />
                  </>
                ) : (
                  store.storeName
                )}
              </div>
              <div className="text-sm text-secondary mb-1">
                {shouldShowExpand(
                  store.addressDetail || '',
                  TEXT_LIMITS.address
                ) ? (
                  <>
                    📍{' '}
                    {expandedSections.address
                      ? store.addressDetail
                      : getTruncatedText(
                          store.addressDetail || '',
                          TEXT_LIMITS.address
                        )}
                    <ExpandButton
                      isExpanded={expandedSections.address}
                      onClick={() => toggleSection('address')}
                    />
                  </>
                ) : (
                  `📍 ${store.addressDetail}`
                )}
              </div>
              {/* 브랜드 정보 추가 */}
              <div className="text-xs text-gray-500">
                🏪 {store.brandName} • {store.categoryName}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎁</span>
              <span className="font-bold text-yellow-800 text-md">
                U-HYU 추천
              </span>
              <span className="font-semibold text-yellow-800 text-sm">
                멤버십 혜택
              </span>
            </div>
            <div className="text-yellow-900 font-semibold text-sm leading-relaxed mb-2">
              {shouldShowExpand(store.benefit || '', TEXT_LIMITS.benefit) ? (
                <>
                  {expandedSections.benefit
                    ? store.benefit
                    : getTruncatedText(
                        store.benefit || '',
                        TEXT_LIMITS.benefit
                      )}
                  <ExpandButton
                    isExpanded={expandedSections.benefit}
                    onClick={() => toggleSection('benefit')}
                  />
                </>
              ) : (
                store.benefit
              )}
            </div>
          </div>
        </div>
      </div>
    </CustomOverlayMap>
  );
};
