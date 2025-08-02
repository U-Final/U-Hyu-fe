import { useState } from 'react';

import { PATH } from '@paths';
import { ChevronRight } from 'lucide-react';
import { FaMap, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { HiGift } from 'react-icons/hi';
import { LiaBarcodeSolid } from 'react-icons/lia';

import { BarcodeBottomSheet } from '@/shared/components/bottom_navigation/barcode/BarcodeBottomSheet';
import { SheetClose } from '@/shared/components/shadcn/ui/sheet';
import { useUser } from '@/shared/store/userStore';

const LoggedInContent = () => {
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const user = useUser();

  const menuItems = [
    {
      type: 'page',
      icon: FaMapMarkerAlt,
      title: '제휴 매장 지도 보기',
      description: '내 주변 U+ 제휴 매장 찾기',
      path: PATH.MAP,
    },
    {
      type: 'page',
      icon: FaMap,
      title: '마이맵',
      description: '내가 저장한 제휴매장 보기',
      path: PATH.MYMAP,
    },
    {
      type: 'modal',
      icon: LiaBarcodeSolid,
      title: '멤버십 바코드',
      description: '내 멤버십 바코드 확인',
    },
    {
      type: 'page',
      icon: HiGift,
      title: 'U+ 멤버십 혜택',
      description: '제휴혜택 모아보기',
      path: PATH.BENEFIT,
    },
    {
      type: 'page',
      icon: FaUser,
      title: '마이페이지',
      description: '내 정보 수정하기',
      path: PATH.MYPAGE,
    },
  ];

  return (
    <div className="space-y-4">
      {/* 프로필 카드 */}
      <div className="rounded-2xl p-4 border border-primary bg-[#f4f8ff]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img
              src={user?.profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">{user?.userName}님</h3>
            <p className="text-sm text-black">
              안녕하세요! 좋은 하루 보내세요 ✨
            </p>
          </div>
        </div>
      </div>

      {/* 빠른 메뉴 */}
      <div className="space-y-2">
        <h4 className="text-h4 font-semibold px-1">빠른 메뉴</h4>

        {menuItems.map((item, index) => (
          <SheetClose key={index} asChild>
            <button
              onClick={() =>
                item.type === 'modal'
                  ? setIsBarcodeOpen(true)
                  : item.path && window.location.assign(item.path)
              }
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

      {/* 바코드 모달 */}
      <BarcodeBottomSheet
        isOpen={isBarcodeOpen}
        onClose={() => setIsBarcodeOpen(false)}
      />
    </div>
  );
};

export default LoggedInContent;
