import { PATH } from '@paths';
import { ChevronRight } from 'lucide-react';
import { HiGift } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { KakaoLoginButton } from '@/shared/components/buttons/KakaoLoginButton';
import { SheetClose } from '@/shared/components/shadcn/ui/sheet';

const LoggedOutContent = () => {
  const navigate = useNavigate();

  const handleBenefitClick = () => {
    navigate(PATH.BENEFIT);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <h2 className="text-xl font-bold text-secondary">안녕하세요! 👋</h2>
          <p className="text-secondary">
            U-HYU와 함께 U+ 제휴 혜택을 만나보세요
          </p>
        </div>
        <KakaoLoginButton className="w-full" />
        <p className="text-center text-sm">
          로그인 하고 더 많은 기능 이용하기 !
        </p>
      </div>
      <SheetClose asChild>
        <button
          onClick={handleBenefitClick}
          className="cursor-pointer hover:bg-gray-hover active:scale-95 transition-all duration-150 w-full rounded-[12px]"
        >
          <div className="flex items-center py-4 justify-between">
            <div className="flex gap-2">
              <HiGift size={20} className="text-primary" />
              <p className="text-black text-h4">멤버십 혜택 보러가기</p>
            </div>
            <ChevronRight size={15} />
          </div>
        </button>
      </SheetClose>
    </div>
  );
};

export default LoggedOutContent;
