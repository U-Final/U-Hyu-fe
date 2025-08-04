import { useEffect } from 'react';

import { useMapStore } from '@kakao-map/store/MapStore';
import RecommendedStoreCard from '@recommendation/components/RecommendedCard';
import { RecommendedStoresToggle } from '@recommendation/components/ToggleButton';
import { useRecommendedStoresQuery } from '@recommendation/hooks/useRecommendQuery';
import { BeatLoader } from 'react-spinners';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useUser } from '@/shared/store/userStore';

export const RecommendedStoreListLoggedIn = () => {
  const { userLocation } = useMapStore();
  const user = useUser();
  const RADIUS = Number(import.meta.env.VITE_RECOMMEND_RADIUS);

  // 전역상태에서 추천 매장 관련 상태와 액션 가져오기
  const setRecommendedStores = useMapStore(state => state.setRecommendedStores);
  const showRecommendedStores = useMapStore(
    state => state.showRecommendedStores
  );

  // React Query로 데이터 가져오기 (기존 방식 유지)
  const {
    data: stores,
    isPending,
    error,
  } = useRecommendedStoresQuery({
    lat: userLocation?.lat ?? 37.56,
    lon: userLocation?.lng ?? 125.97,
    radius: RADIUS,
  });

  // React Query 결과를 전역상태에 동기화
  useEffect(() => {
    if (stores && stores.length > 0) {
      setRecommendedStores(stores);
    }
  }, [stores, setRecommendedStores]);

  if (isPending) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mx-4 my-3">
        <div className="flex items-center justify-center py-8">
          <BeatLoader size={8} color="#6366f1" />
          <span className="ml-3 text-sm text-gray-600">
            맞춤 매장을 찾고 있어요...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-2xl p-6 mx-4 my-3">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">😵</div>
            <p className="text-red-600 text-sm font-medium">추천 서비스 오류</p>
            <p className="text-red-500 text-xs mt-1">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stores || stores.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 mx-4 my-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                추천 매장
              </span>
            </div>
            <p className="text-gray-700 text-sm font-medium leading-relaxed">
              현재 위치 근처에
              <br />
              추천할 매장이 없어요
            </p>
          </div>
          <div className="opacity-60">
            <img
              src="/images/recommendation/empty-state-2.png"
              alt="추천 매장이 없습니다."
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-3">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-2xl mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <div className="flex-1">
            {/* 추천 라벨 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                맞춤 추천
              </span>
            </div>

            {/* 인사말 */}
            <div className="space-y-1">
              <p className="text-gray-800 font-bold text-lg leading-tight">
                <span className="text-indigo-600 font-extrabold">
                  {user?.userName}
                </span>
                님,
              </p>
              <p className="text-gray-700 text-sm font-medium leading-relaxed">
                오늘 이런 혜택은 어떠세요?
              </p>
            </div>
          </div>

          {/* 토글 버튼 */}
          <div className="ml-4">
            <RecommendedStoresToggle />
          </div>
        </div>

        {/* 스와이퍼 섹션 */}
        {showRecommendedStores && (
          <div className="px-6 pb-6">
            {/* 매장 개수 표시 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-indigo-600 font-medium">
                  총 {stores.length}개 매장
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(stores.length, 3) }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 bg-indigo-400 rounded-full"
                      ></div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* 스와이퍼 */}
            <div className="relative">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={12}
                slidesPerView={1}
                centeredSlides={true}
                grabCursor
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  bulletClass:
                    'swiper-pagination-bullet !bg-indigo-300 !opacity-60',
                  bulletActiveClass:
                    'swiper-pagination-bullet-active !bg-indigo-500 !opacity-100',
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="recommendation-swiper"
                style={{
                  paddingBottom: '2rem',
                }}
              >
                {stores?.map((store, index) => (
                  <SwiperSlide key={store.storeId}>
                    <div className="relative">
                      {/* 순서 표시 */}
                      <div className="absolute -top-2 -left-2 z-10">
                        <div className="w-6 h-6 bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      <RecommendedStoreCard
                        store={store}
                        autoCloseBottomSheet={true}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>

      {/* 커스텀 스타일 */}
      <style>{`
        .recommendation-swiper .swiper-pagination {
          position: relative;
          margin-top: 1rem;
        }

        .recommendation-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .recommendation-swiper .swiper-pagination-bullet-active {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};
