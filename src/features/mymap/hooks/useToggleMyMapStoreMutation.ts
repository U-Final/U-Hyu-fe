import { postToggleMyMap } from '@mymap/api/mymapApi';
import type {
  MyMapToggleStoreParams,
  MyMapToggleStoreRes,
} from '@mymap/api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MYMAP_QUERY_KEYS } from './useMyMapUuidQuery';

/**
 * My Map에 매장 추가/삭제 Mutation 훅
 */
export const useToggleMyMapStoreMutation = (uuid?: string) => {
  const queryClient = useQueryClient();

  return useMutation<MyMapToggleStoreRes, Error, MyMapToggleStoreParams>({
    mutationFn: ({ myMapListId, store_id }) =>
      postToggleMyMap(myMapListId, store_id),

    onSuccess: () => {
      if (uuid) {
        queryClient.invalidateQueries({
          queryKey: MYMAP_QUERY_KEYS.detail(uuid),
        });
      }
    },

    onError: error => {
      console.error('MyMap store toggle failed:', error.message);
    },
  });
};
