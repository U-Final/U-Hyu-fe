import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

import {
  useMapStore,
  useRecommendedStores,
  useShowRecommendedStores,
} from '@kakao-map/store/MapStore';

export const RecommendedStoresToggle: React.FC = () => {
  const showRecommendedStores = useShowRecommendedStores();
  const toggleRecommendedStores = useMapStore(
    state => state.toggleRecommendedStores
  );
  const recommendedStores = useRecommendedStores();

  return (
    <button
      onClick={toggleRecommendedStores}
      className="flex items-center justify-center w-[44px] h-[44px] bg-white border border-gray-200 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
      aria-label={`추천 매장 ${showRecommendedStores ? '숨기기' : '보기'}`}
    >
      <motion.div
        animate={{
          scale: showRecommendedStores ? 1.1 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
        className="flex items-center justify-center"
      >
        {showRecommendedStores ? (
          <Eye className="w-4 h-4 text-blue-600" />
        ) : (
          <EyeOff className="w-4 h-4 text-gray-600" />
        )}
      </motion.div>
      
      {/* 추천 매장 개수 표시 */}
      {recommendedStores.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {recommendedStores.length}
        </span>
      )}
    </button>
  );
};
