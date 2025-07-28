import { useQuery } from '@tanstack/react-query';
import { fetchActivityBenefit, fetchActivityBrands, fetchActivityFavorites } from '../api/mypageApi';
import type { ActivityBenefit, ActivityBrand } from '../api/types';

interface FavoriteBrand {
  id: number;
  image: string;
  name: string;
  description: string;
  isFavorite: boolean;
}

export const useActivityBenefitQuery = () => {
  return useQuery<ActivityBenefit>({
    queryKey: ['activityBenefit'],
    queryFn: fetchActivityBenefit,
  });
};

export const useActivityBrandsQuery = () => {
  return useQuery<ActivityBrand[]>({
    queryKey: ['activityBrands'],
    queryFn: fetchActivityBrands,
  });
};

export const useActivityFavoritesQuery = () => {
  return useQuery<FavoriteBrand[]>({
    queryKey: ['activityFavorites'],
    queryFn: fetchActivityFavorites,
  });
}; 