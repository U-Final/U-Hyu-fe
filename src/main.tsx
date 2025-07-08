import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { NavermapsProvider } from 'react-naver-maps';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavermapsProvider ncpKeyId={import.meta.env.VITE_NAVER_MAPS_KEY}>
      <App />
    </NavermapsProvider>
  </StrictMode>
);
