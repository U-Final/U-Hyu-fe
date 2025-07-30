import type { RecommendedRanking } from '@recommendation/Recommendation.types';

interface RecommendedRankingProps {
  brand: RecommendedRanking;
}

export const GuestCard = ({ brand }: RecommendedRankingProps) => {
  return (
    <div className="grid grid-cols-2 items-center w-full">
      <div className="flex justify-end mr-8">
        <img
          src={brand.logoImage}
          alt={brand.brandName}
          className="w-24 object-contain rounded-full"
        />
      </div>

      <div className="flex justify-start items-center ml-8">
        <p className="font-bold text-h3 text-black text-center">
          {brand.brandName}
        </p>
      </div>
    </div>
  );
};
