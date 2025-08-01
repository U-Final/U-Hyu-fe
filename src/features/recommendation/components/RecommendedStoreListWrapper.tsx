import {
  RecommendedStoreListGuest,
  RecommendedStoreListLoggedIn,
} from '@recommendation/components';
import { BeatLoader } from 'react-spinners';

import { useAuthState } from '@/shared/store/userStore';

export const RecommendedStoreListWrapper = () => {
  const { user, isAuthChecked } = useAuthState();

  if (!isAuthChecked) {
    return (
      <div className="flex flex-col justify-center items-center">
        <BeatLoader size={10} />
        <p className="text-gray">유저 인증 확인 중...</p>
      </div>
    );
  }

  return user ? (
    <RecommendedStoreListLoggedIn />
  ) : (
    <RecommendedStoreListGuest />
  );
};
