import { useState } from 'react';
import { 
  BookmarkIcon, 
  FunnelIcon, 
  HeartIcon, 
  UserGroupIcon,
  ChartBarIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { StatsSummaryCards, StatsTabButtons, StatsSkeleton, ChartSkeleton } from '@/features/admin/components/common';
import { 
  BookmarkChart, 
  FilteringChart, 
  RecommendChart, 
  MembershipChart 
} from '@/features/admin/components/stats';
import { AdminBrandList } from '@/features/admin/components/brand';
import { 
  useAdminBookmarkStatsQuery,
  useAdminFilteringStatsQuery,
  useAdminRecommendStatsQuery,
  useAdminMembershipStatsQuery,
  useAdminTotalStatsQuery
} from '@/features/admin/hooks/useAdminStatsQuery';
import type { Tab, TabKey } from '@/features/admin/api/types';

const TABS: Tab[] = [
  {
    key: 'bookmark',
    label: '즐겨찾기',
    icon: BookmarkIcon,
  },
  {
    key: 'filtering',
    label: '필터링',
    icon: FunnelIcon,
  },
  {
    key: 'recommendation',
    label: '추천',
    icon: HeartIcon,
  },
  {
    key: 'membership',
    label: '멤버십',
    icon: UserGroupIcon,
  },
  {
    key: 'total',
    label: '전체',
    icon: ChartBarIcon,
  },
  {
    key: 'brands',
    label: '브랜드 관리',
    icon: BuildingStorefrontIcon,
  },
];

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<TabKey>('total');

  // 탭 변경 핸들러 - 탭 변경 시 해당 데이터 새로 가져오기
  const handleTabChange = (tab: TabKey) => {
    setSelectedTab(tab);
    
    // 탭 변경 시 해당 데이터 refetch
    if (import.meta.env.DEV) {
      console.log('🔄 관리자 페이지 탭 변경:', tab);
    }
    
    switch (tab) {
      case 'bookmark':
        refetchBookmark();
        break;
      case 'filtering':
        refetchFiltering();
        break;
      case 'recommendation':
        refetchRecommend();
        break;
      case 'membership':
        refetchMembership();
        break;
      case 'total':
        refetchTotal();
        break;
    }
  };

  // 통계 데이터 쿼리 - 페이지 로드 시 모든 데이터 자동으로 가져오기
  const { data: bookmarkStats, isLoading: bookmarkLoading, refetch: refetchBookmark } = useAdminBookmarkStatsQuery();
  const { data: filteringStats, isLoading: filteringLoading, refetch: refetchFiltering } = useAdminFilteringStatsQuery();
  const { data: recommendStats, isLoading: recommendLoading, refetch: refetchRecommend } = useAdminRecommendStatsQuery();
  const { data: membershipStats, isLoading: membershipLoading, refetch: refetchMembership } = useAdminMembershipStatsQuery();
  const { data: totalStats, isLoading: totalLoading, refetch: refetchTotal } = useAdminTotalStatsQuery();

  // 개발 환경에서 데이터 로딩 상태 로깅
  if (import.meta.env.DEV) {
    console.log('🔍 관리자 페이지 데이터 로딩 상태:', {
      bookmarkLoading,
      filteringLoading,
      recommendLoading,
      membershipLoading,
      totalLoading,
      bookmarkStats: bookmarkStats?.length || 0,
      filteringStats: filteringStats?.length || 0,
      recommendStats: recommendStats?.length || 0,
      membershipStats: membershipStats?.length || 0,
      totalStats,
    });
  }

  const renderContent = () => {
    if (selectedTab === 'brands') {
      return <AdminBrandList />;
    }

    if (selectedTab === 'total') {
      if (totalLoading) return <StatsSkeleton />;
      if (!totalStats) return <div>데이터가 없습니다.</div>;
      return <StatsSummaryCards totalStats={totalStats} />;
    }

    if (selectedTab === 'bookmark') {
      if (bookmarkLoading) return <ChartSkeleton />;
      return <BookmarkChart data={bookmarkStats || []} />;
    }

    if (selectedTab === 'filtering') {
      if (filteringLoading) return <ChartSkeleton />;
      return <FilteringChart data={filteringStats || []} />;
    }

    if (selectedTab === 'recommendation') {
      if (recommendLoading) return <ChartSkeleton />;
      return <RecommendChart data={recommendStats || []} />;
    }

    if (selectedTab === 'membership') {
      if (membershipLoading) return <ChartSkeleton />;
      return <MembershipChart data={membershipStats || []} />;
    }

    return null;
  };

  // 전체 로딩 상태 확인
  const isAnyLoading = bookmarkLoading || filteringLoading || recommendLoading || membershipLoading || totalLoading;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
      </div>

      <StatsTabButtons 
        tabs={TABS} 
        selectedTab={selectedTab} 
        onTabChange={handleTabChange} 
      />

      <div className="mt-6">
        {isAnyLoading && selectedTab === 'total' ? (
          <StatsSkeleton />
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}