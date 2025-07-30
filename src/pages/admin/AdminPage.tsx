import { useState } from 'react';
import { 
  BookmarkIcon, 
  FunnelIcon, 
  HeartIcon, 
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StatsSummaryCards, StatsSkeleton, ChartSkeleton, AdminToggleTabs, CategoryFilter } from '@/features/admin/components/common';
import { 
  BookmarkChart, 
  FilteringChart, 
  RecommendChart, 
  MembershipChart 
} from '@/features/admin/components/stats';
import { AdminBrandList } from '@/features/admin/components/brand';
import FilterTabs from '@/shared/components/filter_tabs/FilterTabs';
import { 
  useAdminBookmarkStatsQuery,
  useAdminFilteringStatsQuery,
  useAdminRecommendStatsQuery,
  useAdminMembershipStatsQuery,
  useAdminTotalStatsQuery
} from '@/features/admin/hooks/useAdminStatsQuery';
import type { TabKey } from '@/features/admin/api/types';
import type { CategoryId } from '@/features/admin/constants/categories';

// 통계 탭 정의
const STATS_TABS = [
  { label: '즐겨찾기', value: 'bookmark', icon: BookmarkIcon, color: 'var(--admin-bookmark)' },
  { label: '필터링', value: 'filtering', icon: FunnelIcon, color: 'var(--admin-filtering)' },
  { label: '추천', value: 'recommendation', icon: HeartIcon, color: 'var(--admin-recommendation)' },
  { label: '멤버십', value: 'membership', icon: UserGroupIcon, color: 'var(--admin-membership)' },
];



export default function AdminPage() {
  const [mainTab, setMainTab] = useState<'stats' | 'brands'>('stats');
  const [selectedStatsTab, setSelectedStatsTab] = useState<TabKey>('bookmark');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  // 통계 데이터 쿼리 - 즐겨찾기와 전체만 초기 요청
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

  // 통계 탭 변경 핸들러
  const handleStatsTabChange = (tab: string) => {
    setSelectedStatsTab(tab as TabKey);
    setSelectedCategory('all'); // 카테고리별 필터를 전체로 초기화
    
    // 탭 변경 시 해당 데이터와 전체 데이터 refetch
    if (import.meta.env.DEV) {
      console.log('🔄 관리자 페이지 통계 탭 변경:', tab);
    }
    
    switch (tab) {
      case 'bookmark':
        refetchBookmark();
        refetchTotal();
        break;
      case 'filtering':
        refetchFiltering();
        refetchTotal();
        break;
      case 'recommendation':
        refetchRecommend();
        refetchTotal();
        break;
      case 'membership':
        refetchMembership();
        refetchTotal();
        break;
    }
  };

  // 메인 탭 변경 핸들러
  const handleMainTabChange = (tab: string) => {
    setMainTab(tab as 'stats' | 'brands');
  };

  const renderStatsContent = () => {
    if (selectedStatsTab === 'bookmark') {
      if (bookmarkLoading) return <ChartSkeleton />;
      return <BookmarkChart data={bookmarkStats || []} selectedCategory={selectedCategory} />;
    }

    if (selectedStatsTab === 'filtering') {
      if (filteringLoading) return <ChartSkeleton />;
      return <FilteringChart data={filteringStats || []} selectedCategory={selectedCategory} />;
    }

    if (selectedStatsTab === 'recommendation') {
      if (recommendLoading) return <ChartSkeleton />;
      return <RecommendChart data={recommendStats || []} selectedCategory={selectedCategory} />;
    }

    if (selectedStatsTab === 'membership') {
      if (membershipLoading) return <ChartSkeleton />;
      return <MembershipChart data={membershipStats || []} selectedCategory={selectedCategory} />;
    }

    return null;
  };

  const renderContent = () => {
    if (mainTab === 'brands') {
      return <AdminBrandList />;
    }

    return (
      <div className="space-y-6">
        {/* 전체 통계 카드 - 항상 표시 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">전체 통계</h2>
          {totalLoading ? (
            <StatsSkeleton />
          ) : (
            totalStats && <StatsSummaryCards totalStats={totalStats} />
          )}
        </div>

        {/* 통계 탭 버튼 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">상세 통계</h2>
          <FilterTabs 
            tabs={STATS_TABS}
            onChange={handleStatsTabChange}
            variant="gray"
          />
        </div>

        {/* 카테고리 필터 - 필터링 통계에서는 숨김 */}
        {selectedStatsTab !== 'filtering' && (
          <div>
            <h3 className="text-sm font-medium mb-3">카테고리별 필터</h3>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}

        {/* 선택된 통계 차트 */}
        <div className="mt-6">
          {renderStatsContent()}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
      </div>

      {/* 메인 토글 탭 (통계/브랜드 관리) */}
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