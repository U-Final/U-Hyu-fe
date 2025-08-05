import { type FC } from 'react';

interface InfoWindowSkeletonProps {
  /** 스켈레톤 타입 */
  type?: 'store' | 'recommended';
  /** 위치 정보 */
  position: { lat: number; lng: number };
}

/**
 * 인포윈도우 로딩 스켈레톤 컴포넌트
 * 인포윈도우 데이터 로딩 중에 표시되는 스켈레톤 UI
 */
const InfoWindowSkeleton: FC<InfoWindowSkeletonProps> = () => {
  return (
    <div className="relative w-[20rem] h-[280px] bg-white rounded-2xl shadow-lg p-6 pt-5 pb-8 animate-pulse">
      {/* 말풍선 꼬리 */}
      <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-8 h-8 z-10">
        <svg width="2rem" height="2rem" viewBox="0 0 32 32">
          <polygon points="16,32 0,0 32,0" fill="white" />
        </svg>
      </div>

      {/* 상단: 매장명, 즐겨찾기 */}
      <div className="relative z-10 mb-4">
        {/* 매장명 + 즐겨찾기 */}
        <div className="flex items-center justify-between mb-3">
          {/* 매장명 스켈레톤 */}
          <div className="h-7 bg-gray-300 rounded-md w-3/5"></div>

          {/* 즐겨찾기 버튼 + 카운트 스켈레톤 */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-8"></div>
          </div>
        </div>

        {/* 등급별 혜택 제목 스켈레톤 */}
        <div className="h-4 bg-gray-200 rounded-md w-20 mb-2"></div>

        {/* 혜택 정보 (등급+혜택) 스켈레톤 */}
        <div className="flex flex-row items-stretch">
          {/* 등급 스켈레톤 */}
          <div className="bg-gray-200 px-2 py-1 rounded-tl rounded-bl min-w-[48px] text-center shrink-0 flex items-center justify-center">
            <div className="h-4 bg-gray-300 rounded w-8"></div>
          </div>
          {/* 혜택 텍스트 스켈레톤 */}
          <div className="bg-gray-100 px-3 py-1 rounded-tr rounded-br flex-1 min-w-0">
            <div className="space-y-1">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 제공 횟수 스켈레톤 */}
      <div className="mb-4 relative z-10">
        {/* 제목 스켈레톤 */}
        <div className="h-4 bg-gray-200 rounded-md w-16 mb-2"></div>
        {/* 내용 스켈레톤 */}
        <div className="space-y-1">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>

      {/* 이용방법 스켈레톤 */}
      <div className="relative z-10">
        {/* 제목 스켈레톤 */}
        <div className="h-4 bg-gray-200 rounded-md w-16 mb-2"></div>
        {/* 내용 스켈레톤 */}
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * 간단한 인포윈도우 스켈레톤 (추천 매장용)
 */
export const SimpleInfoWindowSkeleton: FC<
  Pick<InfoWindowSkeletonProps, 'position'>
> = () => {
  return (
    <div className="relative">
      {/* 말풍선 꼬리 - 뒤쪽에 배치 */}
      <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-6 h-6 z-0">
        <svg width="24" height="24" viewBox="0 0 24 24" className="">
          <polygon points="12,24 0,0 24,0" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 bg-white rounded-[14px] shadow-lg border border-gray-200 p-4 w-[300px] min-h-[160px] border-b-0 animate-pulse">
        {/* 로고 + 매장 정보 스켈레톤 */}
        <div className="flex items-center gap-3 mb-3">
          {/* 로고 스켈레톤 */}
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>

          {/* 매장명 + 주소 + 브랜드 정보 스켈레톤 */}
          <div className="flex-1 min-w-0">
            <div className="h-5 bg-gray-300 rounded-md w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded-md w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded-md w-2/3"></div>
          </div>
        </div>

        {/* 추천 혜택 배지 스켈레톤 */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
          {/* 헤더 아이콘 + 텍스트 스켈레톤 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-yellow-200 rounded"></div>
            <div className="h-4 bg-yellow-200 rounded w-20"></div>
            <div className="h-3 bg-yellow-200 rounded w-16"></div>
          </div>
          {/* 혜택 내용 스켈레톤 */}
          <div className="space-y-1">
            <div className="h-4 bg-yellow-200 rounded w-full"></div>
            <div className="h-4 bg-yellow-200 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoWindowSkeleton;
