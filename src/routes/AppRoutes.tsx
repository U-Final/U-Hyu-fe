import { useEffect, useState } from 'react';

import { BenefitPage, ExtraInfo, HomePage, MapPage } from '@/pages';
import { PATH } from '@paths';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import MyPage from '@/pages/mypage/MyPage';
import MyPageActivity from '@/pages/mypage/MyPageActivity';

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
  ] as const;

  const showBottomNav = visibleBottomNavRoutes.includes(
    pathname as (typeof visibleBottomNavRoutes)[number]
  );

  const isMap = pathname === PATH.MAP;

  // 모바일에서는 프레임 없이 직접 렌더링
  const content = (
    <div
      className={`w-full h-full flex flex-col relative ${isMap ? 'items-stretch justify-start' : ''}`}
      style={isMap ? { minWidth: 0 } : undefined}
    >
      <BaseLayout isMap={isMap}>
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
        </Route>
      </Routes>
      <ModalRoot />
    </BrowserRouter>
  );
};
