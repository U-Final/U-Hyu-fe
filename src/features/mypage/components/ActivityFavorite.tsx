import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useBookmarkListInfiniteQuery } from '@mypage/hooks/useActivityQuery';
import { BrandWithFavoriteCard } from '@/shared/components/cards/BrandWithFavoriteCard';
import { deleteBookmark } from '@mypage/api/mypageApi';
import type { Bookmark } from '@mypage/api/types';
import { Heart, MapPin, Star } from 'lucide-react';

interface Props {
  enabled: boolean;
}

const ActivityFavorite = ({ enabled }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useBookmarkListInfiniteQuery(enabled);
  const loaderRef = useRef<HTMLDivElement | null>(null);

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
 
  const bookmarks = (data?.pages.flat() as Bookmark[]) || [];

  const handleFavoriteClick = async (bookmarkId: number) => {
    const previousData = queryClient.getQueryData(['bookmarkList']);
    
    // Optimistic Update: 즉시 UI에서 제거
    queryClient.setQueryData(['bookmarkList'], (old: { pages: Bookmark[][] } | undefined) => {
      if (!old?.pages) return old;
      
      return {
        ...old,
        pages: old.pages.map((page: Bookmark[]) => 
          page.filter((bookmark: Bookmark) => bookmark.bookmarkId !== bookmarkId)
        )
      };
    });

    try {
      const result = await deleteBookmark(bookmarkId);
      
      if (result.statusCode === 0) {
        await queryClient.invalidateQueries({ queryKey: ['bookmarkList'] });
      }
    } catch (error) {
      console.error('즐겨찾기 삭제 실패:', error);
      
      // 실패 시 이전 상태로 롤백
      if (previousData) {
        queryClient.setQueryData(['bookmarkList'], previousData);
      }
    
      return;
    }
  };

  return (
    <div className="space-y-[1rem]">
      {bookmarks.map((store: Bookmark) => (
        <div
          key={store.bookmarkId}
          className="transition-all duration-300"
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
      {!isLoading && bookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          {/* 빈 상태 아이콘 */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-pink-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          
          {/* 메인 메시지 */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            아직 즐겨찾기한 매장이 없어요
          </h3>
          
          {/* 설명 메시지 */}
          <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
            지도에서 마음에 드는 매장을 찾아서<br />
            즐겨찾기에 추가해보세요!
          </p>
          
          {/* 액션 버튼 */}
          <button
            onClick={() => navigate('/map')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors duration-200"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">지도로 가기</span>
          </button>
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
