import { useEffect, useState, useCallback } from "react";
import { BrandWithFavoriteCard } from "@/shared/components/cards/BrandWithFavoriteCard";
import { useActivityFavoritesQuery } from "@features/mypage/hooks/useActivityQuery";
import { throttle } from "lodash";
import { Loader2 } from "lucide-react";

const ITEMS_PER_LOAD = 5;

interface Props {
   scrollRef: React.RefObject<HTMLDivElement | null>;
}

interface FavoriteBrand {
  id: number;
  image: string;
  name: string;
  description: string;
  isFavorite: boolean;
}

const ActivityFavorite = ({ scrollRef }: Props) => {
  const { data, isLoading: isQueryLoading, error } = useActivityFavoritesQuery();
  const [brands, setBrands] = useState<FavoriteBrand[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 쿼리 데이터가 바뀌면 초기화
  useEffect(() => {
    if (data) {
      setBrands(data.slice(0, ITEMS_PER_LOAD));
    }
  }, [data]);

  // 즐겨찾기 토글 핸들러
  const handleFavoriteToggle = (brandId: number) => {
    setBrands(prevBrands =>
      prevBrands.map(brand =>
        brand.id === brandId
          ? { ...brand, isFavorite: !brand.isFavorite }
          : brand
      )
    );
  };

  const loadMore = useCallback(() => {
    if (!data) return;
    setIsLoading(true);
    setTimeout(() => {
      setBrands(prevBrands => {
        if (prevBrands.length >= data.length) {
          setIsLoading(false);
          return prevBrands;
        }
        const nextItems = data.slice(
          prevBrands.length,
          prevBrands.length + ITEMS_PER_LOAD
        );
        if (nextItems.length === 0) {
          setIsLoading(false);
          return prevBrands;
        }
        setIsLoading(false);
        return [...prevBrands, ...nextItems];
      });
    }, 1000);
  }, [data]);

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
  }, [scrollRef, brands, isLoading, loadMore]);

  if (isQueryLoading) return <div>로딩중...</div>;
  if (error || !data) return <div>에러 발생</div>;

  return (
    <div className="space-y-[1rem]">
      {brands.map((brand) => (
        <BrandWithFavoriteCard
          key={brand.id}
          logoUrl={brand.image}
          isStarFilled={brand.isFavorite}
          onFavoriteClick={() => handleFavoriteToggle(brand.id)}
          className="border border-gray-200 rounded-[1rem] p-4"
        >
          <div>
            <h3 className="font-semibold text-[0.9rem]">{brand.name}</h3>
            <p className="text-sm text-[var(--text-gray)]">{brand.description}</p>
          </div>
        </BrandWithFavoriteCard>
      ))}

      {isLoading && (
        <div className="flex justify-center py-[1rem]">
          <Loader2 className="w-5 h-5 animate-spin text-[var(--text-gray)]" />
        </div>
      )}
      {!isLoading && brands.length === data.length && (
        <div className="text-center py-[1rem] text-sm text-[var(--text-gray)]">
          🔔 모든 즐겨찾기를 다 불러왔어요!
        </div>
      )}
    </div>
  );
};

export default ActivityFavorite;
