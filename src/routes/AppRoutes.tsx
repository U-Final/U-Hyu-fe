import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from '@pages/RootPage';
import ExtraInfo from '@pages/user/extra-info/ExtraInfo';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/user/extra-info" element={<ExtraInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
