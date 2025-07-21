import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import StoreDetailCard from '../card/StoreDetailCard';
import { useStoreDetailQuery } from '../../hooks/useMapQueries';

interface StoreInfoWindowProps {
  storeId: number;
  position: { lat: number; lng: number };
  handleToggleFavorite?: () => void;
}

const StoreInfoWindow: React.FC<StoreInfoWindowProps> = ({
  storeId,
  position,
  handleToggleFavorite,
}) => {
  const {
    data: storeDetailResponse,
    isLoading,
    error,
  } = useStoreDetailQuery(storeId);

  if (isLoading) {
    return (
      <CustomOverlayMap
        position={position}
        yAnchor={1.2}
        xAnchor={0.5}
        zIndex={1000}
      >
        <div className="bg-white p-4 rounded-lg shadow-lg relative z-50">
          <div className="animate-pulse">로딩 중...</div>
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
      yAnchor={1.25}
      xAnchor={0.5}
      zIndex={1000}
    >
      <div className="relative z-50">
        <StoreDetailCard
          storeName={storeDetail.storeName}
          isFavorite={storeDetail.isFavorite}
          favoriteCount={storeDetail.favoriteCount}
          benefits={storeDetail.benefits}
          usageLimit={storeDetail.usageLimit}
          usageMethod={storeDetail.usageMethod}
          handleToggleFavorite={handleToggleFavorite}
        />
      </div>
    </CustomOverlayMap>
  );
};

export default StoreInfoWindow;
