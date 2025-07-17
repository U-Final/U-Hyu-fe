import { useCallback } from 'react';
import { useMapContext } from '../context/MapContext';
import type { Store } from '../types/store';

export const useStoreSelection = () => {
  const { state, actions } = useMapContext();

  const handleStoreClick = useCallback(
    (store: Store) => {
      console.log('🏪 매장 선택:', store.storeName);

      // 지도를 해당 매장으로 이동
      actions.setCenter({ lat: store.latitude, lng: store.longitude });
      actions.selectStore(store);

      // 매장 클릭 시 리스트 화면으로 돌아가기
      if (state.currentBottomSheetStep !== 'list') {
        actions.setBottomSheetStep('list');
      }
    },
    [state.currentBottomSheetStep, actions]
  );

  return {
    selectedStore: state.selectedStore,
    stores: state.stores,
    handleStoreClick,
    selectStore: actions.selectStore,
  };
};
