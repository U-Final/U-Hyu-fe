import { worker } from './browser';

export { worker };
export { handlers } from './handlers';

export const startMSW = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true') {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};
