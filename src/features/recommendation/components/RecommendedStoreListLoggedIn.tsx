import { useEffect } from 'react';

import { useMapStore } from '@kakao-map/store/MapStore';
import RecommendedStoreCard from '@recommendation/components/RecommendedCard';
import { useRecommendedStoresQuery } from '@recommendation/hooks/useRecommendQuery';
import { useUser } from '@user/store/userStore';
import { Star } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const RecommendedStoreListLoggedIn = () => {
  const { userLocation } = useMapStore();
  const user = useUser();
  const RADIUS = Number(import.meta.env.VITE_RECOMMEND_RADIUS);

  // 전역상태에서 추천 매장 관련 상태와 액션 가져오기
  const setRecommendedStores = useMapStore(state => state.setRecommendedStores);

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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-center items-center">
          <BeatLoader size={10} color="#f59e0b" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border-0 border-gray-100 p-6">
        <div className="text-center">
          <p className="text-red-500 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!stores || stores.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src="/images/empty/empty-state.png"
            alt="추천 매장이 없습니다."
            className="w-16 h-16 opacity-60"
          />
          <div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              현재 위치 근처에 추천 매장이 없어요
            </p>
            <p className="text-gray-400 text-xs">
              조금 더 넓은 범위에서 찾아보세요
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border-0 overflow-hidden">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
        <div className="flex items-start justify-between px-6 py-4">
          <div className="flex-1">
            <h2 className="text-gray-800 font-semibold text-lg leading-tight flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <span className="text-primary text-xl font-bold">
                {user?.userName}
              </span>
              님을 위한 추천
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              오늘 이런 혜택 어떠세요?
            </p>
          </div>
        </div>
      </div>

      {/* 추천 매장 리스트 */}
      <div className="p-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          centeredSlides={true}
          grabCursor
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="recommendation-swiper"
          style={
            {
              '--swiper-pagination-color': 'var(--color-primary)',
              '--swiper-pagination-bullet-inactive-color': '#D1D5DB',
              '--swiper-pagination-bullet-inactive-opacity': '0.5',
              '--swiper-pagination-bullet-size': '10px',
              '--swiper-pagination-bullet-horizontal-gap': '6px',
            } as React.CSSProperties
          }
        >
          {stores?.map(store => (
            <SwiperSlide key={store.storeId}>
              <div className="px-1">
                <RecommendedStoreCard
                  store={store}
                  autoCloseBottomSheet={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>{`
            .recommendation-swiper {
              padding-bottom: 16px;
            }
            
            .recommendation-swiper .swiper-pagination {
              position: relative !important;
              bottom: auto !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              width: auto !important;
              margin-top: 24px !important;
              text-align: center !important;
            }
            
            .recommendation-swiper .swiper-pagination-bullet {
              transition: all 0.3s ease !important;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
            }
            
            .recommendation-swiper .swiper-pagination-bullet-active {
              transform: scale(1.3) !important;
              box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
            }
          `}</style>
      </div>
    </div>
  );
};
