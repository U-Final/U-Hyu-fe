import Pagination from "@pages/benefit/components/Pagination";
import { useState } from "react";

const BenefitPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 초기값은 api 연동 후 수정 예정

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="bg-white">
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
