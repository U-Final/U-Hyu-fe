import { useCallback, useState } from 'react';
import type { NavigationState } from '../bottomSheet.type';

export const useBottomSheetNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentStep: '',
    history: [],
    data: {},
  });

  const navigateTo = useCallback((stepId: string, stepTitle: string, stepSubtitle?: string) => {
    setNavigationState((prev) => ({
      ...prev,
      currentStep: stepId,
      history: [...prev.history, { id: stepId, title: stepTitle, subtitle: stepSubtitle }],
    }));
  }, []);

  const goBack = useCallback(() => {
    setNavigationState((prev) => {
      const newHistory = prev.history.slice(0, -1);
      return {
        ...prev,
        currentStep: newHistory[newHistory.length - 1]?.id || '',
        history: newHistory,
      };
    });
  }, []);

  const reset = useCallback(
    (initialStep: string, initialTitle: string, initialSubtitle?: string) => {
      setNavigationState({
        currentStep: initialStep,
        history: [{ id: initialStep, title: initialTitle, subtitle: initialSubtitle }],
        data: {},
      });
    },
    []
  );

  const updateData = useCallback((key: string, value: unknown) => {
    setNavigationState((prev) => ({
      ...prev,
      data: { ...prev.data, [key]: value },
    }));
  }, []);

  const canGoBack = navigationState.history.length > 1;
  const currentStepData = navigationState.history[navigationState.history.length - 1];

  return {
    navigationState,
    navigateTo,
    goBack,
    reset,
    updateData,
    canGoBack,
    currentStepData,
    currentStepTitle: currentStepData?.title || '',
    currentStepSubtitle: currentStepData?.subtitle,
  };
};
