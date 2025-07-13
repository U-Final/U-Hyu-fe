import BottomNavigation from '@components/bottom_navigation/BottomNavigation';
import ModalRoot from '@components/modals/ModalRoot';
import HomePage from '@pages/HomePage';
import BenefitPage from '@pages/benefit/BenefitPage';
import ExtraInfo from '@pages/user/extra-info/ExtraInfo';
import { PATH } from '@paths';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<HomePage />} />
        <Route path={PATH.BENEFIT} element={<BenefitPage />} />
        <Route path={PATH.EXTRA_INFO} element={<ExtraInfo />} />
      </Routes>
      <BottomNavigation />
      <ModalRoot />
    </BrowserRouter>
  );
};
