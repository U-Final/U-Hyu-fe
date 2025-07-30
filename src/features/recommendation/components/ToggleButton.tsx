import {
  useMapStore,
  useRecommendedStores,
  useShowRecommendedStores,
} from '@kakao-map/store/MapStore';

//TODO 추후 추천 마커 토글 버튼 UI 개선 필요
export const RecommendedStoresToggle: React.FC = () => {
  const showRecommendedStores = useShowRecommendedStores();
  const toggleRecommendedStores = useMapStore(
    state => state.toggleRecommendedStores
  );
  const recommendedStores = useRecommendedStores();

  return (
    <button
      onClick={toggleRecommendedStores}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg
        transition-all duration-200 text-sm font-medium cursor-pointer
        ${
          showRecommendedStores
            ? 'bg-yellow text-yellow-700 border border-yellow-100'
            : 'bg-gray-100 text-gray-600 border border-gray-300'
        }
        hover:shadow-sm active:scale-95
      `}
      aria-label={`추천 매장 ${showRecommendedStores ? '숨기기' : '보기'}`}
    >
      <span className="text-lg">★</span>
      <span>추천 매장</span>
      {recommendedStores.length > 0 && (
        <span className="text-xs bg-white px-1.5 py-0.5 rounded-full">
          {recommendedStores.length}
        </span>
      )}
    </button>
  );
};
