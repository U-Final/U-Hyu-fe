import { Skeleton } from '../shadcn/ui/skeleton';

/**
 * 활동 탭 스켈레톤 컴포넌트
 */
export const ActivityTabsSkeleton = () => (
  <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
    {Array.from({ length: 2 }).map((_, idx) => (
      <Skeleton key={idx} className="h-8 w-20 rounded-md bg-light-gray" />
    ))}
  </div>
);

/**
 * 활동 혜택 스켈레톤 컴포넌트
 */
export const ActivityBenefitSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-5 w-24 bg-light-gray" />
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="space-y-2">
          <Skeleton className="h-8 w-full bg-light-gray" />
          <Skeleton className="h-3 w-3/4 bg-light-gray" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * 활동 브랜드 스켈레톤 컴포넌트
 */
export const ActivityBrandsSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-5 w-20 bg-light-gray" />
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex flex-col items-center space-y-2">
          <Skeleton className="h-12 w-12 rounded-full bg-light-gray" />
          <Skeleton className="h-3 w-16 bg-light-gray" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * 활동 즐겨찾기 스켈레톤 컴포넌트
 */
export const ActivityFavoriteSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-5 w-16 bg-light-gray" />
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg">
          <Skeleton className="h-12 w-12 rounded-lg bg-light-gray" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 bg-light-gray" />
            <Skeleton className="h-3 w-1/2 bg-light-gray" />
          </div>
          <Skeleton className="h-6 w-6 bg-light-gray" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * 마이페이지 활동 전체 스켈레톤 컴포넌트
 */
export const MyPageActivitySkeleton = () => (
  <div className="min-h-screen">
    <div className="pb-24 space-y-6">
      {/* 헤더 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-16 bg-light-gray" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-[4.5rem] h-[4.5rem] rounded-xl bg-light-gray" />
            <div className="flex flex-col justify-center gap-2">
              <Skeleton className="h-4 w-20 bg-light-gray" />
              <Skeleton className="h-3 w-16 bg-light-gray" />
              <Skeleton className="h-3 w-24 bg-light-gray" />
            </div>
          </div>
          <Skeleton className="h-9 w-20 rounded-lg bg-light-gray" />
        </div>
      </div>
      
      {/* 탭 스켈레톤 */}
      <ActivityTabsSkeleton />
      
      {/* 콘텐츠 스켈레톤 */}
      <div className="space-y-6">
        <ActivityBenefitSkeleton />
        <ActivityBrandsSkeleton />
      </div>
    </div>
  </div>
);