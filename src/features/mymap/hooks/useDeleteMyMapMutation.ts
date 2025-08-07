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
    onError: () => {
      // 에러는 상위 컴포넌트에서 처리됨
    },
  });
};
