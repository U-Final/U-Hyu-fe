import { deleteMyMap } from '@mymap/api/mymapApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * My Map 삭제 Mutation 훅
 */
export const useDeleteMyMapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMyMap,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['mymaplist'] });
    },
    onError: error => {
      console.error('지도 삭제 중 오류가 발생했습니다:', error);
    },
  });
};
