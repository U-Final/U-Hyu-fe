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
    <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
      <Skeleton className="absolute inset-0 rounded-t-3xl bg-light-gray" />
      
      <div className="relative h-full flex items-end justify-center gap-1 sm:gap-2 md:gap-4 px-2 sm:px-4 pb-2 sm:pb-4">
        {/* 3위 */}
        <div className="flex flex-col items-center flex-shrink-0">
          <Skeleton className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-light-gray mb-1 sm:mb-2 md:mb-3" />
          <Skeleton className="h-3 sm:h-4 w-12 sm:w-16 rounded-full bg-light-gray mb-1 sm:mb-2 md:mb-3" />
          <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-light-gray absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-1.5 md:-right-1.5" />
          <Skeleton className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 rounded-t-2xl bg-light-gray" />
        </div>

        {/* 1위 */}
        <div className="flex flex-col items-center flex-shrink-0">
          <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-light-gray mb-1 sm:mb-2 md:mb-3" />
          <Skeleton className="h-4 sm:h-4 w-16 sm:w-20 rounded-full bg-light-gray mb-1 sm:mb-2 md:mb-3" />
          <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-light-gray absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-1.5 md:-right-1.5" />
          <Skeleton className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 rounded-t-2xl bg-light-gray" />
        </div>

        {/* 2위 */}
        <div className="flex flex-col items-center flex-shrink-0">
          <Skeleton className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-light-gray mb-1 sm:mb-2 md:mb-3" />
          <Skeleton className="h-3 sm:h-4 w-12 sm:w-16 rounded-full bg-light-gray mb-1 sm:mb-2 md:mb-3" />
          <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-light-gray absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-1.5 md:-right-1.5" />
          <Skeleton className="w-18 h-10 sm:w-20 sm:h-12 md:w-22 md:h-14 rounded-t-2xl bg-light-gray" />
        </div>
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
