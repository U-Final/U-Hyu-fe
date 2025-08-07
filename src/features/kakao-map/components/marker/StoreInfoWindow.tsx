import React from 'react';

import { AddStoreModal } from '@mymap/components';
import { motion } from 'framer-motion';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import { useModalStore } from '@/shared/store';

import { useStoreDetailQuery } from '../../hooks/useMapQueries';
import StoreDetailCard from '../card/StoreDetailCard';
import InfoWindowSkeleton from './InfoWindowSkeleton';

interface StoreInfoWindowProps {
  storeId: number;
  position: { lat: number; lng: number };
  handleToggleFavorite?: () => void;
}

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

const baseShadowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 15,
  },
  visible: {
    opacity: 0.12,
    scale: 1.1,
    y: 8,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 5,
    transition: {
      duration: 0.3,
    },
  },
};

const mainShadowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 12,
  },
  visible: {
    opacity: 0.25,
    scale: 1.05,
    y: 6,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 3,
    transition: {
      duration: 0.25,
    },
  },
};

const nearShadowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 8,
  },
  visible: {
    opacity: 0.15,
    scale: 1.02,
    y: 2,
    transition: {
      duration: 0.3,
      delay: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 1,
    transition: {
      duration: 0.2,
    },
  },
};

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

const tailVariants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    y: -15,
    rotateX: -30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.15,
      type: 'spring' as const,
      stiffness: 400,
      damping: 20,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -10,
    rotateX: 15,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as const,
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
      children: <AddStoreModal storeId={storeId} />,
    });
  };

  if (isLoading) {
    return (
      <CustomOverlayMap
        position={position}
        yAnchor={1.3}
        xAnchor={0.5}
        zIndex={1000}
      >
        <div className="relative perspective-1000">
          <motion.div
            className="absolute inset-0 rounded-2xl"
            variants={baseShadowVariants}
            initial="hidden"
            animate="visible"
            style={{
              background:
                'radial-gradient(ellipse 120% 60% at center, rgba(0, 0, 0, 0.08) 0%, transparent 60%)',
              filter: 'blur(20px)',
              transform: 'translateZ(-30px)',
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-2xl"
            variants={mainShadowVariants}
            initial="hidden"
            animate="visible"
            style={{
              background:
                'radial-gradient(ellipse 100% 50% at center, rgba(0, 0, 0, 0.12) 0%, transparent 70%)',
              filter: 'blur(12px)',
              transform: 'translateZ(-20px)',
            }}
          />

          <motion.div
            className="relative z-50"
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
            style={{
              filter:
                'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.08))',
            }}
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl overflow-hidden w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] max-w-[90vw] h-[260px] sm:h-[280px] max-h-[40vh]"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              }}
            >
              <InfoWindowSkeleton type="store" position={position} />
            </motion.div>

            <motion.div
              className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 z-0"
              variants={tailVariants}
              initial="hidden"
              animate="visible"
              style={{
                transformOrigin: 'center top',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32">
                <polygon
                  points="16,32 0,0 32,0"
                  fill="white"
                  stroke="rgba(226, 232, 240, 0.4)"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
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
      yAnchor={1.3}
      xAnchor={0.5}
      zIndex={1000}
    >
      <div className="relative perspective-1000">
        <motion.div
          className="absolute inset-0 rounded-2xl"
          variants={baseShadowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            background:
              'radial-gradient(ellipse 120% 60% at center, rgba(0, 0, 0, 0.08) 0%, transparent 60%)',
            filter: 'blur(20px)',
            transform: 'translateZ(-30px)',
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-2xl"
          variants={mainShadowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            background:
              'radial-gradient(ellipse 100% 50% at center, rgba(0, 0, 0, 0.12) 0%, transparent 70%)',
            filter: 'blur(12px)',
            transform: 'translateZ(-20px)',
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-2xl"
          variants={nearShadowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            background:
              'radial-gradient(ellipse 90% 40% at center, rgba(0, 0, 0, 0.15) 0%, transparent 80%)',
            filter: 'blur(6px)',
            transform: 'translateZ(-10px)',
          }}
        />

        <motion.div
          className="relative z-50"
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            filter:
              'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.08))',
            pointerEvents: 'auto',
          }}
          whileHover={{
            y: -2,
            transition: { duration: 0.2, ease: 'easeOut' },
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
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl overflow-hidden w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] max-w-[90vw] min-h-[260px] sm:min-h-[280px] max-h-[40vh]"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            }}
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

          <motion.div
            className="absolute inset-0 rounded-2xl opacity-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.2, 0.05, 0],
              scale: [0.8, 1.1, 1.05, 1],
            }}
            transition={{
              duration: 1.2,
              times: [0, 0.25, 0.8, 1],
              ease: 'easeOut',
            }}
            style={{
              background:
                'conic-gradient(from 0deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 120deg, rgba(59, 130, 246, 0.1) 240deg, rgba(59, 130, 246, 0.1) 360deg)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            className="absolute top-0 left-1/4 right-1/4 h-px rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [0, 1, 1],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.3, 1],
              delay: 0.4,
            }}
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 z-0"
            variants={tailVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              transformOrigin: 'center top',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32">
              <polygon
                points="16,32 0,0 32,0"
                fill="white"
                stroke="rgba(226, 232, 240, 0.4)"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </CustomOverlayMap>
  );
};

export default StoreInfoWindow;
