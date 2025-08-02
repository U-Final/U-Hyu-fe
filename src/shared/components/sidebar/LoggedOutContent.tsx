import { PATH } from '@paths';
import { ChevronRight } from 'lucide-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiGift } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { KakaoLoginButton } from '@/shared/components/buttons/KakaoLoginButton';
import { SheetClose } from '@/shared/components/shadcn/ui/sheet';

const LoggedOutContent = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: FaMapMarkerAlt,
      title: '제휴 매장 지도 보기',
      description: '내 주변 U+ 제휴 매장을 찾아보세요',
      path: PATH.MAP,
    },
    {
      icon: HiGift,
      title: 'U+ 멤버십 혜택 보러가기',
      description: '로그인 없이도 혜택 목록을 볼 수 있어요',
      path: PATH.BENEFIT,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 로그인 안내 */}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-xl font-bold text-secondary">안녕하세요! 👋</h2>
        <p className="text-secondary">U-HYU와 함께 U+ 제휴 혜택을 만나보세요</p>
        <KakaoLoginButton className="w-full mt-2" />
        <p className="text-sm">로그인 하고 더 많은 기능을 이용해보세요!</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-h4 font-semibold px-1">빠른 메뉴</h4>

        {menuItems.map((item, index) => (
          <SheetClose key={index} asChild>
            <button
              onClick={() => navigate(item.path)}
              className="w-full bg-white border border-light-gray rounded-xl p-3 hover:bg-gray-hover hover:shadow-sm active:scale-[0.98] transition-all duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue rounded-full flex items-center justify-center">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-black text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray" />
              </div>
            </button>
          </SheetClose>
        ))}
      </div>
    </div>
  );
};

export default LoggedOutContent;
