import { Skeleton } from '../shadcn/ui/skeleton';

/**
 * 마이페이지 헤더 스켈레톤 컴포넌트
 */
export const MyPageHeaderSkeleton = () => (
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
);

/**
 * 마이페이지 사용자 정보 스켈레톤 컴포넌트
 */
export const MyPageUserInfoSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-20 bg-light-gray" />
      <Skeleton className="h-8 w-12 rounded-md bg-light-gray" />
    </div>
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16 bg-light-gray" />
        <Skeleton className="h-4 w-24 bg-light-gray" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-12 bg-light-gray" />
        <Skeleton className="h-4 w-32 bg-light-gray" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20 bg-light-gray" />
        <Skeleton className="h-4 w-28 bg-light-gray" />
      </div>
    </div>
  </div>
);

/**
 * 마이페이지 멤버십 스켈레톤 컴포넌트
 */
export const MyPageMembershipSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-5 w-16 bg-light-gray" />
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-12 bg-light-gray" />
        <Skeleton className="h-4 w-20 bg-light-gray" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16 bg-light-gray" />
        <Skeleton className="h-4 w-24 bg-light-gray" />
      </div>
    </div>
  </div>
);

/**
 * 마이페이지 브랜드 스켈레톤 컴포넌트
 */
export const MyPageBrandSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-5 w-20 bg-light-gray" />
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <Skeleton className="h-4 w-16 bg-light-gray" />
          <Skeleton className="h-4 w-24 bg-light-gray" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * 마이페이지 전체 스켈레톤 컴포넌트
 */
export const MyPageSkeleton = () => (
  <div className="min-h-screen">
    <div className="space-y-6 pb-24">
      <MyPageHeaderSkeleton />
      <MyPageUserInfoSkeleton />
      <MyPageMembershipSkeleton />
      <MyPageBrandSkeleton />
    </div>
  </div>
);