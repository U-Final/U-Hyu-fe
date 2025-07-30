interface Props {
  activeTab: 'stats' | 'brands';
  setActiveTab: (tab: 'stats' | 'brands') => void;
}

const AdminToggleTabs = ({ activeTab, setActiveTab }: Props) => {
  const tabs = ['통계', '브랜드 관리'] as const;

  return (
    <div className="sticky top-0 z-10">
      <div className="py-[0.5rem]">
        <div
          className="relative flex items-center justify-between bg-gray-100 rounded-[1rem] px-[0.25rem] h-[3rem]"
          role="tablist"
          aria-label="통계 및 브랜드 관리 탭"
        >
          <div
            className={`
              absolute top-[0.35rem] bottom-[0.35rem] left-[0.25rem]
              w-[calc(50%-0.37rem)]
              rounded-[0.8rem] bg-blue-500
              transition-transform duration-300 ease-in-out
              ${activeTab === 'stats' ? 'translate-x-0' : 'translate-x-[calc(100%+0.25rem)]'}
            `}
          />

          {tabs.map((tab, index) => {
            const tabValue = index === 0 ? 'stats' : 'brands';
            const isActive = activeTab === tabValue;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tabValue)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveTab(tabValue);
                  }
                }}
                className={`
                  relative z-10 flex-1 rounded-[1.5rem] py-[0.625rem]
                  text-[0.875rem] font-bold transition-colors duration-200 ease-in-out
                  ${isActive ? 'text-white' : 'text-[var(--text-gray)]'}
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminToggleTabs; 