import { useEffect } from 'react';

import { getMyMapUuid } from '@mymap/api/mymapApi';

import { useSharedMapStore } from '../store/SharedMapStore';

export const useInitSharedMap = (uuid?: string) => {
  const setSharedMap = useSharedMapStore(state => state.setSharedMap);
  const clearSharedMap = useSharedMapStore(state => state.clearSharedMap);

  useEffect(() => {
    if (!uuid) {
      clearSharedMap();
      return;
    }

    const fetchSharedMap = async () => {
      try {
        const data = await getMyMapUuid(uuid);
        setSharedMap({
          uuid: data.uuid,
          isMine: data.isMine,
          myMapListId: data.myMapListId,
          markerColor: data.markerColor,
          stores: data.storeList,
          title: data.title,
        });
      } catch {
        clearSharedMap();
      }
    };

    fetchSharedMap();
  }, [uuid, setSharedMap, clearSharedMap]);
};
