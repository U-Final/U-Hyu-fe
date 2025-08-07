/**
 * 스크롤 위치 복원 유틸리티
 * 키보드 포커스 및 브라우저 뒤로가기 시 스크롤 위치 유지
 */

interface ScrollPosition {
  x: number;
  y: number;
  timestamp: number;
}

const SCROLL_RESTORE_KEY = 'app-scroll-position';
const SCROLL_RESTORE_TIMEOUT = 5 * 60 * 1000;

/**
 * 현재 스크롤 위치 저장
 */
export function saveScrollPosition(): void {
  const position: ScrollPosition = {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
    timestamp: Date.now(),
  };
  
  try {
    sessionStorage.setItem(SCROLL_RESTORE_KEY, JSON.stringify(position));
  } catch {
    // 스크롤 위치 저장 실패 시 무시
  }
}

/**
 * 저장된 스크롤 위치 복원
 */
export function restoreScrollPosition(): boolean {
  try {
    const saved = sessionStorage.getItem(SCROLL_RESTORE_KEY);
    if (!saved) return false;
    
    const position: ScrollPosition = JSON.parse(saved);
    
    if (Date.now() - position.timestamp > SCROLL_RESTORE_TIMEOUT) {
      sessionStorage.removeItem(SCROLL_RESTORE_KEY);
      return false;
    }
    
    window.scrollTo({
      left: position.x,
      top: position.y,
      behavior: 'auto',
    });
    
    
    return true;
  } catch {
    return false;
  }
}

/**
 * 저장된 스크롤 위치 정리
 */
export function clearScrollPosition(): void {
  try {
    sessionStorage.removeItem(SCROLL_RESTORE_KEY);
  } catch {
    // 스크롤 위치 정리 실패 시 무시
  }
}

/**
 * 스크롤 복원 이벤트 리스너 설정
 */
export function initScrollRestore(): () => void {
  const handleBeforeUnload = () => {
    saveScrollPosition();
  };
  
  const handleFocus = () => {
    saveScrollPosition();
  };
  
  const handleBlur = () => {
    setTimeout(() => {
      restoreScrollPosition();
    }, 300);
  };
  
  const handlePopState = () => {
    setTimeout(() => {
      restoreScrollPosition();
    }, 100);
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  window.addEventListener('focus', handleFocus);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('popstate', handlePopState);
  
  setTimeout(() => {
    restoreScrollPosition();
  }, 100);
  
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('blur', handleBlur);
    window.removeEventListener('popstate', handlePopState);
    
  };
}

/**
 * iOS Safari의 키보드 토글 감지 및 처리
 */
export function initKeyboardHandler(): () => void {
  const initialViewportHeight = window.innerHeight;
  
  const handleResize = () => {
    const currentHeight = window.innerHeight;
    const heightDiff = initialViewportHeight - currentHeight;
    
    if (heightDiff > 150) {
      saveScrollPosition();
      
    }
    else if (heightDiff < 50) {
      setTimeout(() => {
        restoreScrollPosition();
      }, 300);
      
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}