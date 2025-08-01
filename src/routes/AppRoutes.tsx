import {
  AdminPage,
  BenefitPage,
  ExtraInfo,
  MapPage,
  MyPage,
  MyPageActivity,
  MymapPage,
} from '@/pages';
import SidebarSheet from '@kakao-map/components/SidebarSheet';
import { PATH } from '@paths';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import {
  AdminRoute,
  BaseLayout,
  BottomNavigation,
  ModalRoot,
  UserRoute,
} from '@/shared/components';
import AppInitializer from '@/shared/components/AppInitializer';

const Layout = () => {
  const { pathname } = useLocation();

  const showBottomNav =
    pathname === PATH.HOME ||
    pathname === PATH.MYMAP ||
    pathname === PATH.BENEFIT ||
    pathname.startsWith(PATH.MAP) ||
    pathname === PATH.MYPAGE ||
    pathname === PATH.MYPAGE_ACTIVITY ||
    pathname === PATH.ADMIN;

  const isMap = pathname === '/' || pathname.startsWith(PATH.MAP);

  return (
    <div
      id="main-content"
      className={`w-full h-screen flex flex-col relative ${isMap ? 'items-stretch justify-start' : ''}`}
      style={isMap ? { minWidth: 0 } : undefined}
    >
      <BaseLayout isMap={isMap}>
        <SidebarSheet />
        <Outlet />
        {showBottomNav && <BottomNavigation />}
      </BaseLayout>
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <>
      <AppInitializer />
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATH.HOME} element={<MapPage />} />
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
            element={<ExtraInfo />}
          />
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
          <Route
            path={PATH.MYMAP}
            element={
              <UserRoute>
                <MymapPage />
              </UserRoute>
            }
          />
        </Route>
      </Routes>
      <ModalRoot />
    </>
  );
};
