import { useState } from 'react';
import type { ApiResponse } from '@/shared/client/client.type';
import type { AdminBrand } from '@/features/admin/api/types';

type BrandListResponse = ApiResponse<AdminBrand[]>;

export default function Admin() {
  const [result, setResult] = useState<BrandListResponse | null>(null);

  const fetchBrands = async () => {
    const res = await fetch('/admin/brand-list');
    const data: BrandListResponse = await res.json();
    setResult(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('/admin/categories');
    const data = await res.json();
    setResult(data);
  };
  // 버튼 추가
  // <button onClick={fetchCategories}>카테고리 목록 불러오기</button>

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
    const data = await res.json();
    setResult(data);
  };
  // 버튼 추가
  // <button onClick={addBrand}>브랜드 추가</button>

  const updateBrand = async () => {
    const res = await fetch('/admin/brands/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brandName: '수정된 브랜드명' }),
    });
    const data = await res.json();
    setResult(data);
  };
  // <button onClick={updateBrand}>브랜드 수정</button>

  const deleteBrand = async () => {
    const res = await fetch('/admin/brands/1', { method: 'DELETE' });
    const data = await res.json();
    setResult(data);
  };
  // <button onClick={deleteBrand}>브랜드 삭제</button>

  const fetchStats = async () => {
    const res = await fetch('/admin/status');
    const data = await res.json();
    setResult(data);
  };
  // 버튼 추가
  // <button onClick={fetchStats}>통계 전체 조회</button>

  return (
    <div style={{ padding: 32 }}>
      <h1>관리자 브랜드 목록 테스트</h1>
      <button onClick={fetchBrands}>브랜드 목록 불러오기</button>
      <button onClick={fetchCategories}>카테고리 목록 불러오기</button>
      <br />
      <button onClick={addBrand}>브랜드 추가</button>
      <br />
      <button onClick={updateBrand}>브랜드 수정</button>
      <br />
      <button onClick={deleteBrand}>브랜드 삭제</button>
      <br />
      <button onClick={fetchStats}>통계 전체 조회</button>
      <pre style={{ background: '#222', color: '#fff', padding: 16, marginTop: 16 }}>
        {result ? JSON.stringify(result, null, 2) : '결과 없음'}
      </pre>
    </div>
  );
}