import { useEffect, useState } from 'react';

/**
 * 특정 페이지의 첫 방문 여부를 확인하는 훅
 */
export function useFirstVisit(key: string) {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storageKey = `first-visit-${key}`;
    
    try {
      // 개발 환경에서는 항상 첫 방문으로 처리
      if (process.env.NODE_ENV === 'development') {
        setIsFirstVisit(true);
        setIsLoading(false);
        return;
      }
      
      const hasVisited = localStorage.getItem(storageKey);
      
      if (!hasVisited) {
        setIsFirstVisit(true);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.warn('localStorage access failed:', error);
      setIsLoading(false);
    }
  }, [key]);

  const markAsVisited = () => {
    const storageKey = `first-visit-${key}`;
    
    try {
      localStorage.setItem(storageKey, 'true');
      setIsFirstVisit(false);
    } catch (error) {
      console.warn('localStorage write failed:', error);
    }
  };

  const resetFirstVisit = () => {
    const storageKey = `first-visit-${key}`;
    
    try {
      localStorage.removeItem(storageKey);
      setIsFirstVisit(true);
    } catch (error) {
      console.warn('localStorage remove failed:', error);
    }
  };

  return {
    isFirstVisit,
    isLoading,
    markAsVisited,
    resetFirstVisit,
  };
}