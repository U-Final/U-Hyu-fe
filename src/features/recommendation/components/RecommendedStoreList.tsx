import RecommendedStoreCard from '@recommendation/components/RecommendedCard';
import { useRecommendedStoresQuery } from '@recommendation/hooks/useRecommendQuery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useUser } from '@/shared/store/useUserStore';

export const RecommendedStoreList = () => {
  const {
    data: stores,
    isLoading,
    error,
  } = useRecommendedStoresQuery({
    lat: 37.56,
    lon: 126.97,
    radius: 1000,
  });

  const user = useUser();

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="">
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
          <SwiperSlide key={store.store_id}>
            <RecommendedStoreCard store={store} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
