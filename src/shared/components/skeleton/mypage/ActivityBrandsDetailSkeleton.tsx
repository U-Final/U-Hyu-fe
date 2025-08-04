import { Skeleton } from '../../shadcn/ui/skeleton';

/**
 * 클릭 패턴 분석 스켈레톤 컴포넌트
 */
export const ActivityClickPatternSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    {/* 헤더 영역 */}
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="w-6 h-6 rounded-full bg-light-gray" />
        <Skeleton className="h-5 w-32 bg-light-gray" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-light-gray" />
        <Skeleton className="h-4 w-3/4 bg-light-gray" />
      </div>
    </div>

    {/* 시상대 차트 영역 */}
    <div className="relative flex items-end justify-center gap-6 h-80">
      <Skeleton className="absolute bottom-0 left-0 right-0 h-75 rounded-t-3xl bg-light-gray" />

      {/* 3위 */}
      <div className="relative z-1 flex flex-col items-center">
        <Skeleton className="w-20 h-20 rounded-full bg-light-gray mb-4" />
        <Skeleton className="h-4 w-16 rounded-full bg-light-gray mb-4" />
        <Skeleton className="w-7 h-7 rounded-full bg-light-gray absolute -top-2 -right-2" />
        <Skeleton className="w-32 h-16 rounded-t-2xl bg-light-gray" />
      </div>

      {/* 1위 */}
      <div className="relative z-1 flex flex-col items-center">
        <Skeleton className="w-24 h-24 rounded-full bg-light-gray mb-4" />
        <Skeleton className="h-4 w-20 rounded-full bg-light-gray mb-4" />
        <Skeleton className="w-8 h-8 rounded-full bg-light-gray absolute -top-2 -right-2" />
        <Skeleton className="w-40 h-24 rounded-t-2xl bg-light-gray" />
      </div>

      {/* 2위 */}
      <div className="relative z-1 flex flex-col items-center">
        <Skeleton className="w-20 h-20 rounded-full bg-light-gray mb-4" />
        <Skeleton className="h-4 w-16 rounded-full bg-light-gray mb-4" />
        <Skeleton className="w-7 h-7 rounded-full bg-light-gray absolute -top-2 -right-2" />
        <Skeleton className="w-36 h-20 rounded-t-2xl bg-light-gray" />
      </div>
    </div>
  </div>
);

/**
 * 방문 기록 스켈레톤 컴포넌트
 */
export const ActivityVisitHistorySkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    {/* 헤더 영역 */}
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="w-6 h-6 rounded-full bg-light-gray" />
        <Skeleton className="h-5 w-20 bg-light-gray" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-light-gray" />
        <Skeleton className="h-4 w-2/3 bg-light-gray" />
      </div>
    </div>

    {/* 매장 그리드 */}
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center p-4 rounded-xl bg-gray-50"
        >
          <Skeleton className="w-16 h-16 rounded-lg bg-light-gray mb-3" />
          <Skeleton className="h-4 w-3/4 bg-light-gray" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * 활동 브랜드 전체 스켈레톤 컴포넌트
 */
export const ActivityBrandsDetailSkeleton = () => (
  <div className="space-y-6">
    <ActivityClickPatternSkeleton />
    <ActivityVisitHistorySkeleton />
  </div>
);
