/**
 * 동적 뷰포트 높이 설정 유틸리티
 * iOS Safari 주소창 토글 시 레이아웃 깨짐 방지
 */

let isInitialized = false;

/**
 * 실제 뷰포트 높이를 계산하여 CSS 커스텀 프로퍼티로 설정
 */
export function setViewportHeight(): void {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
}

/**
 * 뷰포트 높이 모니터링 초기화
 * resize 이벤트와 orientationchange 이벤트 리스너 등록
 */
export function initViewportHeight(): void {
  if (isInitialized) return;
  
  setViewportHeight();
 
  window.addEventListener('resize', setViewportHeight);
    
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
  });
    
  let lastHeight = window.innerHeight;
  const checkHeightChange = () => {
    const currentHeight = window.innerHeight;
    if (Math.abs(currentHeight - lastHeight) > 50) {
      setViewportHeight();
      lastHeight = currentHeight;
    }
  };
  
  setInterval(checkHeightChange, 500);
  
  isInitialized = true;
  
}

/**
 * 뷰포트 높이 모니터링 정리
 */
export function cleanupViewportHeight(): void {
  if (!isInitialized) return;
  
  window.removeEventListener('resize', setViewportHeight);
  window.removeEventListener('orientationchange', setViewportHeight);
  isInitialized = false;
  
}

/**
 * 현재 뷰포트 정보 반환 (디버깅용)
 */
export function getViewportInfo() {
  return {
    innerHeight: window.innerHeight,
    outerHeight: window.outerHeight,
    screenHeight: window.screen.height,
    documentHeight: document.documentElement.clientHeight,
    bodyHeight: document.body.clientHeight,
    currentVh: getComputedStyle(document.documentElement).getPropertyValue('--vh'),
  };
}