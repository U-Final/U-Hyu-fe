import { useEffect } from 'react';

import { useMapStore } from '@kakao-map/store/MapStore';
import RecommendedStoreCard from '@recommendation/components/RecommendedCard';
import { RecommendedStoresToggle } from '@recommendation/components/ToggleButton';
import { useRecommendedStoresQuery } from '@recommendation/hooks/useRecommendQuery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useUser } from '@/shared/store/userStore';

export const RecommendedStoreListLoggedIn = () => {
  const { userLocation } = useMapStore();
  const user = useUser();

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
    radius: 5000,
  });

  // React Query 결과를 전역상태에 동기화
  useEffect(() => {
    if (stores && stores.length > 0) {
      setRecommendedStores(stores);
    }
  }, [stores, setRecommendedStores]);

  if (isPending) return <p>불러오는 중...</p>;
  if (error) return <p>{error.message}</p>;

  if (!stores || stores.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-gray text-sm">
          현재 위치 근처에 추천 매장이 없어요.
        </p>
        <img
          src="/images/recommendation/empty-state-2.png"
          alt="추천 매장이 없습니다."
          className="w-[300px]"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-black font-semibold text-lg">
          <span className="text-primary text-h3">{user?.userName}</span> 님
          안녕하세요,
          <br />
          오늘 이런 혜택 어떠세요?
        </p>
        {/* 토글 버튼 추가 */}
        <RecommendedStoresToggle />
      </div>

      {/* 토글 상태에 따라 조건부 렌더링 */}
      {showRecommendedStores && (
        <div className="pl-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={8}
            slidesPerView={1}
            centeredSlides={true}
            grabCursor
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            style={{ paddingRight: '1rem' }}
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
      )}
    </div>
  );
};
