import { useState, useCallback } from 'react';
import { type SignupData, type CompletedStep, type StepValidation } from '../types';
import { EMAIL_REGEX } from '../constants';

const initialData: SignupData = {
  membershipGrade: '',
  recentBrands: [],
  selectedBrands: [],
  email: '',
  emailVerified: false,
};

const stepValidation: StepValidation = {
  1: (data) => data.email !== '' && EMAIL_REGEX.test(data.email) && data.emailVerified,
  2: (data) => data.membershipGrade !== '',
  3: (data) => data.recentBrands.length > 0,
  4: (data) => data.selectedBrands.length > 0,
};

export const useSignupFlow = () => {
  const [data, setData] = useState<SignupData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>([]);

  const updateData = useCallback((updates: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  // 완료된 스텝의 데이터 업데이트 처리
  const updateCompletedStepData = useCallback(
    (stepNumber: number, updates: Partial<SignupData>) => {
      setCompletedSteps((prev) =>
        prev.map((step) =>
          step.step === stepNumber ? { ...step, data: { ...step.data, ...updates } } : step
        )
      );
      // 현재 데이터도 동기화
      setData((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const toggleBrand = useCallback(
    (brandId: string, field: 'recentBrands' | 'selectedBrands') => {
      const currentBrands = data[field];
      const newBrands = currentBrands.includes(brandId)
        ? currentBrands.filter((id) => id !== brandId)
        : [...currentBrands, brandId];

      updateData({ [field]: newBrands });
    },
    [data, updateData]
  );

  // 완료된 스텝의 브랜드 토글 처리
  const toggleCompletedStepBrand = useCallback(
    (stepNumber: number, brandId: string, field: 'recentBrands' | 'selectedBrands') => {
      setCompletedSteps((prev) =>
        prev.map((step) => {
          if (step.step === stepNumber) {
            const currentBrands = step.data[field];
            const newBrands = currentBrands.includes(brandId)
              ? currentBrands.filter((id) => id !== brandId)
              : [...currentBrands, brandId];

            return { ...step, data: { ...step.data, [field]: newBrands } };
          }
          return step;
        })
      );
      // 현재 데이터도 동기화
      toggleBrand(brandId, field);
    },
    [toggleBrand]
  );

  const goToNextStep = useCallback(() => {
    const completedStep: CompletedStep = {
      id: `step-${currentStep}-${Date.now()}`,
      step: currentStep,
      data: { ...data },
    };

    setCompletedSteps((prev) => [completedStep, ...prev]);
    setCurrentStep(currentStep + 1);
  }, [currentStep, data]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 1) {
      const lastCompleted = completedSteps[0];
      if (lastCompleted) {
        setData(lastCompleted.data);
        setCompletedSteps((prev) => prev.slice(1));
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
  };
};
