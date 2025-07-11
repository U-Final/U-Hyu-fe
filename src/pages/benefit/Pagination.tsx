interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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
    <div className="flex items-center justify-center gap-[28px]">
      <button
        onClick={handlePrevClick}
        className="px-[23px] py-[10px] bg-white border border-gray rounded-sm disabled:opacity-50 cursor-pointer"
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span className="text-gray-600">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={handleNextClick}
        className="px-[23px] py-[10px] bg-white border border-gray rounded-sm disabled:opacity-50 cursor-pointer"
        disabled={currentPage === totalPages}
      >
        <span className="text-gray-">&gt;</span>
      </button>
    </div>
  );
};

export default Pagination;
