import React from 'react';

import AddStoreModal from '@mymap/components/modal/AddStoreModal';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import { useModalStore } from '@/shared/store';

import { useStoreDetailQuery } from '../../hooks/useMapQueries';
import StoreDetailCard from '../card/StoreDetailCard';

interface StoreInfoWindowProps {
  storeId: number;
  position: { lat: number; lng: number };
  handleToggleFavorite?: () => void;
}

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
      <div
        className="relative z-50"
        onClick={e => {
          e.stopPropagation();
        }}
        onMouseDown={e => {
          e.stopPropagation();
        }}
        onMouseUp={e => {
          e.stopPropagation();
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
      </div>
    </CustomOverlayMap>
  );
};

export default StoreInfoWindow;
