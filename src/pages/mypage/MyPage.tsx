import { useEffect, useState } from 'react';

import { updateUserInfo } from '@mypage/api/mypageApi';
// import MyPageMarker from '@mypage/components/MyPageMarker';
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
    // 변경사항이 있는지 확인
    if (Object.keys(pendingChanges).length === 0) {
      setisEditMode(false);
      return;
    }

    try {
      // 모든 변경사항을 한 번에 요청
      await updateUserInfo(pendingChanges);
      //       setLocalUser(prev => prev ? { ...prev, ...pendingChanges } : prev);

      // 데이터를 다시 가져와서 UI 업데이트
      await refetch();

      setPendingChanges({});
      setisEditMode(false);
      // console.log('통합 수정 요청 성공:', pendingChanges);
    } catch (err) {
      alert('수정 실패');
      console.error(err);
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
        {/* 마커 기능 제거됨
        <MyPageMarker user={localUser} setUser={setLocalUser} />
        */}
      </div>
    </div>
  );
};

export default MyPage;
