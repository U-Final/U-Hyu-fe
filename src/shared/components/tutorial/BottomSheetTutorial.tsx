import { useEffect, useState } from 'react';

import Lottie from 'lottie-react';

interface BottomSheetTutorialProps {
  /** 튜토리얼 표시 여부 */
  isVisible: boolean;
  /** 튜토리얼 완료 콜백 */
  onComplete: () => void;
  /** 자동 완료 시간 (밀리초, 기본값: 3000ms) */
  autoCompleteDelay?: number;
}

/**
 * 바텀시트 사용법을 안내하는 튜토리얼 컴포넌트
 * Lottie 애니메이션으로 스와이프 업 동작을 시연
 */
export const BottomSheetTutorial: React.FC<BottomSheetTutorialProps> = ({
  isVisible,
  onComplete,
  autoCompleteDelay = 3000,
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const availableHeight = window.innerHeight;
  const middleY = availableHeight * 0.4;

  // Lottie 애니메이션 데이터 로드
  useEffect(() => {
    if (isVisible) {
      fetch('/lottie/swipe_up.json')
        .then(response => response.json())
        .then(data => {
          setAnimationData(data);
          setIsLoaded(true);
        })
        .catch(error => {
          console.error('Failed to load Lottie animation:', error);
          setIsLoaded(true); // 로딩 실패해도 컴포넌트는 표시
        });
    }
  }, [isVisible]);

  // 자동 완료 타이머
  useEffect(() => {
    if (isVisible && isLoaded) {
      const timer = setTimeout(() => {
        onComplete();
      }, autoCompleteDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded, onComplete, autoCompleteDelay]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1005] pointer-events-none">
      {/* 반투명 오버레이 */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onComplete}
      />

      {/* 바텀시트 핸들러 위치에 Lottie 애니메이션 */}
      <div
        className="fixed left-1/2 transform -translate-x-1/2 z-10 pointer-events-auto"
        style={{
          top: middleY - 300,
        }}
      >
        {/* 설명 말풍선 */}
        <div className="relative mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-2xl text-center min-w-[320px]">
            <h3 className="text-xl font-bold text-primary mb-2">
              위로 스와이프!
            </h3>
            <p className="text-gray-800 text-base leading-relaxed">
              지금 가까운 매장과 혜택을 상세하게 확인해 보세요!
            </p>
          </div>
          {/* 말풍선 꼬리 - 아래쪽을 향함 */}
          <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        {/* Lottie 애니메이션 - 바텀시트 핸들러 바로 위에 위치 */}
        <div className="flex justify-center">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-72 h-72"
            />
          ) : (
            // 로딩 중 또는 로딩 실패시 대체 UI
            <div className="w-72 h-72 flex items-center justify-center">
              <div className="animate-bounce">
                <div className="w-20 h-20 bg-white rounded-full opacity-80" />
                <div className="w-16 h-2 bg-white/60 rounded-full mt-4 mx-auto" />
                <div className="text-white text-lg mt-4 text-center">↑</div>
              </div>
            </div>
          )}
        </div>

        {/* 스킵 버튼 */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onComplete}
            className="text-white/90 hover:text-white text-sm font-medium 
                       px-3 py-1.5 rounded-full bg-black/30 hover:bg-black/40 
                       border border-white/20 transition-all duration-200"
          >
            건너뛰기
          </button>
        </div>
      </div>
    </div>
  );
};
