import BottomNavigation from "@/shared/components/bottom_navigation/BottomNavigation";
import { BrowserRouter } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <BottomNavigation />
    </BrowserRouter>
  );
};
