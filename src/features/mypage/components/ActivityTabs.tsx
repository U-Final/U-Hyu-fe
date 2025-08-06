import { useEffect, useRef, useState, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import type { MyPageTab } from '@mypage/types';
import { MYPAGE_TABS } from '@mypage/constants/tabs';

interface Props {
  activeTab: MyPageTab;
  setActiveTab: (tab: MyPageTab) => void;
}

const FixedActivityTabContainer = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <div 
      ref={ref}
      className="fixed top-4 left-4 right-4 z-40 pointer-events-none desktop-content-position animate-in fade-in-0 slide-in-from-top-2 duration-300"
    >
      <div className="py-0 px-0">
        <div className="flex items-center justify-start ml-[48px] pointer-events-auto">
          <div className="w-full max-w-[calc(100vw-80px)] lg:max-w-[435px] xl:max-w-[530px] 2xl:max-w-[630px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
);

FixedActivityTabContainer.displayName = 'FixedActivityTabContainer';

const ActivityTabs = ({ activeTab, setActiveTab }: Props) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (!sentinelRef.current || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-60px 0px 0px 0px',
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const tabContent = (
    <div
      className={`relative flex items-center justify-between bg-gray-100 rounded-[1rem] px-[0.25rem] transition-all duration-500 ease-out ${
        isFixed ? 'h-[38px] shadow-md' : 'h-[3rem]'
      }`}
      role="tablist"
      aria-label="활동 내역 및 즐겨찾기 탭"
    >
      <div
        className={`
          absolute top-[0.35rem] bottom-[0.35rem] left-[0.25rem]
          w-[calc(50%-0.37rem)]
          rounded-[0.8rem] bg-primary
          transition-transform duration-500 ease-out
          ${activeTab === MYPAGE_TABS[0] ? 'translate-x-0' : 'translate-x-[calc(100%+0.25rem)]'}
        `}
      />

      {MYPAGE_TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveTab(tab);
              }
            }}
            className={`
              relative z-10 flex-1 rounded-[1.5rem] py-[0.625rem]
              text-[0.875rem] font-bold transition-all duration-300 ease-out
              ${isActive ? 'text-white' : 'text-[var(--text-gray)]'}
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />
      <div ref={containerRef} className={`transition-opacity duration-300 ${isFixed ? 'opacity-0' : 'opacity-100'}`}>
        <div className="py-[0.5rem]">
          {tabContent}
        </div>
      </div>
      {isFixed && typeof document !== 'undefined' &&
        createPortal(
          <FixedActivityTabContainer>
            {tabContent}
          </FixedActivityTabContainer>,
          document.body
        )
      }
    </>
  );
};

export default ActivityTabs;
