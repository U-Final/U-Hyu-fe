import { postRecommendExclude } from '@recommendation/api/recommendedStoresApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * 특정 브랜드를 추천 목록에서 제외하는 Mutation Hook
 */
export const useRecommendExcludeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brandId: number) => postRecommendExclude(brandId),
    onSuccess: res => {
      toast.success(res.message || '추천 목록에서 제외했습니다.');
      queryClient.invalidateQueries({
        queryKey: ['recommendStoresByLocation'],
      });
    },
  });
};
