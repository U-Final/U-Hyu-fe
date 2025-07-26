import { getStoreBookmarkStatus } from '@mymap/api/mymapApi';
import type { StoreBookmarkStatusRes } from '@mymap/api/types';
import { useQuery } from '@tanstack/react-query';

export const STORE_BOOKMARK_STATUS_QUERY_KEY = (storeId: number) =>
  ['storeBookmarkStatus', storeId] as const;

export const useStoreBookmarkStatusQuery = (storeId: number) => {
  return useQuery<StoreBookmarkStatusRes, Error>({
    queryKey: STORE_BOOKMARK_STATUS_QUERY_KEY(storeId),
    queryFn: () => getStoreBookmarkStatus(storeId),
    enabled: !!storeId,
  });
};
