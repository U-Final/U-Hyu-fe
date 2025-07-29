import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getAdminBrands,
  getAdminBrandDetail,
  createAdminBrand,
  updateAdminBrand,
  deleteAdminBrand,
  type UpdateBrandRequest,
} from '../api/adminApi';

export function useAdminBrandsQuery() {
  return useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: getAdminBrands,
  });
}

export function useAdminBrandDetailQuery(brandId: number) {
  return useQuery({
    queryKey: ['admin', 'brands', brandId],
    queryFn: () => getAdminBrandDetail(brandId),
    enabled: !!brandId,
  });
}

export function useCreateAdminBrandMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createAdminBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      toast.success('브랜드가 성공적으로 추가되었습니다.');
    },
    onError: (error) => {
      console.error('브랜드 생성 실패:', error);
      toast.error('브랜드 추가에 실패했습니다.');
    },
  });
}

export function useUpdateAdminBrandMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: UpdateBrandRequest }) =>
      updateAdminBrand(brandId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      toast.success('브랜드가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('브랜드 수정 실패:', error);
      toast.error('브랜드 수정에 실패했습니다.');
    },
  });
}

export function useDeleteAdminBrandMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteAdminBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      toast.success('브랜드가 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('브랜드 삭제 실패:', error);
      toast.error('브랜드 삭제에 실패했습니다.');
    },
  });
} 