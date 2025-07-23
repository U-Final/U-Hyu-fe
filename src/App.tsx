import { useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppRoutes } from '@/routes/AppRoutes';

import { useUserStore } from '@/shared/auth/useUserStore';
import { queryClient } from '@/shared/client';

function App() {
  const initializeAuth = useUserStore(state => state.initializeAuth);

  // 앱 시작 시 인증 상태 초기화
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
