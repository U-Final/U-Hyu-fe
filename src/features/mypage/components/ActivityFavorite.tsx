import { useRef, useEffect, useState } from 'react';
import { useBookmarkListInfiniteQuery } from '@mypage/hooks/useActivityQuery';
import { BrandWithFavoriteCard } from '@/shared/components/cards/BrandWithFavoriteCard';
import { deleteBookmark } from '@mypage/api/mypageApi';
import type { Bookmark } from '@mypage/api/types';

interface Props {
  enabled: boolean;
}

const ActivityFavorite = ({ enabled }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useBookmarkListInfiniteQuery(enabled);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [removingIds, setRemovingIds] = useState<number[]>([]);

  useEffect(() => {
    if (!hasNextPage || !enabled) return;
    const currentLoader = loaderRef.current;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.3 }
    );
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, enabled]);

  // enabled가 false일 때는 아무것도 렌더링하지 않음
  if (!enabled) return null;

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  const bookmarks = (data?.pages.flat() as Bookmark[]) || [];

  const handleFavoriteClick = async (bookmarkId: number) => {
    setRemovingIds((prev) => [...prev, bookmarkId]);
    try {
      await deleteBookmark(bookmarkId);
      await refetch();
    } catch (error) {
      console.error('즐겨찾기 삭제 실패:', error);
      // 에러 발생 시 removingIds에서 제거
      setRemovingIds((prev) => prev.filter((id) => id !== bookmarkId));
      return;
    }
    setTimeout(() => {
      setRemovingIds((prev) => prev.filter((id) => id !== bookmarkId));
    }, 300);
  };

  return (
    <div className="space-y-[1rem]">
      {bookmarks.map((store: Bookmark) => (
        <div
          key={store.bookmarkId}
          className={
            'transition-all duration-300' +
            (removingIds.includes(store.bookmarkId)
              ? ' opacity-0 translate-x-10 pointer-events-none'
              : '')
          }
        >
          <BrandWithFavoriteCard
            logoUrl={store.logoImage}
            isStarFilled={true}
            onFavoriteClick={() => handleFavoriteClick(store.bookmarkId)}
            className="border border-gray-200 rounded-[1rem] p-4"
          >
            <div>
              <h3 className="font-semibold text-[0.9rem]">{store.storeName}</h3>
              <p className="text-sm text-gray">{store.addressDetail}</p>
              {store.benefit && <p className="text-xs text-gray mt-1">{store.benefit}</p>}
            </div>
          </BrandWithFavoriteCard>
        </div>
      ))}
      {bookmarks.length === 0 && !isLoading && (
        <div className="text-center py-[1rem] text-sm text-gray">
          즐겨찾기 매장이 없습니다.
        </div>
      )}
      <div ref={loaderRef} style={{ height: '4rem' }} />
      {isFetchingNextPage && <div className="text-center py-2 text-gray">불러오는 중...</div>}
      {!hasNextPage && bookmarks.length > 0 && !isFetchingNextPage && (
        <div className="text-center py-2 text-gray">모든 즐겨찾기를 다 불러왔습니다.</div>
      )}
    </div>
  );
};

export default ActivityFavorite;
