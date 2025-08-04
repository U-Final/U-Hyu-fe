import { useActivityStatisticsQuery } from '@mypage/hooks/useActivityQuery';
import { useUserInfo } from '@user/hooks/useUserQuery';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { ActivityBrandsDetailSkeleton } from '@/shared/components/skeleton';

const ActivityBrands = () => {
  const { data, isLoading, error } = useActivityStatisticsQuery();
  const { data: userData } = useUserInfo();
  const [showAllStores, setShowAllStores] = useState(false);
  
  if (isLoading) {
    return <ActivityBrandsDetailSkeleton />;
  }
  
  if (error || !data) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">데이터를 불러올 수 없어요</h4>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            잠시 후 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative z-0">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🔍</span>
            </div>
            클릭 패턴 분석
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            최근 클릭 기록을 바탕으로, 자주 살펴본 멤버십 사용처를 알려드릴게요.
            <br/>
            <span className="text-primary font-medium">U-HYU에서의 활동이 {userData?.data?.nickName || '사용자'}님의 관심사를 보여줘요</span>.
          </p>
        </div>
        
        {(!data.bestBrandList || data.bestBrandList.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">아직 클릭 기록이 없어요</h4>
            <p className="text-sm text-gray-500 text-center max-w-md">
              지도에서 마커를 클릭해보세요!<br/> 클릭한 곳들이 {userData?.data?.nickName || '사용자'}님의 관심사를 알려줄 거예요.
            </p>
          </div>
                                            ) : (
           <div className="relative flex items-end justify-center gap-6 h-80">
             <div className="absolute bottom-0 left-0 right-0 h-75 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-t-3xl shadow-2xl z-0"></div>
           
             {data.bestBrandList[2] && (
               <div className="relative z-1 flex flex-col items-center">
                 <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-xl border-4 border-amber-400 flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-200 overflow-hidden">
                   <img
                     src={data.bestBrandList[2].bestBrandImage}
                     alt={data.bestBrandList[2].bestBrandName}
                     className="w-12 h-12 object-cover rounded-full"
                     onError={(e) => {
                       e.currentTarget.src = '/images/share/url.png';
                     }}
                   />
                 </div>
                 
                 <p className="text-sm font-bold text-white whitespace-nowrap mb-4 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                   {data.bestBrandList[2].bestBrandName}
                 </p>
                 
                 <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                   <span className="text-sm font-bold text-white">3</span>
                 </div>
              
                 <div className="w-32 h-16 bg-gradient-to-b from-amber-500 to-amber-600 rounded-t-2xl shadow-lg"></div>
               </div>
             )}
            
             {data.bestBrandList[0] && (
               <div className="relative z-1 flex flex-col items-center">
             
                 <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-2xl border-4 border-yellow-300 flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-200 overflow-hidden">
                   <img
                     src={data.bestBrandList[0].bestBrandImage}
                     alt={data.bestBrandList[0].bestBrandName}
                     className="w-16 h-16 object-cover rounded-full"
                     onError={(e) => {
                       e.currentTarget.src = '/images/share/url.png';
                     }}
                   />
                 </div>
                 
                
                 <p className="text-base font-bold text-white whitespace-nowrap mb-4 bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm">
                   {data.bestBrandList[0].bestBrandName}
                 </p>
                 
            
                 <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                   <span className="text-base font-bold text-white">1</span>
                 </div>
               
                 <div className="w-40 h-24 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-2xl shadow-lg"></div>
               </div>
             )}
        
             {data.bestBrandList[1] && (
               <div className="relative z-1 flex flex-col items-center">
            
                 <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shadow-xl border-4 border-gray-200 flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-200 overflow-hidden">
                   <img
                     src={data.bestBrandList[1].bestBrandImage}
                     alt={data.bestBrandList[1].bestBrandName}
                     className="w-12 h-12 object-cover rounded-full"
                     onError={(e) => {
                       e.currentTarget.src = '/images/share/url.png';
                     }}
                   />
                 </div>
                 
                 <p className="text-sm font-bold text-white whitespace-nowrap mb-4 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                   {data.bestBrandList[1].bestBrandName}
                 </p>
                
                 <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                   <span className="text-sm font-bold text-white">2</span>
                 </div>
                 
                 <div className="w-36 h-20 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-2xl shadow-lg"></div>
               </div>
             )}
           </div>
         )}
      </div>

      {/* 최근 방문한 매장 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            방문 기록
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            최근에 방문하신 매장들을 확인해보세요.
            <br/>
            <span className="text-primary font-medium">다양한 매장을 탐방해보세요!</span>
          </p>
        </div>
        
        {(!data.recentStoreList || data.recentStoreList.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">아직 방문 기록이 없어요</h4>
            <p className="text-sm text-gray-500 text-center max-w-md">
              지도에서 매장을 찾아서 방문 기록을 쌓아보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {data.recentStoreList.slice(0, showAllStores ? data.recentStoreList.length : 6).map((store) => (
                <div key={store.recentStoreId} className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <img
                    src={store.recentBrandImage}
                    alt={store.recentStoreName}
                    className="w-16 h-16 rounded-lg bg-white object-contain border border-gray-200 shadow-sm mb-3"
                    onError={(e) => {
                      e.currentTarget.src = '/images/share/url.png';
                    }}
                  />
                  
                  <h4 className="text-sm font-semibold text-gray-800 text-center leading-tight">
                    {store.recentStoreName}
                  </h4>
                </div>
              ))}
            </div>
            
                          {data.recentStoreList.length > 6 && (
                <div className="text-center pt-4">
                  <button 
                    onClick={() => setShowAllStores(!showAllStores)}
                    className="text-xs text-primary hover:text-primary-hover transition-colors"
                  >
                    {showAllStores ? '접기' : `+${data.recentStoreList.length - 6}개 더 보기`}
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityBrands;
