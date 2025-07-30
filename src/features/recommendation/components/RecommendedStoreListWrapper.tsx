import {
  RecommendedStoreListGuest,
  RecommendedStoreListLoggedIn,
} from '@recommendation/components';

import { useIsLoggedIn } from '@/shared/store/userStore';

export const RecommendedStoreListWrapper = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? (
    <RecommendedStoreListLoggedIn />
  ) : (
    <RecommendedStoreListGuest />
  );
};
