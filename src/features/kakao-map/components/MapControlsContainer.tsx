import React from 'react';
import { useMapUI } from '../hooks/useMapUI';
import MapTopControls from './layout/MapTopControls';

export const MapControlsContainer: React.FC = () => {
  const { searchValue, setSearchValue, setSearchFocused } = useMapUI();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchCancel = () => {
    setSearchValue('');
    setSearchFocused(false);
  };

  const handleFilterChange = (filter: string) => {
    // TODO: region filter 구현 필요
    console.log('Filter changed:', filter);
  };

  return (
    <MapTopControls
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onSearch={handleSearch}
      onSearchCancel={handleSearchCancel}
      activeFilter={''} // TODO: region filter 상태 추가 필요
      onFilterChange={handleFilterChange}
    />
  );
};
