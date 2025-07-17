import { useEffect, useState } from "react";
import { BrandWithFavoriteCard } from "@/shared/components/cards/BrandWithFavoriteCard";
import { mockFavoriteBrands } from "@mypage/mock/mockActivity";

const ITEMS_PER_LOAD = 5;

const ActivityFavorite = () => {
  const [brands, setBrands] = useState(mockFavoriteBrands.slice(0, ITEMS_PER_LOAD));
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      loadMore();
    }
  };

  const loadMore = () => {
    if (isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      const nextItems = mockFavoriteBrands.slice(brands.length, brands.length + ITEMS_PER_LOAD);
      setBrands(prev => [...prev, ...nextItems]);
      setIsLoading(false);
    }, 1000); //로딩 시뮬레이션
  };

  useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);  //마운트 시 1회만 실행

  return (
    <div className="space-y-[1rem]">
      {brands.map((brand) => (
        <BrandWithFavoriteCard
          key={brand.id}
          logoUrl={brand.image}
          isStarFilled={brand.isFavorite}
          onFavoriteClick={() => {}}
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

export default ActivityFavorite;
