import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { Button } from '@/shared/components/shadcn/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';

export function BrandListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>브랜드 관리</span>
          <Button variant="outline" className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white" disabled>
            <PlusIcon className="h-4 w-4" />
            브랜드 추가
          </Button>
        </CardTitle>
        <div className="text-sm text-gray-600">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-3">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* 브랜드 카드들 */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* 브랜드 로고 */}
                  <div className="w-16 h-16 rounded-lg border-2 border-gray-200 bg-gray-200 animate-pulse flex-shrink-0" />
                  
                  {/* 브랜드 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-5 mb-2">
                      <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                
                {/* 버튼들 */}
                <div className="flex items-center gap-2 ml-8 flex-shrink-0">
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 