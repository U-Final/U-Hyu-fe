import { mockBrands } from '@mypage/types/mockActivity';

const ActivityBrands = () => {
  return (
    <div className="border border-gray-200 rounded-[1rem] p-[1.25rem]">
      <p className="text-[0.75rem] text-[var(--text-gray)] mb-[0.5rem]">가장 많이 조회한 브랜드</p>
      <ul className="space-y-[0.75rem]">
        {mockBrands.map((brand) => (
          <li key={brand.rank} className="flex items-center gap-[0.75rem]">
            <span className="text-[var(--text-primary)] font-bold">{brand.rank}</span>
            <img
              src={brand.image}
              alt={brand.name}
              className="
                w-[2rem] h-[2rem]
                rounded-full bg-white object-contain
                border border-gray-300
              "
            />
            <span className="text-[0.875rem] text-[var(--text-black)]">{brand.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityBrands;
