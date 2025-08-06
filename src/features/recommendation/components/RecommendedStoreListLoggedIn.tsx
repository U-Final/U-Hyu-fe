import { useEffect } from 'react';

import { useMapStore } from '@kakao-map/store/MapStore';
import RecommendedStoreCard from '@recommendation/components/RecommendedCard';
import { useRecommendedStoresQuery } from '@recommendation/hooks/useRecommendQuery';
import { useUser } from '@user/store/userStore';
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

  if (isPending) return <BeatLoader size={10} />;
  if (error) return <p>{error.message}</p>;

  if (!stores || stores.length === 0) {
    return (
      <div className="flex justify-around items-center gap-10 ">
        <p className="text-gray text-sm">
          현재 위치 근처에 추천 매장이 없어요.
        </p>
        <img
          src="/images/empty/empty-state.png"
          alt="추천 매장이 없습니다."
          className="w-[80px]"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 헤더 섹션 */}
      <div className="flex items-start justify-between px-4 py-3">
        <div className="flex-1">
          <h2 className="text-black font-semibold text-lg leading-tight">
            <span className="text-primary text-xl font-bold">
              {user?.userName}
            </span>{' '}
            님 안녕하세요,
          </h2>
          <p className="text-gray-600 text-sm mt-1">오늘 이런 혜택 어떠세요?</p>
        </div>
      </div>

      {/* 추천 매장 리스트 */}
      <div>
        <div className="px-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={12}
            slidesPerView={1}
            centeredSlides={true}
            grabCursor
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="recommendation-swiper"
            style={
              {
                '--swiper-pagination-color': 'var(--color-primary)',
                '--swiper-pagination-bullet-inactive-color': '#D1D5DB',
                '--swiper-pagination-bullet-inactive-opacity': '0.5',
                '--swiper-pagination-bullet-size': '8px',
                '--swiper-pagination-bullet-horizontal-gap': '4px',
              } as React.CSSProperties
            }
          >
            {stores?.map(store => (
              <SwiperSlide key={store.storeId}>
                <RecommendedStoreCard
                  store={store}
                  autoCloseBottomSheet={true}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style>{`
            .recommendation-swiper .swiper-pagination {
              position: relative !important;
              bottom: auto !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              width: auto !important;
              margin-top: 20px !important;
              text-align: center !important;
            }
            
            .recommendation-swiper .swiper-pagination-bullet {
              transition: all 0.3s ease !important;
            }
            
            .recommendation-swiper .swiper-pagination-bullet-active {
              transform: scale(1.2) !important;
            }
          `}</style>
      </div>
    </div>
  );
};
