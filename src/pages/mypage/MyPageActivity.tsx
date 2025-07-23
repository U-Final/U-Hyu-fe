import { useRef, useState } from 'react';

import { useUserInfo } from '@/features/user';
import ActivityBenefit from '@mypage/components/ActivityBenefit';
import ActivityBrands from '@mypage/components/ActivityBrands';
import ActivityFavorite from '@mypage/components/ActivityFavorite';
import ActivityTabs from '@mypage/components/ActivityTabs';
import MyPageHeader from '@mypage/components/MyPageHeader';
import { MYPAGE_TABS } from '@mypage/constants/tabs';
import type { MyPageTab } from '@mypage/types';
import type { UserInfo } from '@mypage/types/types';

const MyPageActivity = () => {
  const [activeTab, setActiveTab] = useState<MyPageTab>(MYPAGE_TABS[0]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { data: userResponse, isLoading, error } = useUserInfo();

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen max-w-[22.5rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !userResponse?.data) {
    return (
      <div className="min-h-screen max-w-[22.5rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            사용자 정보를 불러오는데 실패했습니다.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const user = userResponse.data;

  // mypage 전용 필드를 가진 사용자 정보로 변환
  const mypageUser: UserInfo = {
    ...user,
    favoriteBrands: [], // 기본값 설정
    markers: ['marker1.png'], // 기본값 설정
  };

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto">
      <div
        ref={scrollRef}
        className="p-[1rem] space-y-[1.5rem] pb-[6rem] h-[100vh] overflow-auto"
      >
        <MyPageHeader user={mypageUser} />
        <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === MYPAGE_TABS[0] ? (
          <>
            <ActivityBenefit />
            <ActivityBrands />
          </>
        ) : (
          <ActivityFavorite scrollRef={scrollRef} />
        )}
      </div>
    </div>
  );
};

export default MyPageActivity;
