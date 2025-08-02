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
const SCROLL_RESTORE_TIMEOUT = 5 * 60 * 1000; // 5분

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
    
  } catch (error) {
    console.warn('Failed to save scroll position:', error);
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
    
    // 시간 초과 확인 (5분 이상 된 위치는 무시)
    if (Date.now() - position.timestamp > SCROLL_RESTORE_TIMEOUT) {
      sessionStorage.removeItem(SCROLL_RESTORE_KEY);
      return false;
    }
    
    // 스크롤 위치 복원
    window.scrollTo({
      left: position.x,
      top: position.y,
      behavior: 'auto', // 즉시 이동
    });
    
    
    return true;
  } catch (error) {
    console.warn('Failed to restore scroll position:', error);
    return false;
  }
}

/**
 * 저장된 스크롤 위치 정리
 */
export function clearScrollPosition(): void {
  try {
    sessionStorage.removeItem(SCROLL_RESTORE_KEY);
    
  } catch (error) {
    console.warn('Failed to clear scroll position:', error);
  }
}

/**
 * 스크롤 복원 이벤트 리스너 설정
 */
export function initScrollRestore(): () => void {
  // 페이지 언로드 시 스크롤 위치 저장
  const handleBeforeUnload = () => {
    saveScrollPosition();
  };
  
  // 포커스/블러 이벤트로 키보드 토글 감지
  const handleFocus = () => {
    // 포커스 시 현재 위치 저장 (키보드가 사라질 때 복원용)
    saveScrollPosition();
  };
  
  const handleBlur = () => {
    // 블러 후 약간의 지연을 두고 위치 복원
    setTimeout(() => {
      restoreScrollPosition();
    }, 300);
  };
  
  // 뒤로가기/앞으로가기 감지
  const handlePopState = () => {
    setTimeout(() => {
      restoreScrollPosition();
    }, 100);
  };
  
  // 이벤트 리스너 등록
  window.addEventListener('beforeunload', handleBeforeUnload);
  window.addEventListener('focus', handleFocus);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('popstate', handlePopState);
  
  // 초기 로드 시 위치 복원 시도
  setTimeout(() => {
    restoreScrollPosition();
  }, 100);
  
  
  // 정리 함수 반환
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
    
    // 키보드가 올라온 것으로 추정 (높이가 150px 이상 줄어듦)
    if (heightDiff > 150) {
      saveScrollPosition();
      
    }
    // 키보드가 내려간 것으로 추정
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