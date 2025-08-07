import {
  AuthBenefitsSection,
  AuthHeader,
  AuthNearbyStoresSection,
  AuthRecommendationList,
} from '@home/components';

export const AuthHomeSheetContent = () => {
  return (
    <div>
      <AuthHeader />
      <AuthRecommendationList />
      <AuthNearbyStoresSection />
      <AuthBenefitsSection />
    </div>
  );
};
