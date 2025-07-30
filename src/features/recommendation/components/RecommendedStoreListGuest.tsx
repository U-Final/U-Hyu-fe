import { GuestCard } from '@recommendation/components/GuestCard';
import { useRecommendedGuestQuery } from '@recommendation/hooks/useRecommendQuery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const RecommendedStoreListGuest = () => {
  const { data: brands, isPending, error } = useRecommendedGuestQuery();

  if (isPending) return <p>불러오는 중 ...</p>;
  if (error) return <p>{error.message}</p>;

  if (!brands || brands.length === 0) {
    return (
      <p>
        오늘의 인기 제휴처가 없습니다 🔥 <br /> 내일 만나요 !
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center px-4 pt-2">
        <p className="text-primary font-bold text-h3">
          🔥 오늘의 인기 제휴처 🔥
        </p>
      </div>

      <div className="flex items-center justify-center pb-2">
        <p className="text-secondary">로그인하고 나에게 맞는 혜택 추천 받기</p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        grabCursor
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2000, // 2초마다 자동 이동
          disableOnInteraction: false,
        }}
        style={{ height: '80px' }}
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
