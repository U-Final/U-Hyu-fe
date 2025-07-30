import type { RecommendedRanking } from '@recommendation/recommended.types';

interface RecommendedRankingProps {
  brand: RecommendedRanking;
}

export const GuestCard = ({ brand }: RecommendedRankingProps) => {
  return (
    <div className="mx-16 flex items-center gap-10 justify-center">
      <img
        src={brand.logoImage}
        alt={brand.brandName}
        className="w-18 object-contain rounded-full"
      />
      <p className="font-bold text-h3 text-black">{brand.brandName}</p>
    </div>
  );
};
