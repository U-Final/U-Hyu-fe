import { useUserInfoQuery } from '@mypage/hooks/useUserInfoQuery';
import { useActivityStatisticsQuery, useBookmarkListInfiniteQuery } from '@mypage/hooks/useActivityQuery';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ActivityBenefit from '@mypage/components/ActivityBenefit';
import ActivityBrands from '@mypage/components/ActivityBrands';
import ActivityFavorite from '@mypage/components/ActivityFavorite';
import ActivityTabs from '@mypage/components/ActivityTabs';
import MyPageHeader from '@mypage/components/MyPageHeader';
import { MYPAGE_TABS } from '@mypage/constants/tabs';
import type { MyPageTab } from '@mypage/types';

const MyPageActivity = () => {
  const location = useLocation();
  const { data: user, isLoading, error, refetch: refetchUserInfo } = useUserInfoQuery();
  const [activeTab, setActiveTab] = useState<MyPageTab>(MYPAGE_TABS[0]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 각 탭별 refetch 함수 준비
  const { refetch: refetchStatistics } = useActivityStatisticsQuery();
  const { refetch: refetchBookmarks } = useBookmarkListInfiniteQuery(activeTab === MYPAGE_TABS[1]);

  // 페이지 이동(경로 변경) 시 모든 쿼리 refetch
  useEffect(() => {
    refetchUserInfo();
    refetchStatistics();
    refetchBookmarks();
  }, [location.pathname, refetchUserInfo, refetchStatistics, refetchBookmarks]);

  // 탭 클릭 시 해당 refetch 호출
  const handleTabClick = useCallback((tab: MyPageTab) => {
    setActiveTab(tab);
    if (tab === MYPAGE_TABS[0]) refetchStatistics();
    if (tab === MYPAGE_TABS[1]) refetchBookmarks();
  }, [refetchStatistics, refetchBookmarks]);

  if (isLoading) return <div>로딩중...</div>;
  if (error || !user) return <div>에러 발생</div>;

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto">
      <div
        ref={scrollRef}
        className="p-[1rem] space-y-[1.5rem] pb-[6rem] overflow-auto"
      >
        <MyPageHeader user={user} />
        <ActivityTabs activeTab={activeTab} setActiveTab={handleTabClick} />
        {activeTab === MYPAGE_TABS[0] ? (
          <>
            <ActivityBenefit />
            <ActivityBrands />
          </>
        ) : (
          <ActivityFavorite enabled={activeTab === MYPAGE_TABS[1]} />
        )}
      </div>
    </div>
  );
};

export default MyPageActivity;
