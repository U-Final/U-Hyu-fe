import { useActivityBrandsQuery } from '@mypage/hooks/useActivityQuery';

const ActivityBrands = () => {
  const { data, isLoading, error } = useActivityBrandsQuery();
  if (isLoading) return <div>로딩중...</div>;
  if (error || !data) return <div>에러 발생</div>;
  return (
    <div className="border border-gray-200 rounded-[1rem] p-[1.25rem]">
      <p className="text-[0.75rem] text-gray mb-[0.5rem]">가장 많이 방문한 브랜드</p>
      <ul className="space-y-[0.75rem]">
        {data.map((brand, index) => (
          <li key={brand.id} className="flex items-center gap-[0.75rem]">
            <span className="text-primary font-bold">{index + 1}</span>
            <img
              src={`/images/brands/${brand.brandName}.png`}
              alt={brand.brandName}
              className="
                w-[2rem] h-[2rem]
                rounded-full bg-white object-contain
                border border-gray-300
              "
            />
            <div className="flex-1">
              <span className="text-[0.875rem] text-black">{brand.brandName}</span>
              <p className="text-[0.75rem] text-gray">
                방문 {brand.visitCount}회 • {new Date(brand.lastVisitAt).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityBrands;
