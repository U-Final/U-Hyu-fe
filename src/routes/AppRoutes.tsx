import { useEffect, useState } from 'react';

import {
  AdminPage,
  BenefitPage,
  ExtraInfo,
  HomePage,
  MapPage,
  MyPage,
  MyPageActivity,
  MymapPage,
} from '@/pages';
import SidebarSheet from '@kakao-map/components/SidebarSheet';
import { PATH } from '@paths';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { AdminRoute, BaseLayout, BottomNavigation, ModalRoot, UserRoute } from '@/shared/components';

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

  const showBottomNav =
    pathname === PATH.HOME ||
    pathname === PATH.MYMAP ||
    pathname === PATH.BENEFIT ||
    pathname.startsWith(PATH.MAP) ||
    pathname === PATH.MYPAGE ||
    pathname === PATH.MYPAGE_ACTIVITY ||
    pathname === PATH.ADMIN;

  const isMap = pathname.startsWith(PATH.MAP);

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
          <Route
            path={PATH.MYPAGE}
            element={
              <UserRoute>
                <MyPage />
              </UserRoute>
            }
          />
          <Route
            path={PATH.MYPAGE_ACTIVITY}
            element={
              <UserRoute>
                <MyPageActivity />
              </UserRoute>
            }
          />
          <Route
            path={PATH.EXTRA_INFO}
            element={
              <UserRoute>
                <ExtraInfo />
              </UserRoute>
            }
          />
          <Route path={PATH.LOGIN} element={<div>loginPage</div>} />
          <Route path={PATH.MAP} element={<MapPage />} />
          <Route path="/map/:uuid" element={<MapPage />} />
          <Route 
            path={PATH.ADMIN} 
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route path={PATH.MYMAP} element={<MymapPage />} />
        </Route>
      </Routes>
      <ModalRoot />
    </BrowserRouter>
  );
};
