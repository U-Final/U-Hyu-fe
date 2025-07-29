export function BrandListSkeleton() {
  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* 브랜드 카드들 */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg">
            {/* 브랜드 로고 */}
            <div className="w-12 h-12 mr-4 bg-gray-200 rounded-lg animate-pulse" />
            
            {/* 브랜드 정보 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* 혜택 개수 */}
            <div className="text-right">
              <div className="h-3 w-8 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-6 w-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 