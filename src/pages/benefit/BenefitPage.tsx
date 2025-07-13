import FilterTabs from '@/shared/components/filter_tabs/FilterTabs';
import SearchInput from '@/shared/components/search_input/SearchInput';
import Pagination from '@benefit/components/Pagination';
import { useState } from 'react';
import CheckBoxList from '@benefit/components/CheckBoxList';

const BenefitPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const totalPages = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-col bg-white px-[16px] pt-[60px] gap-[16px]">
      <div className="flex flex-col gap-[16px]">
        <p className="text-h3 font-bold text-black">기본 혜택</p>
        <p className="text-caption text-black">
          언제 어디서나 오직 유플러스 고객만 누릴 수 있는
          <br /> 다양한 제휴 혜택, 혜택을 모두 모아 다양한 일상을 누려보세요.
        </p>
      </div>
      <div className="flex flex-col gap-[10px]">
        <SearchInput value={searchTerm} onChange={(value) => setSearchTerm(value)} />
        <FilterTabs />
        <CheckBoxList selectedItems={selectedFilters} onChange={setSelectedFilters} />
      </div>
      <div>
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
