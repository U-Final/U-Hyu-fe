import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface StoreDetailCardProps {
  storeName: string;
  isFavorite: boolean;
  favoriteCount: number;
  benefits: string;
  usageLimit: string;
  usageMethod: string;
  userGrade?: string; // "우수", "VIP" , "VVIP"
  handleToggleFavorite?: () => void;
}

// 텍스트 길이 제한 상수
const TEXT_LIMITS = {
  benefits: 50,
  usageLimit: 30,
  usageMethod: 40,
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
}> = ({ isExpanded, onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="inline text-blue-500 hover:text-blue-700 font-medium text-xs ml-1 transition-colors duration-200"
    aria-label={isExpanded ? '접기' : '더보기'}
  >
    {isExpanded ? '접기' : '더보기'}
  </button>
);


const StoreDetailCard: React.FC<StoreDetailCardProps> = ({
  storeName,
  isFavorite,
  favoriteCount,
  benefits,
  usageLimit,
  usageMethod,
  userGrade = '우수', // 기본값 설정
  handleToggleFavorite,
}) => {
  // 각 섹션의 확장 상태 관리
  const [expandedSections, setExpandedSections] = useState({
    benefits: false,
    usageLimit: false,
    usageMethod: false,
  });

  // 섹션 확장/축소 토글 함수
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  return (
    <div className="relative w-[20rem] bg-white rounded-2xl shadow-lg p-6 pt-5 pb-8">
      {/* 말풍선 꼬리 */}
      <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 z-10">
        <svg width="2rem" height="2rem" viewBox="0 0 32 32">
          <polygon points="16,32 0,0 32,0" fill="white" />
        </svg>
      </div>
      {/* 상단: 매장명, 즐겨찾기 */}
      <div className="relative z-10 mb-4">
        {/* 매장명 + 즐겨찾기 */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-left leading-7">
            {storeName}
          </span>
          <div className="flex items-center gap-1">
            <div
              onClick={e => {
                e.stopPropagation();
                handleToggleFavorite?.();
              }}
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleToggleFavorite?.();
                }
              }}
            >
              <svg
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <path
                  d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"
                  fill={isFavorite ? '#FFD600' : '#E0E0E0'}
                  style={{
                    transition: 'fill 0.3s ease-in-out',
                  }}
                />
              </svg>
            </div>

            <span className="text-xs text-gray-500">
              {favoriteCount >= 10000
                ? `${Math.floor(favoriteCount / 10000)}만`
                : favoriteCount}
            </span>
          </div>
        </div>
        {/* 등급별 혜택 제목 */}
        <div className="text-sm font-semibold text-gray-700 mb-2">
          등급별 혜택
        </div>
        {/* 혜택 정보 (등급+혜택) */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-stretch">
            <div className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-tl rounded-bl font-bold text-sm min-w-[48px] text-center shrink-0 flex items-center justify-center">
              <span>{userGrade}</span>
            </div>
            <div className="bg-yellow-50 px-3 py-1 rounded-tr rounded-br text-sm flex-1 min-w-0">
              <div className="break-words text-left">
                <span className="whitespace-pre-wrap block">
                  {expandedSections.benefits 
                    ? benefits 
                    : getTruncatedText(benefits, TEXT_LIMITS.benefits)
                  }
                </span>
                {shouldShowExpand(benefits, TEXT_LIMITS.benefits) && (
                  <ExpandButton
                    isExpanded={expandedSections.benefits}
                    onClick={() => toggleSection('benefits')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 제공 횟수 */}
      <div className="mb-4 relative z-10">
        <div className="text-sm font-semibold text-gray-700 mb-2">
          제공 횟수
        </div>
        <div className="text-sm">
          <span className="break-words whitespace-pre-wrap block">
            {expandedSections.usageLimit 
              ? usageLimit 
              : getTruncatedText(usageLimit, TEXT_LIMITS.usageLimit)
            }
          </span>
          {shouldShowExpand(usageLimit, TEXT_LIMITS.usageLimit) && (
            <ExpandButton
              isExpanded={expandedSections.usageLimit}
              onClick={() => toggleSection('usageLimit')}
            />
          )}
        </div>
      </div>
      {/* 이용방법 */}
      <div className="relative z-10">
        <div className="text-sm font-semibold text-gray-700 mb-2">이용방법</div>
        <div className="text-xs text-gray-600">
          <span className="break-words whitespace-pre-line block">
            {expandedSections.usageMethod 
              ? usageMethod 
              : getTruncatedText(usageMethod, TEXT_LIMITS.usageMethod)
            }
          </span>
          {shouldShowExpand(usageMethod, TEXT_LIMITS.usageMethod) && (
            <ExpandButton
              isExpanded={expandedSections.usageMethod}
              onClick={() => toggleSection('usageMethod')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDetailCard;
