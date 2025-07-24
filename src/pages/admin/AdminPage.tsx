import type { AdminBrand, CategoryStat } from '@/features/admin/api/types';
import { useState } from 'react';

// 추가 타입 정의 (features에서 관리하는 것이 맞으나, RecommendStat/TotalStat이 없다면 features/types.ts에 추가 권장)
type RecommendStat = { categoryId: number; categoryName: string; count: number };
type TotalStat = { totalBookmark: number; totalFiltering: number; totalSearch: number; totalMembership: number };

type Category = { categoryId: number; categoryName: string };

export default function AdminPage() {
  // 통계 상태
  const [bookmark, setBookmark] = useState<CategoryStat[] | null>(null);
  const [filtering, setFiltering] = useState<CategoryStat[] | null>(null);
  const [search, setSearch] = useState<CategoryStat[] | null>(null);
  const [recommend, setRecommend] = useState<RecommendStat[] | null>(null);
  const [membership, setMembership] = useState<CategoryStat[] | null>(null);
  const [total, setTotal] = useState<TotalStat | null>(null);

  // 카테고리/브랜드 관리 상태
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [brands, setBrands] = useState<AdminBrand[] | null>(null);
  const [brandResult, setBrandResult] = useState<AdminBrand | { brandId: number } | null>(null);

  // 통계별 fetch 함수
  const fetchBookmarkStats = async () => {
    const res = await fetch('/admin/statistics/bookmark');
    const json = await res.json();
    setBookmark(json.result);
  };
  const fetchFilteringStats = async () => {
    const res = await fetch('/admin/statistics/filter');
    const json = await res.json();
    setFiltering(json.result);
  };
  const fetchSearchStats = async () => {
    const res = await fetch('/admin/statistics/searching');
    const json = await res.json();
    setSearch(json.result);
  };
  const fetchRecommendStats = async () => {
    const res = await fetch('/admin/statistics/recommendation');
    const json = await res.json();
    setRecommend(json.result);
  };
  const fetchMembershipStats = async () => {
    const res = await fetch('/admin/statistics/membership');
    const json = await res.json();
    setMembership(json.result);
  };
  const fetchTotalStats = async () => {
    const res = await fetch('/admin/statistics/total');
    const json = await res.json();
    setTotal(json.result);
  };

  // 카테고리 목록 조회
  const fetchCategories = async () => {
    const res = await fetch('/admin/category/list');
    const json = await res.json();
    setCategories(json.result);
  };

  // 브랜드 목록 조회
  const fetchBrands = async () => {
    const res = await fetch('/admin/brand/list');
    const json = await res.json();
    setBrands(json.result);
  };

  // 브랜드 추가 (예시)
  const addBrand = async () => {
    const res = await fetch('/admin/brand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brandName: '새 브랜드',
        brandImg: '/images/brands/new.png',
        categoryId: 1,
        usageLimit: '월 1회',
        usageMethod: '모바일 쿠폰',
        storeType: 'OFFLINE',
        status: true,
        data: [
          { grade: 'VIP', description: '10% 할인', benefitType: 'DISCOUNT' }
        ]
      }),
    });
    const json = await res.json();
    setBrandResult(json.result);
  };

  // 브랜드 수정 (예시: 1번 브랜드)
  const updateBrand = async () => {
    const res = await fetch('/admin/brands/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brandName: '수정된 브랜드명' }),
    });
    const json = await res.json();
    setBrandResult(json.result);
  };

  // 브랜드 삭제 (예시: 1번 브랜드)
  const deleteBrand = async () => {
    const res = await fetch('/admin/brands/1', { method: 'DELETE' });
    const json = await res.json();
    setBrandResult(json.result);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>관리자 브랜드/통계 테스트</h1>
      {/* 카테고리/브랜드 관리 */}
      <button onClick={fetchCategories}>카테고리 목록 불러오기</button>
      <button onClick={fetchBrands}>브랜드 목록 불러오기</button>
      <button onClick={addBrand}>브랜드 추가</button>
      <button onClick={updateBrand}>브랜드 수정</button>
      <button onClick={deleteBrand}>브랜드 삭제</button>
      <div style={{ marginTop: 24 }}>
        <h3>카테고리 목록</h3>
        <pre>{categories ? JSON.stringify(categories, null, 2) : '결과 없음'}</pre>
        <h3>브랜드 목록</h3>
        <pre>{brands ? JSON.stringify(brands, null, 2) : '결과 없음'}</pre>
        <h3>브랜드 추가/수정/삭제 결과</h3>
        <pre>{brandResult ? JSON.stringify(brandResult, null, 2) : '결과 없음'}</pre>
      </div>
      {/* 통계 버튼 및 결과는 기존 코드 그대로 */}
      <button onClick={fetchBookmarkStats}>즐겨찾기 통계</button>
      <button onClick={fetchFilteringStats}>필터링 통계</button>
      <button onClick={fetchSearchStats}>검색 통계</button>
      <button onClick={fetchRecommendStats}>추천 통계</button>
      <button onClick={fetchMembershipStats}>멤버십 통계</button>
      <button onClick={fetchTotalStats}>토탈 통계</button>
      <div style={{ marginTop: 24 }}>
        <h3>즐겨찾기 통계</h3>
        <pre>{bookmark ? JSON.stringify(bookmark, null, 2) : '결과 없음'}</pre>
        <h3>필터링 통계</h3>
        <pre>{filtering ? JSON.stringify(filtering, null, 2) : '결과 없음'}</pre>
        <h3>검색 통계</h3>
        <pre>{search ? JSON.stringify(search, null, 2) : '결과 없음'}</pre>
        <h3>추천 통계</h3>
        <pre>{recommend ? JSON.stringify(recommend, null, 2) : '결과 없음'}</pre>
        <h3>멤버십 통계</h3>
        <pre>{membership ? JSON.stringify(membership, null, 2) : '결과 없음'}</pre>
        <h3>토탈 통계</h3>
        <pre>{total ? JSON.stringify(total, null, 2) : '결과 없음'}</pre>
      </div>
    </div>
  );
}