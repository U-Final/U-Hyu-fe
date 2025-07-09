import { useSignupStore } from '../stores/signup-store';

export function useSignupNavigation() {
  // 필요한 상태와 액션들을 선택적으로 구독
  const currentStep = useSignupStore((state) => state.currentStep);
  const direction = useSignupStore((state) => state.direction);
  const nextStep = useSignupStore((state) => state.nextStep);
  const prevStep = useSignupStore((state) => state.prevStep);
  const reset = useSignupStore((state) => state.reset);
  const canGoNext = useSignupStore((state) => state.canGoNext);
  const canGoBack = useSignupStore((state) => state.canGoBack);

  return {
    currentStep,
    direction,
    handleNext: nextStep,
    handleBack: prevStep,
    handleReset: reset,
    canGoNext: canGoNext(),
    canGoBack: canGoBack(),
  };
}
