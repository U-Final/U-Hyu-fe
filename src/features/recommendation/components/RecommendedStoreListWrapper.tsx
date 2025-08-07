import {
  RecommendedStoreListGuest,
  RecommendedStoreListLoggedIn,
} from '@recommendation/components';
import { useAuthState } from '@user/store/userStore';

export const RecommendedStoreListWrapper = () => {
  const { isAuthChecked } = useAuthState();

  return isAuthChecked ? (
    <RecommendedStoreListLoggedIn />
  ) : (
    <RecommendedStoreListGuest />
  );
};
