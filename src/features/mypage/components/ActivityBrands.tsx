import { useActivityStatisticsQuery } from '@mypage/hooks/useActivityQuery';

const ActivityBrands = () => {
  const { data, isLoading, error } = useActivityStatisticsQuery();
  
  if (isLoading) return <div>로딩중...</div>;
  
  if (error || !data || !data.bestBrandList || data.bestBrandList.length === 0) {
    return (
      <div className="border border-gray-200 rounded-[1rem] p-[1.25rem]">
        <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1.5rem]">
          <p className="text-[0.75rem] text-gray mb-[0.5rem]">가장 많이 방문한 브랜드</p>
          
          {/* 빈 상태 UI */}
          <div className="flex flex-col items-center justify-center py-[1rem]">
            {/* 방문 아이콘 */}
            <div className="relative w-[3rem] h-[3rem] mb-[0.75rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🏆</span>
              </div>
            </div>
            
            <p className="font-medium text-[0.875rem] text-gray-700 mb-[0.25rem]">아직 방문 기록이 없어요</p>
            <p className="text-[0.75rem] text-gray-500">
              지도에서 매장을 찾아서 방문 기록을 쌓아보세요!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 정상 데이터가 있을 때는 원래 UI 그대로
  return (
    <div className="border border-gray-200 rounded-[1rem] p-[1.25rem]">
      <p className="text-[0.75rem] text-gray mb-[0.5rem]">가장 많이 방문한 브랜드</p>
      <ul className="space-y-[0.75rem]">
        {data.bestBrandList.map((brand, index) => (
          <li key={brand.brandId} className="flex items-center gap-[0.75rem]">
            <span className="text-primary font-bold">{index + 1}</span>
            <img
              src={brand.logoImage}
              alt={brand.brandName}
              className="w-[2rem] h-[2rem] rounded-full bg-white object-contain border border-gray-300"
            />
            <div className="flex-1">
              <span className="text-[0.875rem] text-black">{brand.brandName}</span>
              <p className="text-[0.75rem] text-gray">
                방문 {brand.visitCount}회 • {new Date(brand.lastVisitAt).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityBrands;
