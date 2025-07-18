import { worker } from './browser';

export { worker };
export { handlers } from './handlers';

// MSW 시작 함수
export const startMSW = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true') {
    await worker.start({
      onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 실제 서버로 전달
    });
    console.log('MSW 활성화');
  }
};
