import { useState } from 'react';

import MyPageBrand from '@mypage/components/MyPageBrand';
import MyPageHeader from '@mypage/components/MyPageHeader';
import MyPageMarker from '@mypage/components/MyPageMarker';
import MyPageMembership from '@mypage/components/MyPageMembership';
import MyPageUserInfo from '@mypage/components/MyPageUserInfo';
import { mockUser } from '@mypage/mock/mockUser';
import type { UserInfo } from '@mypage/types/types';

const MyPage = () => {
  const [user, setUser] = useState<UserInfo>(mockUser);

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto">
      <div className="p-[1rem] space-y-[1.5rem] pb-[6rem]">
        <MyPageHeader user={user} />
        <MyPageUserInfo user={user} setUser={setUser} />
        <MyPageMembership user={user} setUser={setUser} />
        <MyPageBrand user={user} setUser={setUser} />
        <MyPageMarker user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default MyPage;
