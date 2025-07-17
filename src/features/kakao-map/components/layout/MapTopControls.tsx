import { FilterTabs, SearchInput } from '@/shared/components';
import RegionFilterDropdown from '@features/kakao-map/components/layout/RegionFilterDropdown';
import { type FC } from 'react';

interface MapTopControlsProps {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  onSearch: (value: string) => void;
  onSearchCancel: () => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

const MapTopControls: FC<MapTopControlsProps> = ({
  searchValue,
  onSearchValueChange,
  onSearch,
  onSearchCancel,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <SearchInput
        value={searchValue}
        onChange={onSearchValueChange}
        onSearch={onSearch}
        onCancel={onSearchCancel}
        placeholder="장소 검색"
        variant="white"
      />
      <div className="flex items-center justify-between mt-2 min-h-[44px] w-full">
        {/* 왼쪽: 지역별 필터 */}
        <div className="flex-shrink-0">
          <RegionFilterDropdown
            value={activeFilter}
            onChange={onFilterChange}
          />
        </div>
        {/* 가운데: 필터탭 */}
        <div className="flex-1 flex justify-center">
          <FilterTabs variant="white" onChange={onFilterChange} />
        </div>
      </div>
    </div>
  );
};

export default MapTopControls;
