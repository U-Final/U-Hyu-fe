import { useCallback, useState } from 'react';

import { useSubmitExtraInfo } from '@user/hooks/useUserMutation';

import type { UserGender } from '@/shared/types';

import {
  type CompletedStep,
  type SignupData,
  type StepValidation,
} from '../types';
import { mapMembershipGrade } from '../utils/membershipGrade';

const initialData: SignupData = {
  membershipGrade: '',
  recentBrands: [],
  selectedBrands: [],
  age: 0,
  gender: '',
  grade: '',
};

const stepValidation: StepValidation = {
  1: data => data.age >= 10 && data.age <= 90 && data.gender !== '',
  2: data => data.membershipGrade !== '',
  3: data => data.recentBrands.length > 0,
  4: data => data.selectedBrands.length > 0,
};

export const useSignupFlow = (
  onComplete?: (success: boolean, message?: string) => void
) => {
  const [data, setData] = useState<SignupData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>([]);

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

  const goToNextStep = useCallback(async () => {
    const completedStep: CompletedStep = {
      id: `step-${currentStep}-${Date.now()}`,
      step: currentStep,
      data: { ...data },
    };
    if (currentStep === 4) {
      try {
        const apiData = {
          age: data.age,
          gender: data.gender as UserGender,
          grade: mapMembershipGrade(data.membershipGrade),
          recentBrands: data.recentBrands,
          interestedBrands: data.selectedBrands,
        };
        await submitExtraInfo.mutateAsync(apiData);

        setCompletedSteps(prev => [completedStep, ...prev]);
        setCurrentStep(currentStep + 1);

        onComplete?.(true, '회원가입이 성공적으로 완료되었습니다!');
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.';

        onComplete?.(false, errorMessage);
      }
    } else {
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
    isSubmitting: submitExtraInfo.isPending,
    submitError: submitExtraInfo.error,
  };
};
