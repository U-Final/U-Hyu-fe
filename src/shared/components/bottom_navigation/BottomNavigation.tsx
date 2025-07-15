import BarcodeItem from '@components/bottom_navigation/BarcodeItem';
import NavItem from '@components/bottom_navigation/NavItem';
import { PATH } from '@paths';
import { useState } from 'react';
import { FaMap } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { HiGift } from 'react-icons/hi';
import { LiaBarcodeSolid } from 'react-icons/lia';
import { MdHomeFilled } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState<string>('홈');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBarcodeClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          label="바코드"
          icon={<LiaBarcodeSolid />}
          isActive={activeTab === '바코드'}
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
      {isModalOpen && (
        // 모달 컴포넌트 완성 후 수정해야함 그전에 임시 모달
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-5 rounded-lg">
                <h2>바코드 스캔 모달</h2>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
