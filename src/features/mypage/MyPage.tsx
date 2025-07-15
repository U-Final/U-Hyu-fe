import { useState } from 'react';
import { mockUser } from '@mypage/mock/mockUser';
import type { UserInfo } from '@mypage/types';

import MyPageHeader from '@/features/mypage/components/MyPageHeader';
import MyPageUserInfo from '@/features/mypage/components/MyPageUserInfo';
import MyPageMembership from '@/features/mypage/components/MyPageMembership';
import MyPageBrand from '@/features/mypage/components/MyPageBrand';
import MyPageMarker from '@/features/mypage/components/MyPageMarker';

const MyPage = () => {
  const [user, setUser] = useState<UserInfo>(mockUser);

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto bg-gray-50">
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
