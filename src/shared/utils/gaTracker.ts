// Google Analytics 추적 유틸리티

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// GA 초기화
export const initGA = (measurementId: string) => {
  if (typeof window !== 'undefined' && !window.gtag) {
    // GA 스크립트 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // gtag 함수 정의
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// 페이지뷰 추적
export const trackPageView = (
  measurementId: string,
  pageTitle: string,
  pagePath?: string
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', measurementId, {
      page_title: pageTitle,
      page_location: pagePath || window.location.href,
    });
  }
};

// 이벤트 추적
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 커스텀 이벤트 추적
export const trackCustomEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  } else {
    console.warn('gtag not initialized. Event not tracked:', eventName);
  }
};
