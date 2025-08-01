import {
  RecommendedStoreListGuest,
  RecommendedStoreListLoggedIn,
} from '@recommendation/components';

import { useAuthState } from '@/shared/store/userStore';

export const RecommendedStoreListWrapper = () => {
  const { user } = useAuthState();

  return user ? (
    <RecommendedStoreListLoggedIn />
  ) : (
    <RecommendedStoreListGuest />
  );
};
