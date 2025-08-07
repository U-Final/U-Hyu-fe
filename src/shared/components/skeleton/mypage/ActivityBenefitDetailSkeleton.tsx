import { Skeleton } from '../../shadcn/ui/skeleton';

/**
 * 활동 혜택 상세 스켈레톤 컴포넌트
 */
export const ActivityBenefitDetailSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    {/* 헤더 영역 */}
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="w-6 h-6 rounded-full bg-light-gray" />
        <Skeleton className="h-5 w-20 bg-light-gray" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-light-gray" />
        <Skeleton className="h-4 w-3/4 bg-light-gray" />
      </div>
    </div>

    {/* 메인 혜택 카드 */}
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm border border-gray-200">
      {/* 축하 메시지 영역 */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Skeleton className="w-5 h-5 bg-light-gray" />
          <Skeleton className="h-5 w-24 bg-light-gray" />
          <Skeleton className="w-5 h-5 bg-light-gray" />
        </div>
        <Skeleton className="h-4 w-48 mx-auto bg-light-gray" />
      </div>

      {/* 혜택 금액 카드 */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Skeleton className="w-12 h-12 rounded-full bg-light-gray" />
            <div className="text-left space-y-2">
              <Skeleton className="h-3 w-24 bg-light-gray" />
              <Skeleton className="h-8 w-32 bg-light-gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * 활동 혜택 빈 상태 스켈레톤 컴포넌트
 */
export const ActivityBenefitEmptySkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    {/* 헤더 영역 */}
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="w-6 h-6 rounded-full bg-light-gray" />
        <Skeleton className="h-5 w-20 bg-light-gray" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-light-gray" />
        <Skeleton className="h-4 w-3/4 bg-light-gray" />
      </div>
    </div>

    {/* 빈 상태 영역 */}
    <div className="flex flex-col items-center justify-center py-8">
      <Skeleton className="w-16 h-16 rounded-full bg-light-gray mb-4" />
      <Skeleton className="h-5 w-32 bg-light-gray mb-2" />
      <Skeleton className="h-4 w-48 bg-light-gray" />
    </div>
  </div>
);
