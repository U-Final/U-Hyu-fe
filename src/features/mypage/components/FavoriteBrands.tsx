import { useEffect, useState, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { BrandWithFavoriteCard } from '@/shared/components/cards/BrandWithFavoriteCard';
import { mockFavoriteBrands } from '@mypage/mock/mockActivity';

const ITEMS_PER_LOAD = 5;

const FavoriteBrands = () => {
  const [brands, setBrands] = useState(mockFavoriteBrands.slice(0, ITEMS_PER_LOAD));
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (isLoading) return;

    //모든 데이터 불러왔으면 로딩 중단
    if (brands.length >= mockFavoriteBrands.length) return;

    setIsLoading(true);

    setTimeout(() => {
      const nextItems = mockFavoriteBrands.slice(brands.length, brands.length + ITEMS_PER_LOAD);
      setBrands((prev) => [...prev, ...nextItems]);
      setIsLoading(false);
    }, 1000); //로딩 시뮬레이션
  };

  const throttledHandleScroll = useCallback(
    throttle(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
      }
    }, 200),
    [brands, isLoading]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll]);

  return (
    <div className="space-y-[1rem]">
      {brands.map((brand) => (
        <BrandWithFavoriteCard
          key={brand.id}
          logoUrl={brand.image}
          isStarFilled={brand.isFavorite}
          onFavoriteClick={() => {
            console.warn('즐겨찾기 기능 미구현');
          }}
        >
          <div>
            <h3 className="font-semibold text-[0.9rem]">{brand.name}</h3>
            <p className="text-sm text-gray-500">{brand.description}</p>
          </div>
        </BrandWithFavoriteCard>
      ))}

      {isLoading && (
        <div className="text-center py-[1rem] text-sm text-gray-500">
          불러오는 중...
        </div>
      )}
    </div>
  );
};

export default FavoriteBrands;
