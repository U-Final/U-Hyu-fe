import { Skeleton } from '../shadcn/ui/skeleton';

export const BrandDetailSkeleton = () => (
  <div className="flex flex-col gap-4 text-black text-caption">
    {/* 브랜드명 스켈레톤 */}
    <Skeleton className="h-6 w-32" />

    {/* 등급별 혜택 스켈레톤 */}
    <div className="flex flex-col gap-1">
      <Skeleton className="h-4 w-20" />
      <div className="flex flex-col gap-1">
        {/* 3개의 등급 스켈레톤 */}
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="flex justify-between items-center px-3 py-2 rounded-md bg-gray-100"
          >
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>
    </div>

    {/* 제공 횟수 스켈레톤 */}
    <div className="flex flex-col gap-1">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-24" />
    </div>

    {/* 이용방법 스켈레톤 */}
    <div className="flex flex-col gap-1">
      <Skeleton className="h-4 w-16" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);
