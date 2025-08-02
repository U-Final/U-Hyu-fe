import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { Button } from '@/shared/components/shadcn/ui/button';
import type { AdminBrand } from '@admin/api/types';

interface AdminBrandDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: AdminBrand | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function AdminBrandDeleteModal({ 
  isOpen, 
  onClose, 
  brand, 
  onConfirm, 
  isLoading = false 
}: AdminBrandDeleteModalProps) {
  if (!isOpen || !brand) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-in zoom-in-95 duration-200">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">브랜드 삭제</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 브랜드 정보 */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="relative">
              <img 
                src={brand.brandImg} 
                alt={brand.brandName}
                className="w-14 h-14 rounded-xl object-cover shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/brands/default-brand-logo.png';
                }}
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{brand.brandName}</h3>
              <p className="text-sm text-gray-600">브랜드 ID: {brand.brandId}</p>
            </div>
          </div>

          {/* 경고 메시지 */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <ExclamationTriangleIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-2">⚠️ 주의사항</h4>
                <p className="text-sm text-red-800 leading-relaxed">
                  이 작업은 <strong className="text-red-900">되돌릴 수 없습니다</strong>. 
                  정말로 <strong className="text-red-900">"{brand.brandName}"</strong> 브랜드를 삭제하시겠습니까?
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  삭제 중...
                </div>
              ) : (
                '삭제하기'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 