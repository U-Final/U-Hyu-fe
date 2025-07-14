import FilterTabs from '@/shared/components/filter_tabs/FilterTabs';
import SearchInput from '@/shared/components/search_input/SearchInput';
import BrandDetailModal from '@benefit/components/BrandDetailModal';
import CheckBoxList from '@benefit/components/CheckBoxList';
import Pagination from '@benefit/components/Pagination';
import type { BrandDetail } from '@benefit/types/BrandDetail.types';
import { BrandCard } from '@components/cards/BrandCard';
import { useModalStore } from '@shared/store/modalStore';
import { useState } from 'react';

const BenefitPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    '온라인',
    '오프라인',
    '할인',
    '상품증정',
  ]);
  
  const openModal = useModalStore(state => state.openModal);

  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const mockBrands = [
    {
      brand_id: 1,
      brand_name: '뚜레쥬르',
      logo_url: '/images/brands/뚜레쥬르.png',
      summary: `VVIP : 1천원 당 150원 할인\nVIP: 1천원 당 100원 할인\n우수: 1천원 당 50원 할인`,
    },
    {
      brand_id: 2,
      brand_name: 'GS25',
      logo_url: '/images/brands/GS25.png',
      summary: `VIP: 아메리카노 무료 쿠폰 제공\n우수: 2천원 할인 쿠폰`,
    },
    {
      brand_id: 3,
      brand_name: 'CGV',
      logo_url: '/images/brands/CGV.png',
      summary: `VVIP: 5천원 할인\nVIP: 4천원 할인\n우수: 2천원 할인`,
    },
    {
      brand_id: 4,
      brand_name: '뚜레쥬르',
      logo_url: '/images/brands/뚜레쥬르.png',
      summary: `VVIP : 1천원 당 150원 할인\nVIP: 1천원 당 100원 할인\n우수: 1천원 당 50원 할인`,
    },

  ];

  const mockBrandDetail: BrandDetail[] = [
    {
      brand_id: 102,
      brand_name: 'CGV',
      logo_url: '/images/brands/CGV.png',
      benefits: [
        { grade: '우수', description: '2D 영화 2천원 할인' },
        { grade: 'VIP', description: '2D 영화 4천원 할인' },
        { grade: 'VVIP', description: '2D 영화 5천원 할인' },
      ],
      usage_limit: '월 1회',
      usage_method: 'CGV 앱에서 쿠폰 선택 후 매표소 제시',
    },
  ];

  const handleBrandClick = (brandId: number) => {
    const brand = mockBrandDetail.find(b => b.brand_id === brandId);
    if (!brand) return;

    openModal('base', {
      title: "브랜드 상세정보",
      children: <BrandDetailModal brand={brand} />,
    });
  };

  return (
    <div className="flex flex-col bg-white px-[16px] pt-[60px] gap-[16px]">
      {/* 제목, 설명 */}
      <div className="flex flex-col gap-[16px]">
        <p className="text-h3 font-bold text-black">기본 혜택</p>
        <p className="text-caption text-black">
          언제 어디서나 오직 유플러스 고객만 누릴 수 있는
          <br /> 다양한 제휴 혜택, 혜택을 모두 모아 다양한 일상을 누려보세요.
        </p>
      </div>
      {/* 필터링 */}
      <div className="flex flex-col gap-[10px]">
        <SearchInput
          value={searchTerm}
          onChange={value => setSearchTerm(value)}
        />
        <FilterTabs />
        <CheckBoxList
          selectedItems={selectedFilters}
          onChange={setSelectedFilters}
        />
      </div>
      {/* 리스트 */}
      <div>
        {mockBrands.map(brand => (
          <div
            key={brand.brand_id}
            onClick={() => handleBrandClick(brand.brand_id)}
          >
            <BrandCard logoUrl={brand.logo_url}>
              <div className="gap-[8px]">
                <p className="text-body2 font-bold text-black">
                  {brand.brand_name}
                </p>
                <p
                  className="text-caption text-black"
                  dangerouslySetInnerHTML={{
                    __html: brand.summary.replace(/\n/g, '<br />'),
                  }}
                />
              </div>
            </BrandCard>
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="pb-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BenefitPage;
