export interface MembershipGrade {
  value: string;
  label: string;
}

export interface SignupData {
  membershipGrade: string;
  recentBrands: string[];
  selectedBrands: string[];
  email: string;
  emailVerified: boolean;
}

export interface CompletedStep {
  id: string;
  step: number;
  data: SignupData;
}

export interface StepValidation {
  [key: number]: (data: SignupData) => boolean;
}

export interface StepTitleProps {
  children: React.ReactNode;
}

export interface StepContentProps {
  step: number;
  data: SignupData;
  onUpdateData: (updates: Partial<SignupData>) => void;
  onToggleBrand: (
    brandId: string,
    field: 'recentBrands' | 'selectedBrands'
  ) => void;
  disabled?: boolean;
}

export interface PrimaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface CurrentStepProps {
  currentStep: number;
  data: SignupData;
  onUpdateData: (updates: Partial<SignupData>) => void;
  onToggleBrand: (
    brandId: string,
    field: 'recentBrands' | 'selectedBrands'
  ) => void;
  onReset: () => void;
  isStepValid: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export interface CompletedStepsProps {
  completedSteps: CompletedStep[];
}

// 확장된 ActionButtons Props
export interface ActionButtonsProps {
  currentStep: number;
  isStepValid: boolean;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
  submitError?: Error | null;
}

// 새로운 API 관련 타입들
export interface SignupFlowState {
  isSubmitting: boolean;
  submitError: Error | null;
  submitSuccess: boolean;
}

export interface SignupCompleteCallback {
  (success: boolean, message?: string): void;
}

// useSignupFlow 반환 타입
export interface UseSignupFlowReturn {
  data: SignupData;
  currentStep: number;
  completedSteps: CompletedStep[];
  updateData: (updates: Partial<SignupData>) => void;
  updateCompletedStepData: (
    stepNumber: number,
    updates: Partial<SignupData>
  ) => void;
  toggleBrand: (
    brandId: string,
    field: 'recentBrands' | 'selectedBrands'
  ) => void;
  toggleCompletedStepBrand: (
    stepNumber: number,
    brandId: string,
    field: 'recentBrands' | 'selectedBrands'
  ) => void;
  goToNextStep: () => Promise<void>;
  goToPrevStep: () => void;
  resetFlow: () => void;
  isStepValid: (step: number) => boolean;
  isSubmitting: boolean;
  submitError: Error | null;
}
