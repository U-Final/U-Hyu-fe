export interface BaseBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  children: React.ReactNode;
  height?: 'small' | 'medium' | 'large' | 'full' | 'auto';
  className?: string;
  closeOnBackdrop?: boolean;
  showHandle?: boolean;
  showCloseButton?: boolean;
}

export interface NavigationStep {
  id: string;
  title: string;
  subtitle?: string;
  data?: unknown;
}

export interface NavigationState {
  currentStep: string;
  history: NavigationStep[];
  data: Record<string, unknown>;
}

export interface SelectionItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  useCircularIcon?: boolean;
  brandImageUrl?: string;
  iconSize?: 'small' | 'medium' | 'large';
  rightElement?: React.ReactNode;
  isDisabled?: boolean;
}

export interface NavigationBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Record<
    string,
    { title?: string; subtitle?: string; [key: string]: unknown }
  >;
  initialStep: string;
  onApply: (data: {
    selections: Record<string, string[]>;
    navigationData: Record<string, unknown>;
  }) => void;
  renderStepContent: (
    stepId: string,
    stepData: unknown,
    helpers: unknown
  ) => React.ReactNode;
  height?: 'small' | 'medium' | 'large' | 'full' | 'auto';
  showApplyButton?: boolean;
  showResetButton?: boolean;
}

export interface SelectionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  items: SelectionItem[];
  selectedItems: string[];
  onItemSelect: (itemId: string) => void;
  multiSelect?: boolean;
  showApplyButton?: boolean;
  onApply?: () => void;
  height?: 'small' | 'medium' | 'large' | 'full' | 'auto';
  autoCloseOnSelect?: boolean;
}
