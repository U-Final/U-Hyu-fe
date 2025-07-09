import { useState, useCallback } from 'react';
import { type SignupData, type CompletedStep, type StepValidation } from '../types';
import { EMAIL_REGEX } from '../constants';

const initialData: SignupData = {
  membershipGrade: '',
  recentBrands: [],
  selectedBrands: [],
  email: '',
};

const stepValidation: StepValidation = {
  1: (data) => data.membershipGrade !== '',
  2: (data) => data.recentBrands.length > 0,
  3: (data) => data.selectedBrands.length > 0,
  4: (data) => data.email !== '' && EMAIL_REGEX.test(data.email),
};

export const useSignupFlow = () => {
  const [data, setData] = useState<SignupData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<CompletedStep[]>([]);

  const updateData = useCallback((updates: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

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
    toggleBrand,
    goToNextStep,
    goToPrevStep,
    resetFlow,
    isStepValid,
  };
};
