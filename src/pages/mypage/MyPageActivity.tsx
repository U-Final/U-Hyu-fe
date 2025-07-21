import { useRef, useState } from 'react';
import MyPageHeader from '@mypage/components/MyPageHeader';
import ActivityTabs from '@mypage/components/ActivityTabs';
import ActivityBenefit from '@mypage/components/ActivityBenefit';
import ActivityBrands from '@mypage/components/ActivityBrands';
import ActivityFavorite from '@mypage/components/ActivityFavorite';
import { mockUser } from '@mypage/types/mockUser';
import type { MyPageTab } from '@mypage/types';
import { MYPAGE_TABS } from '@mypage/constants/tabs';

const MyPageActivity = () => {
  const [activeTab, setActiveTab] = useState<MyPageTab>(MYPAGE_TABS[0]);
   const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto bg-gray-50">
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
