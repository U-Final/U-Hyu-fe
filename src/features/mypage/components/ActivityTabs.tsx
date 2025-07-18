import type { MyPageTab } from '@mypage/types';
import { MYPAGE_TABS } from '@mypage/constants/tabs';

interface Props {
  activeTab: MyPageTab;
  setActiveTab: (tab: MyPageTab) => void;
}

const ActivityTabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="sticky top-0 z-10 pt-[1rem] pb-[0.5rem]">
      <div
        className="relative flex items-center justify-between bg-gray-100 rounded-[1rem] px-[0.25rem] h-[3rem]"
        role="tablist"
        aria-label="활동 내역 및 즐겨찾기 탭"
      >
        <div
          className={`
            absolute top-[0.35rem] bottom-[0.35rem] left-[0.25rem]
            w-[calc(50%-0.37rem)]
            rounded-[0.8rem] bg-blue-500
            transition-transform duration-300 ease-in-out
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
                text-[0.875rem] font-bold transition-colors duration-200 ease-in-out
                ${isActive ? 'text-white' : 'text-gray-500'}
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTabs;
