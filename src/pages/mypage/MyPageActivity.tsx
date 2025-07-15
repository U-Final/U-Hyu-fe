import { useState } from 'react';
import MyPageHeader from '@/features/mypage/components/MyPageHeader';
import ActivityTabs from '@/features/mypage/components/ActivityTabs';
import ActivityBenefit from '@/features/mypage/components/ActivityBenefit';
import ActivityBrands from '@/features/mypage/components/ActivityBrands';
import FavoriteBrands from '@/features/mypage/components/ActivityFavorite';

import { mockUser } from '@mypage/mock/mockUser';

const MyPageActivity = () => {
  const [activeTab, setActiveTab] = useState('활동 내역');

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto bg-gray-50">
      <div className="p-[1rem] space-y-[1.5rem] pb-[6rem]">
        <MyPageHeader user={mockUser} />
        <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === '활동 내역' ? (
          <>
            <ActivityBenefit />
            <ActivityBrands />
          </>
        ) : (
           <FavoriteBrands />
        )}
      </div>
    </div>
  );
};

export default MyPageActivity;

