import { Skeleton } from '../../shadcn/ui/skeleton';

/**
 * 즐겨찾기 아이템 스켈레톤 컴포넌트
 */
export const ActivityFavoriteItemSkeleton = () => (
  <div className="border border-gray-200 rounded-2xl p-4">
    <div className="flex items-center gap-3">
      <Skeleton className="h-12 w-12 rounded-lg bg-light-gray flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-light-gray" />
        <Skeleton className="h-3 w-full bg-light-gray" />
        <Skeleton className="h-3 w-2/3 bg-light-gray" />
      </div>
      <Skeleton className="h-6 w-6 bg-light-gray flex-shrink-0" />
    </div>
  </div>
);

/**
 * 즐겨찾기 목록 스켈레톤 컴포넌트
 */
export const ActivityFavoriteListSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, idx) => (
      <ActivityFavoriteItemSkeleton key={idx} />
    ))}
  </div>
);
