import ActivityBenefit from '@features/mypage/components/ActivityBenefit';
import ActivityBrands from '@features/mypage/components/ActivityBrands';
import ActivityFavorite from '@features/mypage/components/ActivityFavorite';
import ActivityTabs from '@features/mypage/components/ActivityTabs';
import MyPageHeader from '@features/mypage/components/MyPageHeader';
import { MYPAGE_TABS } from '@mypage/constants/tabs';
import type { MyPageTab } from '@mypage/types';
import { mockUser } from '@mypage/types/mockUser';
import { useRef, useState } from 'react';

const MyPageActivity = () => {
  const [activeTab, setActiveTab] = useState<MyPageTab>(MYPAGE_TABS[0]);
   const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto">
      <div
        ref={scrollRef}
        className="p-[1rem] space-y-[1.5rem] pb-[6rem] h-[100vh] overflow-auto"
      >
        <MyPageHeader user={mockUser} />
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
