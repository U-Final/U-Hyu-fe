import { postToggleMyMap } from '@mymap/api/mymapApi';
import type {
  MyMapToggleStoreParams,
  MyMapToggleStoreRes,
} from '@mymap/api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const MYMAP_STORE_LIST_QUERY_KEY = (id: number) =>
  ['myMapStoreList', id] as const;

export const useToggleMyMapStoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<MyMapToggleStoreRes, Error, MyMapToggleStoreParams>({
    mutationFn: ({ myMapListId, store_id }) =>
      postToggleMyMap(myMapListId, store_id),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: MYMAP_STORE_LIST_QUERY_KEY(variables.myMapListId),
      });
    },

    onError: error => {
      console.error('MyMap store toggle failed:', error.message);
    },
  });
};
