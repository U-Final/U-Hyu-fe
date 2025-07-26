import { updateMyMap } from '@mymap/api/mymapApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * My Map 수정 Mutation 훅
 */
export const useUpdateMyMapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyMap,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mymaplist'] });
    },
  });
};
