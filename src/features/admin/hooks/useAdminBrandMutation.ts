import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAdminBrand, updateAdminBrand, deleteAdminBrand } from '@admin/api/adminApi';
import type { CreateBrandRequest, UpdateBrandRequest } from '@admin/api/types';

export const useAdminBrandMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateBrandRequest) => createAdminBrand(data),
    onSuccess: () => {
      // 브랜드 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
    },
    onError: (error) => {
      console.error('브랜드 생성 실패:', error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: UpdateBrandRequest }) =>
      updateAdminBrand(brandId, data),
    onSuccess: () => {
      // 브랜드 목록 및 상세 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'brand'] });
    },
    onError: (error) => {
      console.error('브랜드 수정 실패:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (brandId: number) => deleteAdminBrand(brandId),
    onSuccess: () => {
      // 브랜드 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
    },
    onError: (error) => {
      console.error('브랜드 삭제 실패:', error);
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}; 