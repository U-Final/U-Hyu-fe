import type React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSignupStore } from './stores/signup-store';
import { BackButton } from './components/back-button';
import {
  MembershipStep,
  RecentBrandsStep,
  InterestedBrandsStep,
  EmailStep,
  CompletionStep,
} from './steps/Steps';

const SignupFlow: React.FC = () => {
  // 필요한 상태만 선택적으로 구독
  const currentStep = useSignupStore((state) => state.currentStep);
  const direction = useSignupStore((state) => state.direction);
  const prevStep = useSignupStore((state) => state.prevStep);
  const canGoBack = useSignupStore((state) => state.canGoBack());

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <MembershipStep />;
      case 2:
        return <RecentBrandsStep />;
      case 3:
        return <InterestedBrandsStep />;
      case 4:
        return <EmailStep />;
      case 5:
        return <CompletionStep />;
      default:
        return <MembershipStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-6 py-8">
        {canGoBack && <BackButton onClick={prevStep} />}

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {renderCurrentStep()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SignupFlow;
