import { useState } from 'react';

import {
  BrandDetailModal,
  CheckBoxList,
  Pagination,
} from '@benefit/components';
import { useBenefitQueryParams } from '@benefit/hooks/useBenefitQueryParams';
import { useGetBrandListQuery } from '@benefit/hooks/useGetBrandListQuery';

import { BrandCard, FilterTabs, SearchInput } from '@/shared/components';
import { BENEFIT_FILTER_TABS } from '@/shared/components/filter_tabs/FilterTabs.variants';
import { useModalStore } from '@/shared/store';
import { trackFilterUsed } from '@/shared/utils/actionlogTracker';

export const BenefitList = () => {
  const { params, setParam, setParams } = useBenefitQueryParams();
  const [searchTerm, setSearchTerm] = useState(params.brand_name ?? '');

  const openModal = useModalStore(state => state.openModal);

  const { data, isLoading } = useGetBrandListQuery(params);

  const handlePageChange = (page: number) => {
    setParam('page', page.toString());
  };

  const handleBrandClick = async (brandId: number) => {
    if (!brandId) return;

    openModal('base', {
      title: '브랜드 상세정보',
      children: <BrandDetailModal brandId={brandId} />,
    });
  };

  const handleFilterChange = (value: string) => {
    setParam('category', value); // 기존 로직 유지

    // 🎯 행동 추적 추가
    if (value !== 'all' && value !== '전체') {
      trackFilterUsed(value);
    }
  };

  return (
    <div>
      {/* 필터링 */}
      <div className="flex flex-col gap-3">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={value => setParam('brand_name', value)}
        />
        <FilterTabs tabs={BENEFIT_FILTER_TABS} onChange={handleFilterChange} />
        <CheckBoxList
          selectedItems={{
            storeType: params.storeType ?? '',
            benefitType: params.benefitType ?? '',
          }}
          onChange={filters => {
            setParams({
              page: '0',
              storeType: filters.storeType || '',
              benefitType: filters.benefitType || '',
            });
          }}
        />
      </div>

      {/* 리스트 */}
      <div className="divide-y divide-gray-200 mt-4">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          data?.brandList.map(brand => (
            <div
              key={brand.brandId}
              onClick={() => handleBrandClick(brand.brandId)}
            >
              <BrandCard logoUrl={brand.logoImage}>
                <div className="gap-2">
                  <p className="text-body2 font-bold text-black">
                    {brand.brandName}
                  </p>
                  <p className="text-caption text-black whitespace-pre-line">
                    {brand.description || ''}
                  </p>
                </div>
              </BrandCard>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {data && (
        <div className="mt-6">
          <Pagination
            currentPage={data.currentPage + 1}
            totalPages={data.totalPages}
            onPageChange={page => handlePageChange(page - 1)}
          />
        </div>
      )}
    </div>
  );
};
