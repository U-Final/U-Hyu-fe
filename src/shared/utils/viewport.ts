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
  
  if (import.meta.env.MODE === 'development') {
    console.log('📏 Viewport height updated:', {
      innerHeight: window.innerHeight,
      vh: `${vh}px`,
      calculatedHeight: `${vh * 100}px`
    });
  }
}

/**
 * 뷰포트 높이 모니터링 초기화
 * resize 이벤트와 orientationchange 이벤트 리스너 등록
 */
export function initViewportHeight(): void {
  if (isInitialized) return;
  
  // 초기 설정
  setViewportHeight();
  
  // 리사이즈 이벤트 리스너
  window.addEventListener('resize', setViewportHeight);
  
  // 방향 변경 이벤트 리스너 (모바일)
  window.addEventListener('orientationchange', () => {
    // orientationchange 후 약간의 지연을 두고 설정
    // 브라우저가 실제 크기를 계산할 시간 제공
    setTimeout(setViewportHeight, 100);
  });
  
  // iOS Safari의 주소창 토글을 감지하기 위한 추가 처리
  let lastHeight = window.innerHeight;
  const checkHeightChange = () => {
    const currentHeight = window.innerHeight;
    if (Math.abs(currentHeight - lastHeight) > 50) { // 50px 이상 변화 시
      setViewportHeight();
      lastHeight = currentHeight;
    }
  };
  
  // 주기적으로 높이 변화 체크 (iOS Safari 주소창 토글 대응)
  setInterval(checkHeightChange, 500);
  
  isInitialized = true;
  
  if (import.meta.env.MODE === 'development') {
    console.log('🚀 Viewport height monitoring initialized');
  }
}

/**
 * 뷰포트 높이 모니터링 정리
 */
export function cleanupViewportHeight(): void {
  if (!isInitialized) return;
  
  window.removeEventListener('resize', setViewportHeight);
  window.removeEventListener('orientationchange', setViewportHeight);
  isInitialized = false;
  
  if (import.meta.env.MODE === 'development') {
    console.log('🧹 Viewport height monitoring cleaned up');
  }
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