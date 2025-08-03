import { useActivityStatisticsQuery } from '@mypage/hooks/useActivityQuery';

const ActivityBenefit = () => {
  const { data, isLoading, error } = useActivityStatisticsQuery();
  
  if (isLoading) return <div>로딩중...</div>;
  
  if (error || !data || data.discountMoney === null || data.discountMoney === 0) {
    return (
      <div className="border border-gray-200 rounded-[1rem] p-[1.25rem]">
        <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1.5rem] text-center">
          <p className="text-[0.75rem] text-gray mb-[0.5rem]">이번 달 받은 혜택</p>
          
          {/* 빈 상태 UI */}
          <div className="flex flex-col items-center justify-center py-[1rem]">
            {/* 돼지저금통 아이콘 */}
            <div className="relative w-[3rem] h-[3rem] mb-[0.75rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">₩</span>
              </div>
            </div>
            
            <p className="font-medium text-[0.875rem] text-gray-700 mb-[0.25rem]">아직 혜택이 없어요</p>
            <p className="text-[0.75rem] text-gray-500">
              지도에서 매장을 찾아서 다양한 혜택을 받아보세요!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 정상 데이터가 있을 때는 원래 UI 그대로
  return (
    <div className="border border-gray-200 rounded-[1rem] p-[1.25rem]">
      <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1.5rem] text-center">
        <p className="text-[0.75rem] text-gray mb-[0.5rem]">이번 달 받은 혜택</p>
        <img src="/images/benefit/image.png" alt="benefit" className="mx-auto h-[4.5rem]" />
        <p className="font-bold text-[1.125rem] text-black mt-[0.5rem]">
          {data.discountMoney.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default ActivityBenefit;