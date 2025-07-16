import React from 'react';
import { useMapControls } from '../hooks/useMapControls';
import MapTopControls from './layout/MapTopControls';

export const MapControlsContainer: React.FC = () => {
  const {
    searchValue,
    activeFilter,
    handleSearch,
    handleSearchCancel,
    handleFilterChange,
    setSearchValue,
  } = useMapControls();

  return (
    <MapTopControls
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onSearch={handleSearch}
      onSearchCancel={handleSearchCancel}
      activeFilter={activeFilter}
      onFilterChange={handleFilterChange}
    />
  );
};
