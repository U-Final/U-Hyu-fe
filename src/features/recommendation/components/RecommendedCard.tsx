import type { Store } from '@kakao-map/types/store';

import { BrandCard } from '@/shared/components';

export interface RecommendedStoreCardProps {
  store: Store;
}

const RecommendedStoreCard = ({ store }: RecommendedStoreCardProps) => {
  return (
    <BrandCard logoUrl={store.logoImage}>
      <div className="flex flex-col gap-2">
        <p className="text-black text-lg font-bold">{store.storeName}</p>
        <p className="text-black text-sm">{store.addressDetail}</p>
        <p className="text-primary font-semibold">{store.benefit}</p>
      </div>
    </BrandCard>
  );
};

export default RecommendedStoreCard;
