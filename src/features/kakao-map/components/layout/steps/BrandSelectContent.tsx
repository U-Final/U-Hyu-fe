import { type FC } from 'react';

/**
 * BrandSelectContent 컴포넌트의 Props 정의
 */
interface BrandSelectContentProps {
  /** 현재 선택된 카테고리 키 (컨텍스트 표시용) */
  categoryKey: string;

  /** 카테고리 표시 이름 (사용자에게 보여줄 이름) */
  categoryDisplayName: string;

  /** 선택 가능한 브랜드 목록 (백엔드 API에서 조회된 실제 데이터) */
  brands: string[];

  /** 현재 선택된 브랜드 (선택 상태 표시용) */
  selectedBrand?: string;

  /** 브랜드 목록 로딩 상태 */
  isLoading?: boolean;

  onBrandSelect: (brandName: string) => void;
  onBack: () => void;
}

const BrandSelectContent: FC<BrandSelectContentProps> = ({
  categoryDisplayName,
  brands,
  selectedBrand,
  isLoading = false,
  onBrandSelect,
  onBack,
}) => {
  /**
   * 브랜드 선택 핸들러
   *
   * 사용자가 브랜드를 선택했을 때 호출되며,
   * 부모 컴포넌트에 선택 결과를 전달합니다.
   */
  const handleBrandClick = (brandName: string) => {
    onBrandSelect(brandName);
  };

  /**
   * 로딩 상태 렌더링
   *
   */
  const renderLoadingState = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">브랜드 목록을 불러오는 중...</p>
      </div>
    </div>
  );

  /**
   * 빈 상태 렌더링
   */
  const renderEmptyState = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🏪</div>
        <p className="text-gray-600 mb-2">{categoryDisplayName} 카테고리에</p>
        <p className="text-gray-600 mb-4">등록된 브랜드가 없습니다</p>
        <p className="text-sm text-gray-500">다른 카테고리를 선택해 보세요</p>
      </div>
    </div>
  );

  /**
   * 브랜드 목록 렌더링
   *
   * 실제 브랜드 목록을 표시하는 메인 콘텐츠입니다.
   */
  const renderBrandList = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-3 mb-7">
        {brands.map(brand => {
          const isSelected = selectedBrand === brand;

          return (
            <button
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className={`
                w-full flex items-center justify-between
                p-4 rounded-xl border-2 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 text-gray-700'
                }
              `}
              aria-label={`${brand} 브랜드 선택`}
            >
              {/* 브랜드 이름 */}
              <span className="font-medium text-left">{brand}</span>

              {/* 선택 상태 표시 또는 화살표 */}
              <div className="flex items-center">
                {isSelected ? (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 영역 - 뒤로가기 버튼과 카테고리 이름 */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="이전 화면으로 돌아가기"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-lg font-medium text-gray-900">
            {categoryDisplayName}
          </span>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      {isLoading
        ? renderLoadingState()
        : brands.length === 0
          ? renderEmptyState()
          : renderBrandList()}
    </div>
  );
};

export default BrandSelectContent;
