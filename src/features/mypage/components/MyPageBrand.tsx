import React from 'react';
import { BRANDS } from '@components/brand_grid/constants';
import { Check } from 'lucide-react';
import type { UserInfo } from '@mypage/types';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const MyPageBrand: React.FC<Props> = ({ user, setUser }) => {
  const handleToggle = (brandId: string) => {
    setUser(prev => ({
      ...prev,
      favoriteBrands: prev.favoriteBrands.includes(brandId)
        ? prev.favoriteBrands.filter(id => id !== brandId)
        : [...prev.favoriteBrands, brandId],
    }));
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="font-bold text-[1rem] text-black">관심 브랜드</div>

      <div className="rounded-[1rem] bg-white p-[1.25rem] text-[0.875rem] text-gray-700">
        <p className="mb-[1rem] text-[0.75rem] text-gray-500 text-center">
          관심있는 브랜드를 선택해주세요
        </p>

        <div className="grid grid-cols-3 gap-[1rem] max-h-[13.5rem] overflow-y-auto px-[0.25rem]">
          {BRANDS.map((brand) => (
            <div key={brand.id} className="flex flex-col items-center space-y-[0.5rem]">
              <div className="relative mt-[0.5rem] p-[0.125rem]">
                <button
                  onClick={() => handleToggle(brand.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleToggle(brand.id)}
aria-label={`${brand.name} 브랜드 ${user.favoriteBrands.includes(brand.id) ? '선택됨' : '선택 안됨'}`}
aria-pressed={user.favoriteBrands.includes(brand.id)}
                  className={`
                    relative w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center
                    transition-all duration-200 shadow-md overflow-hidden bg-white
                    ${
                      user.favoriteBrands.includes(brand.id)
                        ? 'ring-4 ring-blue-500 ring-opacity-50'
                        : 'hover:scale-105 border border-gray-200'
                    }
                  `}
                >
                  <img
                    src={brand.imagePath}
                    alt={brand.name}
                    className="w-[4rem] h-[4rem] object-cover rounded-full bg-white"
                  />
                </button>

                {user.favoriteBrands.includes(brand.id) && (
                  <div className="absolute top-[-0.25rem] right-[-0.25rem] w-[1.25rem] h-[1.25rem] bg-blue-500 rounded-full flex items-center justify-center z-10">
                    <Check className="w-[0.75rem] h-[0.75rem] text-white" />
                  </div>
                )}
              </div>

              <span className="text-[0.75rem] text-gray-600 text-center leading-tight">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPageBrand;
