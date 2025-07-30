import { GuestCard } from '@recommendation/components/GuestCard';
import { useRecommendedGuestQuery } from '@recommendation/hooks/useRecommendQuery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export const RecommendedStoreListGuest = () => {
  const { data: brands, isPending, error } = useRecommendedGuestQuery();

  if (isPending) return <p>불러오는 중 ...</p>;
  if (error) return <p>{error.message}</p>;

  if (!brands || brands.length === 0) {
    return <p>현재 위치 근처에 추천 매장이 없어요</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4 pt-2 pb-2">
        <p className="text-black font-semibold text-lg">
          안녕하세요, 오늘은 이런 혜택 어떠세요?
        </p>
      </div>

      <Swiper
        spaceBetween={4}
        slidesPerView={1.2}
        grabCursor
        style={{ paddingRight: '1rem' }}
      >
        {brands?.map(brand => (
          <SwiperSlide key={brand.brandId}>
            <GuestCard brand={brand} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
