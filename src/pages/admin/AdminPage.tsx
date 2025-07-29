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

  // 통계 데이터 쿼리
  const { data: bookmarkStats, isLoading: bookmarkLoading } = useAdminBookmarkStatsQuery();
  const { data: filteringStats, isLoading: filteringLoading } = useAdminFilteringStatsQuery();
  const { data: recommendStats, isLoading: recommendLoading } = useAdminRecommendStatsQuery();
  const { data: membershipStats, isLoading: membershipLoading } = useAdminMembershipStatsQuery();
  const { data: totalStats, isLoading: totalLoading } = useAdminTotalStatsQuery();

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
      </div>

      <StatsTabButtons 
        tabs={TABS} 
        selectedTab={selectedTab} 
        onTabChange={setSelectedTab} 
      />

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}