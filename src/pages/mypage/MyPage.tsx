import { useEffect, useState } from 'react';

import { updateUserInfo } from '@mypage/api/mypageApi';
import type { UpdateUserRequest, UserInfoData } from '@mypage/api/types';
import MyPageBrand from '@mypage/components/MyPageBrand';
import MyPageHeader from '@mypage/components/MyPageHeader';
import MyPageMembership from '@mypage/components/MyPageMembership';
import MyPageUserInfo from '@mypage/components/MyPageUserInfo';
import { useUserInfoQuery } from '@mypage/hooks/useUserInfoQuery';

import { MyPageSkeleton } from '@/shared/components/skeleton';

const MyPage = () => {
  const { data: user, isLoading, error, refetch } = useUserInfoQuery();
  const [localUser, setLocalUser] = useState<UserInfoData | undefined>(
    undefined
  );
  const [isEditMode, setisEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<UpdateUserRequest>({});

  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);

  const handleSaveAll = async () => {
    if (Object.keys(pendingChanges).length === 0) {
      setisEditMode(false);
      return;
    }

    try {
      await updateUserInfo(pendingChanges);
      await refetch();

      setPendingChanges({});
      setisEditMode(false);
    } catch {
      alert('수정 실패');
    }
  };

  if (isLoading) return <MyPageSkeleton />;
  if (error || !localUser) return <div>에러 발생</div>;

  return (
    <div className="min-h-screen">
      <div className="space-y-[1.5rem] pb-[6rem]">
        <MyPageHeader user={localUser} />
        <MyPageUserInfo
          user={localUser}
          isEditMode={isEditMode}
          setisEditMode={setisEditMode}
          setPendingChanges={setPendingChanges}
          onSaveAll={handleSaveAll}
        />
        <MyPageMembership
          user={localUser}
          isEditMode={isEditMode}
          pendingChanges={pendingChanges}
          setPendingChanges={setPendingChanges}
        />
        <MyPageBrand
          user={localUser}
          isEditMode={isEditMode}
          pendingChanges={pendingChanges}
          setPendingChanges={setPendingChanges}
        />
      </div>
    </div>
  );
};

export default MyPage;
