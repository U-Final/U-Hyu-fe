import BenefitPage from "@/pages/benefit/BenefitPage";
import HomePage from "@/pages/HomePage";
import { PATH } from "@shared/constants/path";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<HomePage />} />
        <Route path={PATH.BENEFIT} element={<BenefitPage />} />
      </Routes>
    </BrowserRouter>
  );
};
