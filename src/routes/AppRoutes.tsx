import HomePage from '@pages/HomePage';
import BenefitPage from '@pages/benefit/BenefitPage';
import BottomNavigation from '@shared/components/bottom_navigation/BottomNavigation';
import { PATH } from '@shared/constants/path';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExtraInfo from '@pages/user/extra-info/ExtraInfo';
export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<HomePage />} />
        <Route path={PATH.BENEFIT} element={<BenefitPage />} />
        <Route path={PATH.EXTRA_INFO} element={<ExtraInfo />} />
      </Routes>
      <BottomNavigation />
    </BrowserRouter>
  );
};
