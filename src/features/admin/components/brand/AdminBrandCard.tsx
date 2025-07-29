import type { AdminBrand } from '@admin/api/types';

interface AdminBrandCardProps {
  brand: AdminBrand;
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
          src={brand.brandImg}
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
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              brand.status
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {brand.status ? '활성' : '비활성'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-1">
          사용 제한: {brand.usageLimit} | 사용 방법: {brand.usageMethod}
        </p>
        <p className="text-sm text-gray-600">
          매장 유형: {brand.storeType === 'ONLINE' ? '온라인' : '오프라인'}
        </p>
      </div>

      {/* 혜택 개수 */}
      <div className="text-right">
        <div className="text-sm text-gray-500">혜택</div>
        <div className="text-lg font-bold text-primary">{brand.data.length}개</div>
      </div>
    </div>
  );
}; 