import React from 'react';
import { motion } from 'framer-motion';

export interface StoreDetailCardProps {
  storeName: string;
  isFavorite: boolean;
  favoriteCount: number;
  benefits: string;
  usageLimit: string;
  usageMethod: string;
  userGrade: string; // "우수", "VIP" , "VVIP"
  onToggleFavorite?: () => void;
}

const StoreDetailCard: React.FC<StoreDetailCardProps> = ({
  storeName,
  isFavorite,
  favoriteCount,
  benefits,
  usageLimit,
  usageMethod,
  userGrade,
  onToggleFavorite,
}) => {
  return (
    <div className="relative w-[20rem] bg-white rounded-2xl shadow-lg p-6 pt-5 pb-8">
      {/* 말풍선 꼬리 */}
      <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 z-10">
        <svg width="2rem" height="2rem" viewBox="0 0 32 32">
          <polygon points="16,32 0,0 32,0" fill="white" />
        </svg>
      </div>
      {/* 상단: 매장명, 즐겨찾기 */}
      <div className="relative z-10 mb-2 flex items-center justify-between">
        <span
          className="text-xl font-bold text-left"
          style={{ fontSize: '1.25rem', lineHeight: '1.75rem' }}
        >
          {storeName}
        </span>
        <div className="flex items-center gap-1">
          <motion.svg
            width="1.5rem"
            height="1.5rem"
            onClick={onToggleFavorite}
            className="cursor-pointer"
            animate={{
              fill: isFavorite ? '#FFD600' : '#E0E0E0',
              scale: isFavorite ? 1.3 : 1,
            }}
            whileTap={{ scale: 1.6, rotate: [0, -20, 20, 0] }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
          </motion.svg>
          <span
            className="text-xs text-gray-500"
            style={{ fontSize: '0.875rem' }}
          >
            {favoriteCount >= 10000
              ? `${Math.floor(favoriteCount / 10000)}만`
              : favoriteCount}
          </span>
        </div>
      </div>
      {/* 등급별 혜택 */}
      <div className="mb-3 relative z-10">
        <div className="text-sm font-semibold text-gray-700 mb-1">
          등급별 혜택
        </div>
        <div className="flex flex-row w-full items-center">
          <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-l font-bold text-sm min-w-[48px] text-center">
            {userGrade}
          </span>
          <span className="bg-yellow-50 px-3 py-1 rounded-r text-sm flex-1 text-right">
            {benefits}
          </span>
        </div>
      </div>
      {/* 제공 횟수 */}
      <div className="mb-3 relative z-10">
        <div className="text-sm font-semibold text-gray-700">제공 횟수</div>
        <div className="text-sm">{usageLimit}</div>
      </div>
      {/* 이용방법 */}
      <div className="relative z-10">
        <div className="text-sm font-semibold text-gray-700 mb-1">이용방법</div>
        <div className="text-xs text-gray-600 whitespace-pre-line">
          {usageMethod}
        </div>
      </div>
    </div>
  );
};

export default StoreDetailCard;
