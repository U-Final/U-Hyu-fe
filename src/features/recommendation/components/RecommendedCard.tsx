import type { RecommendStore } from '@recommendation/api/recommendedStores.types';

import { BrandCard } from '@/shared/components';

interface RecommendedStoreCardProps {
  store: RecommendStore;
}

const RecommendedStoreCard = ({ store }: RecommendedStoreCardProps) => {
  return (
    <BrandCard logoUrl={store.logoImage}>
      <div className="flex flex-col gap-2">
        <p className="text-black text-lg font-bold">{store.store_name}</p>
        <p className="text-black text-sm">{store.addr_detail}</p>
        <p className="text-primary font-semibold">{store.description}</p>
      </div>
    </BrandCard>
  );
};

export default RecommendedStoreCard;
