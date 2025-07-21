import React from 'react';
import { BRANDS } from '@/shared/components/brand_grid/constants';
import { Check } from 'lucide-react';
import type { UserInfo } from '@features/mypage/api/types';
import { updateUserInfo } from '@features/mypage/api/mypageApi';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}

const MyPageBrand: React.FC<Props> = ({ user, setUser }) => {
  const handleToggle = (brandId: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const alreadySelected = prev.brandIds.includes(brandId);
      const newBrandIds = alreadySelected
        ? prev.brandIds.filter(id => id !== brandId)
        : [...prev.brandIds, brandId];
      updateUserInfo({ updatedBrandIdList: newBrandIds });
      return { ...prev, brandIds: newBrandIds };
    });
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="font-bold text-[1rem] text-[var(--text-black)]">관심 브랜드</div>

      <div className="rounded-[1rem] bg-white p-[1.25rem] text-[0.875rem] text-[var(--text-gray)] border border-gray-200">
        <p className="mb-[1rem] text-[0.75rem] text-[var(--text-gray)] text-center">
          관심있는 브랜드를 선택해주세요
        </p>

        <div className="grid grid-cols-3 gap-[1rem] max-h-[13.5rem] overflow-y-auto scrollbar-hidden touch-pan-y px-[0.25rem]">
          {BRANDS.map((brand) => {
            const brandId = Number(brand.id);
            const isSelected = user.brandIds.includes(brandId);
            return (
              <div key={brandId} className="flex flex-col items-center space-y-[0.5rem]">
                <div className="relative mt-[0.5rem] p-[0.125rem]">
                  <button
                    onClick={() => handleToggle(brandId)}
                    onKeyDown={(e) => e.key === 'Enter' && handleToggle(brandId)}
                    aria-label={`${brand.name} 브랜드 ${isSelected ? '선택됨' : '선택 안됨'}`}
                    aria-pressed={isSelected}
                    className={`
                      relative w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center
                      transition-all duration-200 shadow-md overflow-hidden bg-white
                      ${isSelected ? 'ring-4 ring-blue-500 ring-opacity-50' : 'hover:scale-105 border border-gray-200'}
                    `}
                  >
                    <img
                      src={brand.imagePath}
                      alt={brand.name}
                      className="w-[3rem] h-[3rem] object-cover rounded-full bg-white"
                    />
                  </button>
                  {isSelected && (
                    <div className="absolute top-[-0.25rem] right-[-0.25rem] w-[1.25rem] h-[1.25rem] bg-blue-500 rounded-full flex items-center justify-center z-10">
                      <Check className="w-[0.75rem] h-[0.75rem] text-white" />
                    </div>
                  )}
                </div>
                <span className="text-[0.75rem] text-[var(--text-gray)] text-center leading-tight">
                  {brand.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPageBrand;
