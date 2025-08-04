import {
  RecommendedStoreListGuest,
  RecommendedStoreListLoggedIn,
} from '@recommendation/components';

import { useAuthState } from '@/shared/store/userStore';

export const RecommendedStoreListWrapper = () => {
  const { isAuthChecked } = useAuthState();

  return isAuthChecked ? (
    <RecommendedStoreListLoggedIn />
  ) : (
    <RecommendedStoreListGuest />
  );
};
