import { useState } from 'react';
import { 
  BookmarkIcon, 
  FunnelIcon, 
  HeartIcon, 
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StatsSummaryCards, StatsSkeleton, ChartSkeleton, AdminToggleTabs, CategoryFilter } from '@admin/components/common';
import { 
  BookmarkChart, 
  FilteringChart, 
  RecommendChart, 
  MembershipChart 
} from '@admin/components/stats';
import { AdminBrandList } from '@admin/components/brand';
import { FilterTabs } from '@/shared/components';
import { 
  useAdminBookmarkStatsQuery,
  useAdminFilteringStatsQuery,
  useAdminRecommendStatsQuery,
  useAdminMembershipStatsQuery,
  useAdminTotalStatsQuery,
} from '@admin/hooks';
import type { CategoryId } from '@admin/constants/categories';

type TabKey = 'bookmark' | 'filtering' | 'recommendation' | 'membership';

const STATS_TABS = [
  { label: '저장된 매장', value: 'bookmark', icon: BookmarkIcon, color: 'var(--admin-bookmark)' },
  { label: '필터링', value: 'filtering', icon: FunnelIcon, color: 'var(--admin-filtering)' },
  { label: '추천', value: 'recommendation', icon: HeartIcon, color: 'var(--admin-recommendation)' },
  { label: '멤버십', value: 'membership', icon: UserGroupIcon, color: 'var(--admin-membership)' },
];

export default function AdminPage() {
  const [mainTab, setMainTab] = useState<'stats' | 'brands'>('stats');
  const [selectedStatsTab, setSelectedStatsTab] = useState<TabKey>('bookmark');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  const { data: totalStats, isLoading: totalLoading, refetch: refetchTotalStats } = useAdminTotalStatsQuery();

  const { data: bookmarkStats, isLoading: bookmarkLoading, refetch: refetchBookmarkStats } = useAdminBookmarkStatsQuery({
    enabled: mainTab === 'stats' && selectedStatsTab === 'bookmark'
  });
  
  const { data: filteringStats, isLoading: filteringLoading, refetch: refetchFilteringStats } = useAdminFilteringStatsQuery({
    enabled: mainTab === 'stats' && selectedStatsTab === 'filtering'
  });
  
  const { data: recommendStats, isLoading: recommendLoading, refetch: refetchRecommendStats } = useAdminRecommendStatsQuery({
    enabled: mainTab === 'stats' && selectedStatsTab === 'recommendation'
  });
  
  const { data: membershipStats, isLoading: membershipLoading, refetch: refetchMembershipStats } = useAdminMembershipStatsQuery({
    enabled: mainTab === 'stats' && selectedStatsTab === 'membership'
  });



  const handleStatsTabChange = (tab: string) => {
    const newTab = tab as TabKey;
    setSelectedStatsTab(newTab);
    setSelectedCategory('all');
    refetchTotalStats();
    
    switch (newTab) {
      case 'bookmark':
        refetchBookmarkStats();
        break;
      case 'filtering':
        refetchFilteringStats();
        break;
      case 'recommendation':
        refetchRecommendStats();
        break;
      case 'membership':
        refetchMembershipStats();
        break;
    }
  };

  const handleMainTabChange = (tab: string) => {
    const newTab = tab as 'stats' | 'brands';
    setMainTab(newTab);
    
    if (newTab === 'stats') {
      setSelectedStatsTab('bookmark');
      setSelectedCategory('all');
      refetchTotalStats();
      refetchBookmarkStats();
    }
  };

  const renderStatsContent = () => {
    if (selectedStatsTab === 'bookmark') {
      if (bookmarkLoading) return <ChartSkeleton />;
      return <BookmarkChart data={bookmarkStats || []} selectedCategory={selectedCategory.toString()} />;
    }

    if (selectedStatsTab === 'filtering') {
      if (filteringLoading) return <ChartSkeleton />;
      return <FilteringChart data={filteringStats || []} selectedCategory={selectedCategory.toString()} />;
    }

    if (selectedStatsTab === 'recommendation') {
      if (recommendLoading) return <ChartSkeleton />;
      return <RecommendChart data={recommendStats || []} selectedCategory={selectedCategory.toString()} />;
    }

    if (selectedStatsTab === 'membership') {
      if (membershipLoading) return <ChartSkeleton />;
      return <MembershipChart data={membershipStats || []} selectedCategory={selectedCategory.toString()} />;
    }

    return null;
  };

  const renderContent = () => {
    if (mainTab === 'brands') {
      return <AdminBrandList />;
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">전체 통계</h2>
          {totalLoading ? (
            <StatsSkeleton />
          ) : (
            totalStats && <StatsSummaryCards totalStats={totalStats} />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">상세 통계</h2>
          <FilterTabs 
            tabs={STATS_TABS}
            onChange={handleStatsTabChange}
            variant="gray"
          />
        </div>

        {selectedStatsTab !== 'filtering' && (
          <div>
            <h3 className="text-sm font-medium mb-3">카테고리별 필터</h3>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}

        <div className="mt-6 mb-10">
          {renderStatsContent()}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-28">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
      </div>

      <AdminToggleTabs 
        activeTab={mainTab}
        setActiveTab={handleMainTabChange}
      />

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}