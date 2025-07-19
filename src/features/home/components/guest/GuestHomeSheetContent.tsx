import {
  GuestHeader,
  GuestNearbyStoresSection,
  GuestRecommendationList,
} from '@features/home/components';

export const GuestHomeSheetContent = () => {
  return (
    <div>
      <GuestHeader />
      <GuestRecommendationList />
      <GuestNearbyStoresSection />
    </div>
  );
};
