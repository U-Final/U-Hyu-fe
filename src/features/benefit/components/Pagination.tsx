import type { FC } from 'react';

import { PaginationButton } from '@/features/benefit/components';
import type { PaginationProps } from '@/features/benefit/types';

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-7">
      <PaginationButton
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        direction="prev"
      />
      <div>
        <span>{currentPage}</span>{' '}
        <span className="text-gray">/ {totalPages}</span>
      </div>
      <PaginationButton
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        direction="next"
      />
    </div>
  );
};

export default Pagination;
