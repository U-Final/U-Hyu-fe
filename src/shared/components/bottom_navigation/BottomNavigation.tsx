import { PATH } from '@paths';
import { useUser } from '@user/store/userStore';
import { X } from 'lucide-react';
import { FaMap, FaMapMarkerAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { HiGift } from 'react-icons/hi';
import { LiaBarcodeSolid } from 'react-icons/lia';
import { NavLink, useLocation } from 'react-router-dom';

import BarcodeItem from '@/shared/components/bottom_navigation/BarcodeItem';
import NavItem from '@/shared/components/bottom_navigation/NavItem';
import { useAuthCheckModal } from '@/shared/hooks/useAuthCheckModal';
import { useGA } from '@/shared/hooks/useGA';
import { useBarcodeStore } from '@/shared/store/barcodeStore';

import { BarcodeBottomSheet } from './barcode/BarcodeBottomSheet';

const BottomNavigation = () => {
  const { checkAuthAndExecuteModal, isLoggedIn } = useAuthCheckModal();
  const location = useLocation();
  const user = useUser();
  const { isOpen, open, close } = useBarcodeStore();
  const { trackNavigationInteraction } = useGA();

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

  const handleMyPageClick = (e?: React.MouseEvent) => {
    if (!isLoggedIn) {
      e?.preventDefault();
      checkAuthAndExecuteModal(() => {});
    } else {
      trackNavigationInteraction('tab_clicked', activeTab, '마이페이지');
    }
  };

  const handleMyMapClick = (e?: React.MouseEvent) => {
    if (!isLoggedIn) {
      e?.preventDefault();
      checkAuthAndExecuteModal(() => {});
    } else {
      trackNavigationInteraction('tab_clicked', activeTab, '마이맵');
    }
  };

  const handleBarcodeClick = () => {
    trackNavigationInteraction(
      'barcode_button_clicked',
      activeTab,
      isOpen ? 'close' : 'open'
    );
    return isOpen ? close() : open();
  };

  const handleMapClick = () => {
    trackNavigationInteraction('tab_clicked', activeTab, '지도');
  };

  const handleBenefitClick = () => {
    trackNavigationInteraction('tab_clicked', activeTab, '혜택');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1002] desktop-padding">
      <nav className="h-15 text-[0.625rem] shadow-nav flex relative justify-around bg-white gap-5 px-[1.5rem] py-[0.5rem] z-[1003]">
        <NavLink to={PATH.MAP} className="flex gap-4">
          <NavItem
            label="지도"
            icon={<FaMapMarkerAlt />}
            isActive={activeTab === '지도'}
            onClick={handleMapClick}
          />
        </NavLink>
        {isLoggedIn ? (
          <NavLink to={PATH.MYMAP} className="flex gap-4">
            <NavItem
              label="마이맵"
              icon={<FaMap />}
              isActive={activeTab === '마이맵'}
              onClick={handleMyMapClick}
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
            onClick={handleBenefitClick}
          />
        </NavLink>
        {isLoggedIn ? (
          <NavLink
            to={user?.role === 'ADMIN' ? PATH.ADMIN : PATH.MYPAGE_ACTIVITY}
            className="flex gap-4"
          >
            <NavItem
              label={user?.role === 'ADMIN' ? '관리자' : '마이페이지'}
              icon={<FaUser />}
              isActive={
                activeTab === (user?.role === 'ADMIN' ? '관리자' : '마이페이지')
              }
              onClick={handleMyPageClick}
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
        <BarcodeBottomSheet />
      </div>
    </div>
  );
};

export default BottomNavigation;
