import { useQuery } from '@tanstack/react-query';
import { fetchActivityBenefit, fetchActivityBrands, fetchActivityFavorites } from '../api/mypageApi';

export interface ActivityBenefit {
  amount: number;
}

export interface ActivityBrand {
  rank: number;
  name: string;
  image: string;
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
  return useQuery({
    queryKey: ['activityFavorites'],
    queryFn: fetchActivityFavorites,
  });
}; 