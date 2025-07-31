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
import { NewAdminBrandList } from '@admin/components/brand/NewAdminBrandList';
import { FilterTabs } from '@/shared/components';
import { 
  useAdminBookmarkStatsQuery,
  useAdminFilteringStatsQuery,
  useAdminRecommendStatsQuery,
  useAdminMembershipStatsQuery,
  useAdminTotalStatsQuery,
  useAdminBrandsQuery
} from '@admin/hooks';
import type { TabKey } from '@admin/api/types';
import type { CategoryId } from '@admin/constants/categories';

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

  // 통계 데이터 쿼리 - 조건부 호출 및 refetch 함수 포함
  const { data: bookmarkStats, isLoading: bookmarkLoading, refetch: refetchBookmark } = useAdminBookmarkStatsQuery(mainTab === 'stats');
  const { data: totalStats, isLoading: totalLoading, refetch: refetchTotal } = useAdminTotalStatsQuery(mainTab === 'stats');
  
  // 다른 통계들은 해당 탭이 선택될 때만 호출
  const { data: filteringStats, isLoading: filteringLoading, refetch: refetchFiltering } = useAdminFilteringStatsQuery(
    mainTab === 'stats' && selectedStatsTab === 'filtering'
  );
  const { data: recommendStats, isLoading: recommendLoading, refetch: refetchRecommend } = useAdminRecommendStatsQuery(
    mainTab === 'stats' && selectedStatsTab === 'recommendation'
  );
  const { data: membershipStats, isLoading: membershipLoading, refetch: refetchMembership } = useAdminMembershipStatsQuery(
    mainTab === 'stats' && selectedStatsTab === 'membership'
  );
  
  // 브랜드 데이터 쿼리 - 브랜드 탭일 때만 호출
  const { data: brandsData, isLoading: brandsLoading, refetch: refetchBrands } = useAdminBrandsQuery(mainTab === 'brands');

  // 개발 환경에서 데이터 로딩 상태 로깅
  if (import.meta.env.DEV) {
    console.log('🔍 관리자 페이지 데이터 로딩 상태:', {
      bookmarkLoading,
      filteringLoading,
      recommendLoading,
      membershipLoading,
      totalLoading,
      brandsLoading,
      bookmarkStats: bookmarkStats?.length || 0,
      filteringStats: filteringStats?.length || 0,
      recommendStats: recommendStats?.length || 0,
      membershipStats: membershipStats?.length || 0,
      totalStats,
      brandsData: brandsData?.length || 0,
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
    const newTab = tab as 'stats' | 'brands';
    setMainTab(newTab);
    
    // 탭 변경 시 해당 데이터 refetch
    if (import.meta.env.DEV) {
      console.log('🔄 관리자 페이지 메인 탭 변경:', newTab);
    }
    
    if (newTab === 'stats') {
      // 통계 탭: 즐겨찾기로 초기화하고 즐겨찾기와 전체 통계만 refetch
      setSelectedStatsTab('bookmark');
      setSelectedCategory('all');
      refetchTotal();
      refetchBookmark();
    } else if (newTab === 'brands') {
      // 브랜드 관리 탭: 브랜드 데이터 refetch
      refetchBrands();
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
      if (brandsLoading) {
        return <StatsSkeleton />;
      }
      return <NewAdminBrandList />;
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