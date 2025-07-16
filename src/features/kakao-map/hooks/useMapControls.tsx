import { useCallback } from 'react';
import { useMapContext } from '../context/MapContext';
import { useLocationStore } from '../store/LocationStore';

export const useMapControls = () => {
  const { state, actions } = useMapContext();
  const { getCurrentLocation } = useLocationStore();

  const handleSearch = useCallback(() => {
    actions.setLoading(true);
    // TODO: 실제 검색 API 연동
    actions.setLoading(false);
  }, [actions]);

  const handleSearchCancel = useCallback(() => {
    actions.setSearchValue('');
  }, [actions]);

  const handleFilterChange = useCallback(
    (filterValue: string) => {
      actions.setActiveFilter(filterValue);
      // TODO: 실제 필터링 로직 구현
    },
    [actions]
  );

  const handleLocationClick = useCallback(async () => {
    try {
      actions.setLoading(true);
      await getCurrentLocation();
      // 위치 정보는 LocationStore에서 관리되므로 별도 처리
    } catch (error) {
      console.error('위치 가져오기 실패:', error);
    } finally {
      actions.setLoading(false);
    }
  }, [actions, getCurrentLocation]);

  return {
    searchValue: state.searchValue,
    activeFilter: state.activeFilter,
    isLoading: state.isLoading,
    handleSearch,
    handleSearchCancel,
    handleFilterChange,
    handleLocationClick,
    setSearchValue: actions.setSearchValue,
  };
};
