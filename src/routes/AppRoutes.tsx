import HomePage from "@/pages/HomePage";
import BottomNavigation from "@shared/components/bottom_navigation/BottomNavigation";
import ModalRoot from "@shared/components/modal/ModalRoot";
import { PATH } from "@shared/constants/path";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<HomePage />} />
      </Routes>
      <BottomNavigation />
      <ModalRoot />
    </BrowserRouter>
  );
};
