import BaseLayout from '@components/BaseLayout';
import BottomNavigation from '@components/bottom_navigation/BottomNavigation';
import ModalRoot from '@components/modals/ModalRoot';
import HomePage from '@pages/HomePage';
import BenefitPage from '@pages/benefit/BenefitPage';
import ExtraInfo from '@pages/user/extra-info/ExtraInfo';
import { PATH } from '@paths';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import MapPage from '@pages/map/MapPage';

const Layout = () => {
  const { pathname } = useLocation();
  const visibleBottomNavRoutes = [
    PATH.HOME,
    PATH.BENEFIT,
    PATH.MAP,
    PATH.MYPAGE,
  ] as const;

  const showBottomNav = visibleBottomNavRoutes.includes(
    pathname as (typeof visibleBottomNavRoutes)[number]
  );

  const isMap = pathname === PATH.MAP;

  return (
    <div
      className={`w-full h-full flex flex-col ${isMap ? 'items-stretch justify-start' : 'justify-center'}`}
      style={isMap ? { minWidth: 0 } : undefined}
    >
      <BaseLayout isMap={isMap}>
        <Outlet />
      </BaseLayout>
      {showBottomNav && <BottomNavigation />}
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
          <Route path={PATH.MYPAGE} element={<div>myPage</div>} />
          <Route path={PATH.EXTRA_INFO} element={<ExtraInfo />} />
          <Route path={PATH.LOGIN} element={<div>loginPage</div>} />
          <Route path={PATH.MAP} element={<MapPage />} />
        </Route>
      </Routes>

      <ModalRoot />
    </BrowserRouter>
  );
};
