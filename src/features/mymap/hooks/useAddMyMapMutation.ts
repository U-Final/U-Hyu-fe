import { addMyMap } from '@mymap/api/mymapApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * My Map 추가 Mutation 훅
 */
export const useAddMyMapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMyMap,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['mymaplist'] });
    },
  });
};
