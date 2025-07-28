import { useEffect } from 'react';

import { useUserInfo } from '@user/hooks/useUserQuery';

import { userStore } from '@/shared/store/userStore';

const AppInitializer = () => {
  const { data, isSuccess, isError } = useUserInfo();
  const setUser = userStore(state => state.setUser);
  const clearUser = userStore(state => state.clearUser);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    } else if (isError) {
      clearUser();
    }
  }, [isSuccess, isError, data, setUser, clearUser]);

  return null;
};

export default AppInitializer;
