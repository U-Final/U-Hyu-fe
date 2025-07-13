import HomePage from "@pages/HomePage";
import BenefitPage from "@pages/benefit/BenefitPage";
import BottomNavigation from "@components/bottom_navigation/BottomNavigation";
import { PATH } from "@constants/path";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<HomePage />} />
        <Route path={PATH.BENEFIT} element={<BenefitPage />} />
      </Routes>
      <BottomNavigation />
    </BrowserRouter>
  );
};
