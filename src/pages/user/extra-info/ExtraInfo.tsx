import React, { useEffect, useRef } from 'react'; // useEffect 추가
import { LayoutGroup } from 'framer-motion';
import { useSignupFlow } from '@extra-info/hooks/useSignupFlow';
import { CurrentStep } from '@extra-info/components/CurrentStep';
import { CompletedSteps } from '@extra-info/components/CompletedSteps';
import { authClient } from '@/lib/axiosClient'; // authClient import

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

  // ✅ 여기 추가!
  useEffect(() => {
    authClient.get('/user')
      .then(res => console.log('✅ 쿠키 전달 성공, 사용자 정보:', res.data))
      .catch(err => console.error('❌ 쿠키 전달 실패', err));
  }, []);

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
