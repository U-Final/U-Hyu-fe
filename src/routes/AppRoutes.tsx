import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExtraInfo from '@pages/user/extra-info/ExtraInfo';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/extra-info" element={<ExtraInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
