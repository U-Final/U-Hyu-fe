import { StrictMode } from 'react';

import { injectSpeedInsights } from '@vercel/speed-insights';
import { createRoot } from 'react-dom/client';

import { startMSW } from '@/shared/msw';

import App from './App.tsx';
import './index.css';

async function bootstrap() {
  if (import.meta.env.VITE_USE_MSW === 'true') {
    await startMSW();
  }

  injectSpeedInsights();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();
