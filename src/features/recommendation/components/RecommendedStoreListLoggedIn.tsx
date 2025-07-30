import { useMapStore } from '@kakao-map/store/MapStore';
import RecommendedStoreCard from '@recommendation/components/RecommendedCard';
import { useRecommendedStoresQuery } from '@recommendation/hooks/useRecommendQuery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useUser } from '@/shared/store/userStore';

export const RecommendedStoreListLoggedIn = () => {
  const { userLocation } = useMapStore();
  const user = useUser();

  const {
    data: stores,
    isLoading,
    error,
  } = useRecommendedStoresQuery({
    lat: userLocation?.lat ?? 37.56,
    lon: userLocation?.lng ?? 125.97,
    radius: 5000,
  });

  // if (!userLocation) return <p>현재 위치 정보 불러오는 중 .. !</p>;
  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>{error.message}</p>;

  if (!stores || stores.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-gray text-sm">
          현재 위치 근처에 추천 매장이 없어요.
        </p>
        <img
          src="/public/images/recommedation/empty-state-2.png"
          alt="추천 매장이 없습니다."
          className="w-[300px]"
        />
      </div>
    );
  }

  return (
    <div>
      <p className="text-black font-semibold text-lg px-4 pt-2">
        {user?.userName}님 안녕하세요, 오늘은 이런 혜택 어떠세요?
      </p>
      <Swiper
        spaceBetween={4}
        slidesPerView={1.2}
        grabCursor
        style={{ paddingRight: '1rem' }}
      >
        {stores?.map(store => (
          <SwiperSlide key={store.storeId}>
            <RecommendedStoreCard store={store} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
