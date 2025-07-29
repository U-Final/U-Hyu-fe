import { useEffect, useState } from 'react';

export const useCanGoBack = () => {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  return canGoBack;
};
