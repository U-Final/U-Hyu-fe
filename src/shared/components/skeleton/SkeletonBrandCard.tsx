import { Skeleton } from '../shadcn/ui/skeleton';

export const SkeletonBrandCard = () => (
  <div className="py-4">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full bg-light-gray" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-1/3 bg-light-gray" />
        <Skeleton className="h-3 w-2/3 bg-light-gray" />
      </div>
    </div>
  </div>
);
