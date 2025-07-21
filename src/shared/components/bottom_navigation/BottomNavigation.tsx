import { useState } from 'react';

import { PATH } from '@paths';
import { X } from 'lucide-react';
import { FaMap } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { HiGift } from 'react-icons/hi';
import { LiaBarcodeSolid } from 'react-icons/lia';
import { MdHomeFilled } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import BarcodeItem from '@/shared/components/bottom_navigation/BarcodeItem';
import NavItem from '@/shared/components/bottom_navigation/NavItem';

import { BarcodeBottomSheet } from './barcode/BarcodeBottomSheet';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState<string>('홈');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBarcodeClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="fixed bottom-0 w-full z-50">
      <nav className="h-12 text-[0.625rem] shadow-nav flex relative justify-around bg-white gap-5 px-[1.5rem] py-[0.5rem]">
        <NavLink
          to={PATH.HOME}
          className="flex gap-4"
          onClick={() => handleTabClick('홈')}
        >
          <NavItem
            label="홈"
            icon={<MdHomeFilled />}
            isActive={activeTab === '홈'}
            onClick={() => handleTabClick('홈')}
          />
        </NavLink>
        <NavLink
          to={PATH.MAP}
          className="flex gap-4"
          onClick={() => handleTabClick('지도')}
        >
          <NavItem
            label="지도"
            icon={<FaMap />}
            isActive={activeTab === '지도'}
            onClick={() => handleTabClick('지도')}
          />
        </NavLink>
        <span />
        <BarcodeItem
          label={isOpen ? '닫기' : '바코드'}
          icon={isOpen ? <X size={15} /> : <LiaBarcodeSolid size={15} />}
          isActive={isOpen}
          onClick={handleBarcodeClick}
        />
        <NavLink
          to={PATH.BENEFIT}
          className="flex gap-4"
          onClick={() => handleTabClick('혜택')}
        >
          <NavItem
            label="혜택"
            icon={<HiGift />}
            isActive={activeTab === '혜택'}
            onClick={() => handleTabClick('혜택')}
          />
        </NavLink>
        <NavLink
          to={PATH.MYPAGE}
          className="flex gap-4"
          onClick={() => handleTabClick('마이페이지')}
        >
          <NavItem
            label="마이페이지"
            icon={<FaUser />}
            isActive={activeTab === '마이페이지'}
            onClick={() => handleTabClick('마이페이지')}
          />
        </NavLink>
      </nav>
      <div className="fixed bottom-100 w-full">
        <BarcodeBottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        ></BarcodeBottomSheet>
      </div>
    </div>
  );
};

export default BottomNavigation;
