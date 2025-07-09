import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from '@/pages/RootPage';
import SignUpPage from '@/pages/signup/SignUpPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};
