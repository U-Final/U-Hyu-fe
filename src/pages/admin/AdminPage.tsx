import { BookmarkChart, FilteringChart, SearchChart, RecommendChart, MembershipChart, TotalStatsCard } from '@admin/components/stats';
import { StatsTabButtons, StatsSummaryCards } from '@admin/components/common';
import { useState, useEffect } from 'react';
import { FaDollarSign, FaUser, FaShoppingCart, FaBox, FaEye } from 'react-icons/fa';
import type { Category } from '@admin/types';
import { useAdminStatsQuery } from '@admin/hooks';

const TABS = [
  { key: 'bookmark', label: '즐겨찾기', icon: <FaDollarSign /> },
  { key: 'filtering', label: '필터링', icon: <FaUser /> },
  { key: 'search', label: '검색', icon: <FaShoppingCart /> },
  { key: 'recommend', label: '추천', icon: <FaBox /> },
  { key: 'membership', label: '멤버십', icon: <FaEye /> },
];

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<'bookmark'|'filtering'|'search'|'recommend'|'membership'>('bookmark');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // 통계 상태/함수는 훅에서 모두 가져옴
  const {
    bookmark, filtering, search, recommend, membership, total,
    fetchBookmarkStats, fetchFilteringStats, fetchSearchStats,
    fetchRecommendStats, fetchMembershipStats,
  } = useAdminStatsQuery();

  // 최초 렌더링: 카테고리만 fetch
  useEffect(() => {
    fetch('/admin/categories')
      .then(res => res.json())
      .then(json => setCategories(json.data));
  }, []);

  // 탭(통계) 버튼 클릭 시 해당 fetch 함수 실행
  const handleTabClick = (key: string) => {
    if (
      key === 'bookmark' ||
      key === 'filtering' ||
      key === 'search' ||
      key === 'recommend' ||
      key === 'membership'
    ) {
      setSelectedTab(key);
      setSelectedCategoryId(null);
      if (key === 'bookmark') fetchBookmarkStats();
      if (key === 'filtering') fetchFilteringStats();
      if (key === 'search') fetchSearchStats();
      if (key === 'recommend') fetchRecommendStats();
      if (key === 'membership') fetchMembershipStats();
    }
  };

  return (
    <div className="min-h-screen max-w-[22.5rem] mx-auto">
      <div className="p-[1rem] space-y-[2rem] pb-[6rem]">
        <div className="text-sm text-gray-500 mb-1">관리자 통계 대시보드</div>
        <StatsTabButtons tabs={TABS} selected={selectedTab} onSelect={handleTabClick} />
        {/* 카테고리 선택 버튼 영역 */}
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            className={`px-3 py-1 rounded border text-sm ${selectedCategoryId === null ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
            onClick={() => setSelectedCategoryId(null)}
            disabled={selectedTab === 'filtering'}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.categoryId}
              className={`px-3 py-1 rounded border text-sm ${selectedCategoryId === cat.categoryId ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
              onClick={() => setSelectedCategoryId(cat.categoryId)}
              disabled={selectedTab === 'filtering'}
            >
              {cat.categoryName}
            </button>
          ))}
        </div>
        <StatsSummaryCards cards={[]} />
        {/* 차트 */}
        {selectedTab === 'bookmark' && bookmark && (
          <BookmarkChart stats={bookmark} categories={categories} selectedCategoryId={selectedCategoryId} />
        )}
        {selectedTab === 'filtering' && filtering && (
          <FilteringChart stats={filtering} categories={categories} />
        )}
        {selectedTab === 'search' && search && (
          <SearchChart stats={search} categories={categories} selectedCategoryId={selectedCategoryId} />
        )}
        {selectedTab === 'recommend' && recommend && (
          <RecommendChart stats={recommend} categories={categories} selectedCategoryId={selectedCategoryId} />
        )}
        {selectedTab === 'membership' && membership && (
          <MembershipChart stats={membership} categories={categories} selectedCategoryId={selectedCategoryId} />
        )}
        <TotalStatsCard data={total || { totalBookmark: 0, totalFiltering: 0, totalSearch: 0, totalMembership: 0 }} />
      </div>
    </div>
  );
}