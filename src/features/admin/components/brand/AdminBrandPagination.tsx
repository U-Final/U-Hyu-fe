import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface AdminBrandPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AdminBrandPagination({ currentPage, totalPages, onPageChange }: AdminBrandPaginationProps) {
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
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        이전
      </button>
      
      <div>
        <span>{currentPage}</span>{' '}
        <span className="text-gray">/ {totalPages}</span>
      </div>
      
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        다음
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
} 