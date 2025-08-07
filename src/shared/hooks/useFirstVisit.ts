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
    } catch {
      setIsLoading(false);
    }
  }, [key]);

  const markAsVisited = () => {
    const storageKey = `first-visit-${key}`;
    
    try {
      localStorage.setItem(storageKey, 'true');
      setIsFirstVisit(false);
    } catch {
      // localStorage 쓰기 실패 시 조용히 처리
    }
  };

  const resetFirstVisit = () => {
    const storageKey = `first-visit-${key}`;
    
    try {
      localStorage.removeItem(storageKey);
      setIsFirstVisit(true);
    } catch {
      // localStorage 삭제 실패 시 조용히 처리
    }
  };

  return {
    isFirstVisit,
    isLoading,
    markAsVisited,
    resetFirstVisit,
  };
}