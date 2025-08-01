import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@admin/api/adminApi';
import type {
  AdminBrandUpdateRequest,
} from '@admin/api/types';

// 브랜드 생성
export const useCreateAdminBrandMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.createAdminBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
    },
  });
};

// 브랜드 수정
export const useUpdateAdminBrandMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: AdminBrandUpdateRequest }) => 
      adminApi.updateAdminBrand(brandId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
    },
  });
};

// 브랜드 삭제
export const useDeleteAdminBrandMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.deleteAdminBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
    },
  });
}; 