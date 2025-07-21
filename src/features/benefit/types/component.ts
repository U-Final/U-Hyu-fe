// 혜택 상세보기 타입 -> 추후 api types로
export interface BrandDetail {
  brand_id: number;
  brand_name: string;
  logo_url: string;
  benefits: {
    grade: string;
    description: string;
  }[];
  usage_limit: string;
  usage_method: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: string;
}