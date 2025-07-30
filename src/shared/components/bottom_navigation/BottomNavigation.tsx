import { useState } from 'react';

import { PATH } from '@paths';
import { X } from 'lucide-react';
import { FaMap } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { HiGift } from 'react-icons/hi';
import { LiaBarcodeSolid } from 'react-icons/lia';
import { NavLink, useLocation } from 'react-router-dom';

import BarcodeItem from '@/shared/components/bottom_navigation/BarcodeItem';
import NavItem from '@/shared/components/bottom_navigation/NavItem';
import { useAuthCheckModal } from '@/shared/hooks/useAuthCheckModal';
import { useUser } from '@/shared/store/userStore';

import { BarcodeBottomSheet } from './barcode/BarcodeBottomSheet';

const BottomNavigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { checkAuthAndExecuteModal, isLoggedIn } = useAuthCheckModal();
  const location = useLocation();
  const user = useUser();

  // URL 기반으로 활성 탭 결정
  const getActiveTab = (pathname: string) => {
    if (pathname === PATH.HOME) return '홈';
    if (pathname.startsWith(PATH.MAP)) return '지도';
    if (pathname === PATH.MYMAP) return '마이맵';
    if (pathname === PATH.BENEFIT) return '혜택';
    if (pathname === PATH.MYPAGE || pathname === PATH.MYPAGE_ACTIVITY)
      return '마이페이지';
    if (pathname === PATH.ADMIN) return '관리자';
    return '';
  };

  const activeTab = getActiveTab(location.pathname);

  const handleBarcodeClick = () => {
    checkAuthAndExecuteModal(() => {
      setIsOpen(prev => !prev);
    });
  };

  const handleMyPageClick = (e?: React.MouseEvent) => {
    if (!isLoggedIn) {
      e?.preventDefault();
      checkAuthAndExecuteModal(() => {});
    }
  };

  const handleMyMapClick = (e?: React.MouseEvent) => {
    if (!isLoggedIn) {
      e?.preventDefault();
      checkAuthAndExecuteModal(() => {});
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-1001">
      <nav className="h-12 text-[0.625rem] shadow-nav flex relative justify-around bg-white gap-5 px-[1.5rem] py-[0.5rem]">
        <NavLink to={PATH.MAP} className="flex gap-4">
          <NavItem
            label="지도"
            icon={<FaMapMarkerAlt />}
            isActive={activeTab === '지도'}
            onClick={() => {}}
          />
        </NavLink>
        {isLoggedIn ? (
          <NavLink to={PATH.MYMAP} className="flex gap-4">
            <NavItem
              label="마이맵"
              icon={<FaMap />}
              isActive={activeTab === '마이맵'}
              onClick={() => {}}
            />
          </NavLink>
        ) : (
          <div className="flex gap-4">
            <NavItem
              label="마이맵"
              icon={<FaMap />}
              isActive={activeTab === '마이맵'}
              onClick={handleMyMapClick}
            />
          </div>
        )}
        <span />
        <BarcodeItem
          label={isOpen ? '닫기' : '바코드'}
          icon={isOpen ? <X size={15} /> : <LiaBarcodeSolid size={15} />}
          isActive={isOpen}
          onClick={handleBarcodeClick}
        />
        <NavLink to={PATH.BENEFIT} className="flex gap-4">
          <NavItem
            label="혜택"
            icon={<HiGift />}
            isActive={activeTab === '혜택'}
            onClick={() => {}}
          />
        </NavLink>
        {isLoggedIn ? (
          <NavLink to={user?.role === 'ADMIN' ? PATH.ADMIN : PATH.MYPAGE} className="flex gap-4">
            <NavItem
              label={user?.role === 'ADMIN' ? '관리자' : '마이페이지'}
              icon={<FaUser />}
              isActive={activeTab === (user?.role === 'ADMIN' ? '관리자' : '마이페이지')}
              onClick={() => {}}
            />
          </NavLink>
        ) : (
          <div className="flex gap-4">
            <NavItem
              label="마이페이지"
              icon={<FaUser />}
              isActive={activeTab === '마이페이지'}
              onClick={handleMyPageClick}
            />
          </div>
        )}
      </nav>
      <div className="absolute bottom-full w-full">
        <BarcodeBottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        ></BarcodeBottomSheet>
      </div>
    </div>
  );
};

export default BottomNavigation;
