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
  onToggleBrand: (brandId: string, field: "recentBrands" | "selectedBrands") => void;
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
  onToggleBrand: (brandId: string, field: "recentBrands" | "selectedBrands") => void;
  onReset: () => void;
  isStepValid: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export interface CompletedStepsProps {
  completedSteps: CompletedStep[];
}

export interface ActionButtonsProps {
  currentStep: number;
  isStepValid: boolean;
  onNext: () => void;
  onPrev: () => void;
}
