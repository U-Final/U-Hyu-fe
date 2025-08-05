import { useState } from 'react';

import {
  BrandDetailModal,
  CheckBoxList,
  Pagination,
} from '@benefit/components';
import { useBenefitQueryParams, useGetBrandListQuery } from '@benefit/hooks';
import { formatGradeDescriptions } from '@benefit/utils/formatGradeDescriptions';

import { BrandCard, FilterTabs, SearchInput } from '@/shared/components';
import { BENEFIT_FILTER_TABS } from '@/shared/components/filter_tabs/FilterTabs.variants';
import { SkeletonBrandCard } from '@/shared/components/skeleton';
import { useGA } from '@/shared/hooks/useGA';
import { useModalStore } from '@/shared/store';
import { trackFilterUsed } from '@/shared/utils/actionlogTracker';

export const BenefitList = () => {
  const { params, setParam, setParams } = useBenefitQueryParams();
  const [searchTerm, setSearchTerm] = useState(params.brand_name ?? '');
  const { trackBenefitInteraction } = useGA();

  const openModal = useModalStore(state => state.openModal);

  const { data, isPending } = useGetBrandListQuery(params);

  const handlePageChange = (page: number) => {
    setParam('page', page.toString());
  };

  const handleBrandClick = async (brandId: number) => {
    if (!brandId) return;

    // GA 추적: 브랜드 상세보기
    const brand = data?.brandList.find(b => b.brandId === brandId);
    trackBenefitInteraction(
      'brand_detail_viewed',
      brandId.toString(),
      brand?.brandName
    );

    openModal('base', {
      title: '브랜드 상세정보',
      children: <BrandDetailModal brandId={brandId} />,
    });
  };

  const handleFilterChange = (value: string) => {
    setParam('category', value);

    if (value !== 'all' && value !== '전체') {
      trackFilterUsed(value);
      // GA 추적: 필터 사용
      trackBenefitInteraction('filter_used', undefined, value);
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
        <div className="overflow-x-auto px-0">
          <FilterTabs
            tabs={BENEFIT_FILTER_TABS}
            onChange={handleFilterChange}
          />
        </div>
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
        {isPending ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonBrandCard key={idx} />
          ))
        ) : data && data.brandList.length > 0 ? (
          data.brandList.map(brand => (
            <div
              key={brand.brandId}
              onClick={() => handleBrandClick(brand.brandId)}
            >
              <BrandCard logoUrl={brand.logoImage}>
                <div className="gap-2">
                  <p className="text-body2 font-bold text-black">
                    {brand.brandName}
                  </p>
                  <span className="text-caption text-black whitespace-pre-line">
                    {formatGradeDescriptions(brand.description)}
                  </span>
                </div>
              </BrandCard>
            </div>
          ))
        ) : (
          <div className="py-4 px-4">
            <div className="flex  flex-col text-center items-center justify-center">
              <img
                src="/images/empty/empty-state.png"
                alt="추천 매장이 없습니다."
                className="w-40 object-contain"
              />
              <div className="space-y-2">
                <h3 className="text-body1 font-semibold text-gray-700">
                  검색된 브랜드가 없습니다
                </h3>
                <p className="text-caption text-gray-500 leading-relaxed">
                  다른 검색어나 필터 조건을 시도해보세요
                  <br />더 많은 브랜드를 찾을 수 있습니다
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {data && data.brandList.length > 0 && data.totalPages > 1 && (
        <div className="mt-6 pb-20 sm:pb-6">
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
