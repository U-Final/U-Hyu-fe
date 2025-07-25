import { useEffect, useState } from 'react';

import { AdminPage, BenefitPage, ExtraInfo, HomePage, MapPage, MyPage, MyPageActivity } from '@/pages';
import SidebarSheet from '@kakao-map/components/SidebarSheet';
import { PATH } from '@paths';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';


import { BaseLayout, BottomNavigation, ModalRoot } from '@/shared/components';

const Layout = () => {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleBottomNavRoutes = [
    PATH.HOME,
    PATH.BENEFIT,
    PATH.MAP,
    PATH.MYPAGE,
    PATH.MYPAGE_ACTIVITY,
    PATH.ADMIN,
  ] as const;

  const showBottomNav = visibleBottomNavRoutes.includes(
    pathname as (typeof visibleBottomNavRoutes)[number]
  );

  const isMap = pathname === PATH.MAP;

  // 모바일에서는 프레임 없이 직접 렌더링
  const content = (
    <div
      id="main-content"
      className={`w-full h-full flex flex-col relative ${isMap ? 'items-stretch justify-start' : ''}`}
      style={isMap ? { minWidth: 0 } : undefined}
    >
      <BaseLayout isMap={isMap}>
        <SidebarSheet />
        <Outlet />
      </BaseLayout>
      {showBottomNav && <BottomNavigation />}
    </div>
  );

  // 모바일에서는 모바일 프레임 없이 렌더링
  if (isMobile) {
    return content;
  }

  // 데스크톱에서는 모바일 프레임 적용
  return (
    <div className="mobile-frame">
      <div className="mobile-content">{content}</div>
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.BENEFIT} element={<BenefitPage />} />
          <Route path={PATH.MYPAGE} element={<MyPage />} />
          <Route path={PATH.MYPAGE_ACTIVITY} element={<MyPageActivity />} />
          <Route path={PATH.EXTRA_INFO} element={<ExtraInfo />} />
          <Route path={PATH.LOGIN} element={<div>loginPage</div>} />
          <Route path={PATH.MAP} element={<MapPage />} />
          <Route path={PATH.ADMIN} element={<AdminPage />} />
        </Route>
      </Routes>
      <ModalRoot />
    </BrowserRouter>
  );
};
