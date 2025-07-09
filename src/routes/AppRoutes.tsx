import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from '@pages/RootPage';
import SignupFlow from '@pages/signup-flow/SignupFlow';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/sign-up" element={<SignupFlow />} />
      </Routes>
    </BrowserRouter>
  );
};
