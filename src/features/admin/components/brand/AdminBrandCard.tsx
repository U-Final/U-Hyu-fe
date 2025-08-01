import type { BrandListItem } from '@admin/api/types';

interface AdminBrandCardProps {
  brand: BrandListItem;
  onClick: () => void;
}

export const AdminBrandCard = ({ brand, onClick }: AdminBrandCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* 브랜드 로고 */}
      <div className="w-12 h-12 mr-4">
        <img
          src={brand.logoImage}
          alt={brand.brandName}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/brands/default-brand-logo.png';
          }}
        />
      </div>

      {/* 브랜드 정보 */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-bold text-black">{brand.brandName}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-1">
          {brand.description}
        </p>
      </div>

      {/* 상세보기 아이콘 */}
      <div className="text-right">
        <div className="text-sm text-gray-500">상세보기</div>
        <div className="text-lg font-bold text-primary">→</div>
      </div>
    </div>
  );
}; 