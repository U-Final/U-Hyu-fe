import { useCallback, useState } from 'react';

import { useSubmitExtraInfo } from '@user/hooks/useUserMutation';

import { EMAIL_REGEX } from '../constants';
import {
  type CompletedStep,
  type SignupData,
  type StepValidation,
} from '../types';

const initialData: SignupData = {
  membershipGrade: '',
  recentBrands: [],
  selectedBrands: [],
  email: '',
  emailVerified: false,
};

const stepValidation: StepValidation = {
  1: data =>
    data.email !== '' && EMAIL_REGEX.test(data.email) && data.emailVerified,
  2: data => data.membershipGrade !== '',
  3: data => data.recentBrands.length > 0,
  4: data => data.selectedBrands.length > 0,
};

// 멤버십 등급 매핑 함수
const mapMembershipGrade = (grade: string): 'GOOD' | 'VIP' | 'VVIP' => {
  const gradeMap: Record<string, 'GOOD' | 'VIP' | 'VVIP'> = {
    Excellent: 'GOOD',
    vip: 'VIP',
    vvip: 'VVIP',
  };
  return gradeMap[grade] || 'GOOD';
};

export const useSignupFlow = (
  onComplete?: (success: boolean, message?: string) => void
) => {
  const [data, setData] = useState<SignupData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>([]);

  // API 요청을 위한 mutation hook
  const submitExtraInfo = useSubmitExtraInfo();

  const updateData = useCallback((updates: Partial<SignupData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const updateCompletedStepData = useCallback(
    (stepNumber: number, updates: Partial<SignupData>) => {
      setCompletedSteps(prev =>
        prev.map(step =>
          step.step === stepNumber
            ? { ...step, data: { ...step.data, ...updates } }
            : step
        )
      );
      setData(prev => ({ ...prev, ...updates }));
    },
    []
  );

  const toggleBrand = useCallback(
    (brandId: number, field: 'recentBrands' | 'selectedBrands') => {
      const currentBrands = data[field];
      const newBrands = currentBrands.includes(brandId)
        ? currentBrands.filter(id => id !== brandId)
        : [...currentBrands, brandId];

      updateData({ [field]: newBrands });
    },
    [data, updateData]
  );

  const toggleCompletedStepBrand = useCallback(
    (
      stepNumber: number,
      brandId: number,
      field: 'recentBrands' | 'selectedBrands'
    ) => {
      setCompletedSteps(prev =>
        prev.map(step => {
          if (step.step === stepNumber) {
            const currentBrands = step.data[field];
            const newBrands = currentBrands.includes(brandId)
              ? currentBrands.filter(id => id !== brandId)
              : [...currentBrands, brandId];

            return { ...step, data: { ...step.data, [field]: newBrands } };
          }
          return step;
        })
      );
      toggleBrand(brandId, field);
    },
    [toggleBrand]
  );

  // API 연동이 포함된 다음 스텝 진행 함수
  const goToNextStep = useCallback(async () => {
    const completedStep: CompletedStep = {
      id: `step-${currentStep}-${Date.now()}`,
      step: currentStep,
      data: { ...data },
    };

    // 마지막 단계(4단계)에서 API 요청 수행
    if (currentStep === 4) {
      try {
        // API 요청 데이터 준비
        const apiData = {
          grade: mapMembershipGrade(data.membershipGrade),
          recentBrands: data.recentBrands,
          interestedBrands: data.selectedBrands,
        };

        // API 요청 실행 (로딩 상태는 mutation에서 자동 관리)
        await submitExtraInfo.mutateAsync(apiData);

        // 성공 시 완료 단계로 이동
        setCompletedSteps(prev => [completedStep, ...prev]);
        setCurrentStep(currentStep + 1);

        // 성공 콜백 호출
        onComplete?.(true, '회원가입이 성공적으로 완료되었습니다!');
      } catch (error) {
        console.error('회원가입 실패:', error);

        // 에러 처리 - 콜백으로 에러 메시지 전달
        const errorMessage =
          error instanceof Error
            ? error.message
            : '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.';

        onComplete?.(false, errorMessage);
      }
    } else {
      // 일반 스텝 진행
      setCompletedSteps(prev => [completedStep, ...prev]);
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, data, submitExtraInfo, onComplete]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 1) {
      const lastCompleted = completedSteps[0];
      if (lastCompleted) {
        setData(lastCompleted.data);
        setCompletedSteps(prev => prev.slice(1));
        setCurrentStep(currentStep - 1);
      }
    }
  }, [currentStep, completedSteps]);

  const resetFlow = useCallback(() => {
    setData(initialData);
    setCurrentStep(1);
    setCompletedSteps([]);
  }, []);

  const isStepValid = useCallback(
    (step: number) => {
      return stepValidation[step]?.(data) || false;
    },
    [data]
  );

  return {
    data,
    currentStep,
    completedSteps,
    updateData,
    updateCompletedStepData,
    toggleBrand,
    toggleCompletedStepBrand,
    goToNextStep,
    goToPrevStep,
    resetFlow,
    isStepValid,
    // API 관련 상태들 추가로 노출
    isSubmitting: submitExtraInfo.isPending,
    submitError: submitExtraInfo.error,
  };
};
