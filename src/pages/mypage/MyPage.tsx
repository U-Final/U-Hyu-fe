import { useUserInfoQuery } from '@features/mypage/hooks/useUserInfoQuery';
import { useEffect, useState } from 'react';

import MyPageHeader from '@features/mypage/components/MyPageHeader';
import MyPageUserInfo from '@features/mypage/components/MyPageUserInfo';
import MyPageMembership from '@features/mypage/components/MyPageMembership';
import MyPageBrand from '@features/mypage/components/MyPageBrand';
import MyPageMarker from '@features/mypage/components/MyPageMarker';
import type { UserInfo } from '@features/mypage/api/types';

const MyPage = () => {
  const { data: user, isLoading, error } = useUserInfoQuery();
  const [localUser, setLocalUser] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);

  if (isLoading) return <div>로딩중...</div>;
  if (error || !localUser) return <div>에러 발생</div>;

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto">
      <div className="p-[1rem] space-y-[1.5rem] pb-[6rem]">
        <MyPageHeader user={localUser} onProfileImageChange={(newImage) => setLocalUser((prev) => prev ? { ...prev, profileImage: newImage } : prev)} />
        <MyPageUserInfo user={localUser} setUser={setLocalUser} />
        <MyPageMembership user={localUser} setUser={setLocalUser} />
        <MyPageBrand user={localUser} setUser={setLocalUser} />
        <MyPageMarker user={localUser} setUser={setLocalUser} />
      </div>
    </div>
  );
};

export default MyPage;
