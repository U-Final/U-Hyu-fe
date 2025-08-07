import { useNearbyStoresQuery } from "@home/hooks/useNearbyStoresQuery";


export const AuthNearbyStoresSection = () => {
  const { data: stores, isLoading, isError } = useNearbyStoresQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>매장 정보를 불러오지 못했습니다.</div>;

  return (
    <section className="px-4 py-6 border">
      <ul className="space-y-3">
        {stores?.map((store, idx) => (
          <li
            key={idx}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="text-lg font-semibold">{store.store_name}</div>
            <div className="text-sm text-gray-500">{store.addr_detail}</div>
            <div className="text-sm mt-1 text-primary font-medium">
              {store.description}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
