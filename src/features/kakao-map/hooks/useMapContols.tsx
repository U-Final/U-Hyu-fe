import { useCallback } from 'react';
import { useMapContext } from '../context/MapContext';
import { useLocationStore } from '../store/LocationStore';

export const useMapControls = () => {
  const { state, actions } = useMapContext();
  const { getCurrentLocation } = useLocationStore();

  const handleSearch = useCallback(
    (value: string) => {
      console.log('🔍 검색 실행:', value);
      actions.setLoading(true);
      // TODO: 실제 검색 API 연동
      actions.setLoading(false);
    },
    [actions]
  );

  const handleSearchCancel = useCallback(() => {
    console.log('❌ 검색 취소');
    actions.setSearchValue('');
  }, [actions]);

  const handleFilterChange = useCallback(
    (filterValue: string) => {
      console.log('🔍 필터 변경:', filterValue);
      actions.setActiveFilter(filterValue);
      // TODO: 실제 필터링 로직 구현
    },
    [actions]
  );

  const handleLocationClick = useCallback(async () => {
    console.log('📍 내 위치 버튼 클릭');
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
