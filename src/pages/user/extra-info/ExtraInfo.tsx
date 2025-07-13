import React, { useRef } from 'react';
import { LayoutGroup } from 'framer-motion';
import { useSignupFlow } from './hooks/useSignupFlow';
import { CurrentStep } from './components/CurrentStep';
import { CompletedSteps } from './components/CompletedSteps';

const ImprovedSignupFlow: React.FC = () => {
  const {
    data,
    currentStep,
    completedSteps,
    updateData,
    toggleBrand,
    goToNextStep,
    goToPrevStep,
    resetFlow,
    isStepValid,
  } = useSignupFlow();

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen" ref={containerRef}>
        <LayoutGroup>
          <CurrentStep
            currentStep={currentStep}
            data={data}
            onUpdateData={updateData}
            onToggleBrand={toggleBrand}
            onReset={resetFlow}
            isStepValid={isStepValid(currentStep)}
            onNext={goToNextStep}
            onPrev={goToPrevStep}
          />

          <CompletedSteps completedSteps={completedSteps} />
        </LayoutGroup>
      </div>
    </div>
  );
};

export default ImprovedSignupFlow;
