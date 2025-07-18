import { useEffect, useState } from "react";
import { BrandWithFavoriteCard } from "@components/cards/BrandWithFavoriteCard";
import { mockFavoriteBrands } from "@mypage/types/mockActivity";
import { throttle } from "lodash";
import { Loader2 } from "lucide-react";

const ITEMS_PER_LOAD = 5;

interface Props {
   scrollRef: React.RefObject<HTMLDivElement | null>;
}


const ActivityFavorite = ({ scrollRef }: Props) => {
  const [brands, setBrands] = useState(mockFavoriteBrands.slice(0, ITEMS_PER_LOAD));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const div = scrollRef.current;
      if (!div) return;
      if (div.scrollTop + div.clientHeight >= div.scrollHeight - 200) {
        loadMore();
      }
    }, 100);

    const div = scrollRef.current;
    if (div) div.addEventListener("scroll", handleScroll);
    return () => {
      if (div) div.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef, brands, isLoading]);

  const loadMore = () => {
    if (isLoading) return;
    if (brands.length >= mockFavoriteBrands.length) return;

    setIsLoading(true);

    setTimeout(() => {
      const nextItems = mockFavoriteBrands.slice(
        brands.length,
        brands.length + ITEMS_PER_LOAD
      );
      setBrands(prev => [...prev, ...nextItems]);
      setIsLoading(false);
    }, 1000);
  };

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
        <div className="flex justify-center py-[1rem]">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      )}
      {!isLoading && brands.length === mockFavoriteBrands.length && (
        <div className="text-center py-[1rem] text-sm text-gray-400">
          🔔 모든 즐겨찾기를 다 불러왔어요!
        </div>
      )}
    </div>
  );
};

export default ActivityFavorite;
