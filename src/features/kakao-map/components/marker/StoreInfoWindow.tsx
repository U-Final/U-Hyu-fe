import AddStore from '@mymap/components/mymap-add-store/AddStore';
import { motion } from 'framer-motion';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import { useModalStore } from '@/shared/store';

import { useStoreDetailQuery } from '../../hooks/useMapQueries';
import StoreDetailCard from '../card/StoreDetailCard';

interface StoreInfoWindowProps {
  storeId: number;
  position: { lat: number; lng: number };
  handleToggleFavorite?: () => void;
}

// 고급 버블 애니메이션 설정
const bubbleVariants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    y: 40,
    rotateX: -15,
    transformOrigin: 'center bottom',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transformOrigin: 'center bottom',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 15,
      mass: 0.8,
      velocity: 2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    rotateX: 10,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

// 그림자 효과 애니메이션
const shadowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: [0, 0.3, 0.2],
    scale: [0.8, 1.2, 1],
    y: [10, 0, 0],
    transition: {
      duration: 0.6,
      times: [0, 0.3, 1],
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// 내용 요소들의 스태거 애니메이션
const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

// 로딩 상태 애니메이션
const loadingVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98] as const,
    },
  },
};

const StoreInfoWindow: React.FC<StoreInfoWindowProps> = ({
  storeId,
  position,
}) => {
  const openModal = useModalStore(state => state.openModal);
  const {
    data: storeDetailResponse,
    isLoading,
    error,
  } = useStoreDetailQuery(storeId);

  const handleFavoriteClick = () => {
    openModal('base', {
      title: '매장 추가',
      children: <AddStore storeId={storeId} />,
    });
  };

  if (isLoading) {
    return (
      <CustomOverlayMap
        position={position}
        yAnchor={1.2}
        xAnchor={0.5}
        zIndex={1000}
      >
        <motion.div
          className="bg-white p-4 rounded-lg shadow-lg relative z-50"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="animate-pulse flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full animate-bounce"></div>
            <div
              className="w-4 h-4 bg-gray-300 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-4 h-4 bg-gray-300 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <span className="text-gray-500 text-sm">로딩 중...</span>
          </div>
        </motion.div>
      </CustomOverlayMap>
    );
  }

  if (error || !storeDetailResponse?.data) {
    return null;
  }

  const storeDetail = storeDetailResponse.data;

  return (
    <CustomOverlayMap
      position={position}
      yAnchor={1.25}
      xAnchor={0.5}
      zIndex={1000}
    >
      <div className="relative perspective-1000">
        {/* 그림자 효과 */}
        <motion.div
          className="absolute inset-0 bg-black/10 rounded-2xl blur-lg"
          variants={shadowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            transform: 'translateZ(-10px)',
          }}
        />

        {/* 메인 버블 컨테이너 */}
        <motion.div
          className="relative z-50"
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => {
            e.stopPropagation();
          }}
          onMouseDown={e => {
            e.stopPropagation();
          }}
          onMouseUp={e => {
            e.stopPropagation();
          }}
          style={{
            filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))',
          }}
        >
          {/* 내용 컨테이너 */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StoreDetailCard
              storeName={storeDetail.storeName}
              isFavorite={storeDetail.isFavorite}
              favoriteCount={storeDetail.favoriteCount}
              benefits={storeDetail.benefits}
              usageLimit={storeDetail.usageLimit}
              usageMethod={storeDetail.usageMethod}
              handleToggleFavorite={handleFavoriteClick}
            />
          </motion.div>

          {/* 글로우 효과 */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.3, 0.1, 0],
              scale: [0.8, 1.1, 1.05, 1],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.3, 0.7, 1],
              ease: 'easeOut',
            }}
            style={{
              background:
                'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </div>
    </CustomOverlayMap>
  );
};

export default StoreInfoWindow;
