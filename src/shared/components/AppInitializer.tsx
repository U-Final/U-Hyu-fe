import { useEffect } from 'react';

import {
  initKeyboardHandler,
  initScrollRestore,
} from '@/shared/utils/scrollRestore';
import {
  cleanupViewportHeight,
  initViewportHeight,
} from '@/shared/utils/viewport';

const AppInitializer = () => {
  useEffect(() => {
    initViewportHeight();

    const cleanupScrollRestore = initScrollRestore();

    const cleanupKeyboardHandler = initKeyboardHandler();

    return () => {
      cleanupViewportHeight();
      cleanupScrollRestore();
      cleanupKeyboardHandler();
    };
  }, []);

  return null;
};

export default AppInitializer;