import type { Store } from '@kakao-map/types/store';
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
    onSuccess: (res, brandId) => {
      toast.success(res.message || '추천 목록에서 제외했습니다.');

      // ✅ 동일 브랜드 매장을 추천 목록에서 제거
      queryClient.setQueryData<Store[]>(
        ['recommendStoresByLocation'],
        oldData => {
          if (!oldData) return [];
          return oldData.filter(item => item.storeId !== brandId);
        }
      );
    },
    onError: () => {
      toast.error('처리 중 오류가 발생했습니다.');
    },
  });
};
