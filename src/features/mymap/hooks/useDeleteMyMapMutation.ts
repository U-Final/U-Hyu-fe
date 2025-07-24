import { deleteMyMap } from '@mymap/api/mymapApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMyMapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMyMap,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mymaplist'] });
    },
    onError: error => {
      console.error('지도 삭제 중 오류가 발생했습니다:', error);
    },
  });
};
