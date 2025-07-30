import { Skeleton } from '@/shared/components/shadcn/ui/skeleton';

export const SkeletonMyMapUuidItem = () => (
  <div className="px-4 py-3">
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-full bg-light-gray" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-1/3 bg-light-gray" />
        <Skeleton className="h-3 w-2/3 bg-light-gray" />
        <Skeleton className="h-3 w-1/4 bg-light-gray" />
      </div>
    </div>
  </div>
);
