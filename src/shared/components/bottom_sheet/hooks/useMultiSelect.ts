import { useCallback, useState } from 'react';

export const useMultiSelect = () => {
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const toggleItem = useCallback((category: string, itemId: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category]?.includes(itemId)
        ? prev[category].filter(id => id !== itemId)
        : [...(prev[category] || []), itemId],
    }));
  }, []);

  const selectItem = useCallback((category: string, itemId: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), itemId],
    }));
  }, []);

  const deselectItem = useCallback((category: string, itemId: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category]?.filter(id => id !== itemId) || [],
    }));
  }, []);

  const clearCategory = useCallback((category: string) => {
    setSelections(prev => ({ ...prev, [category]: [] }));
  }, []);

  const clearAll = useCallback(() => {
    setSelections({});
  }, []);

  const getSelectionCount = useCallback(
    (category?: string) => {
      if (category) return selections[category]?.length || 0;
      return Object.values(selections).reduce(
        (sum, arr) => sum + arr.length,
        0
      );
    },
    [selections]
  );

  const isSelected = useCallback(
    (category: string, itemId: string) => {
      return selections[category]?.includes(itemId) || false;
    },
    [selections]
  );

  return {
    selections,
    toggleItem,
    selectItem,
    deselectItem,
    clearCategory,
    clearAll,
    getSelectionCount,
    isSelected,
  };
};
