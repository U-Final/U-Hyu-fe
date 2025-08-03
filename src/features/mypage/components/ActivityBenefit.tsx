import { useActivityStatisticsQuery } from '@mypage/hooks/useActivityQuery';
import { useUserInfo } from '@user/hooks/useUserQuery';
import { Gift, Sparkles } from 'lucide-react';

const ActivityBenefit = () => {
  const { data, isLoading, error } = useActivityStatisticsQuery();
  const { data: userData } = useUserInfo();
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-16 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-red-500" />
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative z-0">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                     <div className="w-6 h-6 bg-purple-star rounded-full flex items-center justify-center">
             <Gift className="w-4 h-4 text-white" />
           </div>
          혜택 현황
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed text-center">
          현재까지 받으신 혜택을 확인해보세요.
          <span className="text-primary font-medium">더 많은 혜택을 누려보세요!</span>
        </p>
      </div>
      
      {(!data.discountMoney || data.discountMoney === 0) ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative mb-4">
                         <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center">
               <Gift className="w-8 h-8 text-primary" />
             </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">아직 혜택이 없어요</h4>
          <p className="text-sm text-gray-500 text-center max-w-md">
            {userData?.data?.nickName || '사용자'}님의 {userData?.data?.grade || '등급'} 등급으로 다양한 혜택을 받아보세요!
          </p>
        </div>
      ) : (
        <div className="relative">
   
          <div className="absolute inset-0 overflow-hidden rounded-xl">
          
                         <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-star rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
             <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
             <div className="absolute top-2 right-4 w-1 h-1 bg-blue rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
             <div className="absolute top-8 left-8 w-1.5 h-1.5 bg-green-star rounded-full animate-bounce" style={{ animationDelay: '0.9s' }}></div>
             <div className="absolute top-3 right-2 w-1 h-1 bg-purple-star rounded-full animate-bounce" style={{ animationDelay: '1.2s' }}></div>
             <div className="absolute top-5 left-2 w-1 h-1 bg-orange-star rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          </div>

          {/* 메인 혜택 카드 */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center mb-6">
                             <div className="flex items-center justify-center gap-2 mb-2">
                 <Sparkles className="w-5 h-5 text-sparkle animate-pulse" />
                 <span className="text-lg font-bold text-gray-800">축하합니다!</span>
                 <Sparkles className="w-5 h-5 text-sparkle animate-pulse" />
               </div>
              <p className="text-sm text-gray-600">{userData?.data?.nickName || '사용자'}님, 지금까지 이만큼 절약하셨네요</p>
            </div>

            <div className="relative mb-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                                         <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                       <span className="text-white text-xl font-bold">₩</span>
                     </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500">총 혜택 사용 금액</p>
                      <p className="text-3xl font-bold text-gray-800">{data.discountMoney?.toLocaleString()}원</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityBenefit;