import { mockBrands } from '@mypage/mock/mockActivity';

const ActivityBrands = () => {
  return (
    <div className="rounded-[1rem] bg-white px-[1.25rem] py-[1.5rem]">
      <p className="text-[0.75rem] text-gray-500 mb-[0.5rem]">가장 많이 조회한 브랜드</p>
      <ul className="space-y-[0.75rem]">
        {mockBrands.map((brand) => (
          <li key={brand.rank} className="flex items-center gap-[0.75rem]">
            <span className="text-blue-500 font-bold">{brand.rank}</span>
            <img
              src={brand.image}
              alt={brand.name}
              className="
                w-[2rem] h-[2rem]
                rounded-full bg-white object-contain
                border border-gray-300
              "
            />
            <span className="text-[0.875rem] text-gray-800">{brand.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityBrands;
