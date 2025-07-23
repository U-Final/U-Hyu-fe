import {
  GuestHeader,
  GuestNearbyStoresSection,
  GuestRecommendationList,
} from '@home/components';

export const GuestHomeSheetContent = () => {
  return (
    <div>
      <GuestHeader />
      <GuestRecommendationList />
      <GuestNearbyStoresSection />
    </div>
  );
};
