import {
  RecommendedStoreListGuest,
  RecommendedStoreListLoggedIn,
} from '@recommendation/components';
import { BeatLoader } from 'react-spinners';

import { userStore } from '@/shared/store/userStore';

export const RecommendedStoreListWrapper = () => {
  const { isAuthChecked, user } = userStore();

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
