import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createAdminBrand,
  updateAdminBrand,
  deleteAdminBrand,
} from '@admin/api';
import type { UpdateBrandRequest } from '@admin/api/types';

// 브랜드 생성 뮤테이션
export function useCreateAdminBrandMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminBrand,
    onSuccess: () => {
      // 브랜드 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      toast.success('브랜드가 성공적으로 추가되었습니다.');
    },
    onError: (error) => {
      console.error('브랜드 생성 실패:', error);
      toast.error('브랜드 추가에 실패했습니다.');
    },
  });
}

// 브랜드 수정 뮤테이션
export function useUpdateAdminBrandMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: UpdateBrandRequest }) =>
      updateAdminBrand(brandId, data),
    onSuccess: (_, { brandId }) => {
      // 브랜드 목록과 상세 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands', brandId] });
      toast.success('브랜드가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('브랜드 수정 실패:', error);
      toast.error('브랜드 수정에 실패했습니다.');
    },
  });
}

// 브랜드 삭제 뮤테이션
export function useDeleteAdminBrandMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminBrand,
    onSuccess: () => {
      // 브랜드 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      toast.success('브랜드가 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('브랜드 삭제 실패:', error);
      toast.error('브랜드 삭제에 실패했습니다.');
    },
  });
} 