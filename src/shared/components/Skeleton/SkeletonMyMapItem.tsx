import { Skeleton } from '../shadcn/ui/skeleton';

export const SkeletonMyMapItem = () => (
  <div className="flex items-center justify-between py-3 rounded animate-pulse">
    <div className="flex items-center gap-2 flex-1">
      <Skeleton className="w-5 h-5 rounded-full bg-light-gray" />
      <Skeleton className="h-4 w-24 rounded bg-light-gray" />
    </div>
    <Skeleton className="w-4 h-4 rounded bg-light-gray" />
  </div>
);
