import type { RecommendedRanking } from '@recommendation/recommended.types';

interface RecommendedRankingProps {
  brand: RecommendedRanking;
}

export const GuestCard = ({ brand }: RecommendedRankingProps) => {
  return (
    <div>
      <p>{brand.brandId}</p>
      <p>{brand.brandName}</p>
      <p>{brand.logoImage}</p>
    </div>
  );
};
