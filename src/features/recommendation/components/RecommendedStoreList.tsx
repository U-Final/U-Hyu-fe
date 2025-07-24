import { useRecommendedStoresQuery } from '@recommendation/hooks/useRecommendQuery';

// 예시로 만든 UI 추후 수정.
const RecommendedStoreList = () => {
  const {
    data: stores,
    isLoading,
    error,
  } = useRecommendedStoresQuery({
    lat: 37.56,
    lon: 126.97,
    radius: 1000,
  });

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="space-y-4 p-4">
      {stores?.map(store => (
        <div
          key={store.store_id}
          className="border p-4 rounded-lg shadow-sm bg-white flex"
        >
          <div className="flex-1">
            <p>{store.store_name}</p>
            <p>{store.addr_detail}</p>
            <p>{store.description}</p>
          </div>
          <img src={store.logo_image} className="w-[100px]" />
        </div>
      ))}
    </div>
  );
};

export default RecommendedStoreList;
