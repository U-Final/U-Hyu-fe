import { type FC } from 'react';

interface CurrentLocationMarkerProps {
  /** 마커 크기 (기본: medium) */
  size?: 'small' | 'medium' | 'large';
  /** 애니메이션 활성화 여부 (기본: true) */
  animated?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
}

const CurrentLocationMarker: FC<CurrentLocationMarkerProps> = ({
  size = 'medium',
  animated = true,
  className = '',
}) => {
  // 크기별 스타일 정의 (모든 크기를 더 크게 조정)
  const sizeStyles = {
    small: {
      dot: 'w-5 h-5',
      ripple: 'w-12 h-12',
      offset: '-translate-x-3.5 -translate-y-3.5',
    },
    medium: {
      dot: 'w-6 h-6',
      ripple: 'w-16 h-16',
      offset: '-translate-x-5 -translate-y-5',
    },
    large: {
      dot: 'w-8 h-8',
      ripple: 'w-20 h-20',
      offset: '-translate-x-6 -translate-y-6',
    },
  };

  const styles = sizeStyles[size];

  return (
    <div className={`relative ${className}`}>
      {/* 메인 마커 도트 */}
      <div
        className={`
          ${styles.dot}
          bg-primary 
          rounded-full 
          border-3 
          border-white 
          shadow-lg
          relative
          z-10
          ${animated ? 'animate-bounce' : ''}
        `}
      >
        {/* 내부 하이라이트 */}
        <div className="absolute inset-1 bg-primary/40 rounded-full opacity-80" />
      </div>

      {/* 리플 효과 1 */}
      {animated && (
        <div
          className={`
            absolute 
            inset-0 
            ${styles.ripple}
            border-2 
            border-primary 
            rounded-full 
            opacity-40
            ${styles.offset}
            animate-ping
          `}
          style={{
            animationDuration: '2s',
            animationDelay: '0s',
          }}
        />
      )}

      {/* 리플 효과 2 */}
      {animated && (
        <div
          className={`
            absolute 
            inset-0 
            ${styles.ripple}
            border-2 
            border-primary/70 
            rounded-full 
            opacity-30
            ${styles.offset}
            animate-ping
          `}
          style={{
            animationDuration: '2s',
            animationDelay: '0.6s',
          }}
        />
      )}

      {/* 리플 효과 3 */}
      {animated && (
        <div
          className={`
            absolute 
            inset-0 
            ${styles.ripple}
            border-2 
            border-primary/50 
            rounded-full 
            opacity-20
            ${styles.offset}
            animate-ping
          `}
          style={{
            animationDuration: '2s',
            animationDelay: '1.2s',
          }}
        />
      )}

      {/* 배경 그림자 */}
      <div
        className={`
          absolute 
          inset-0 
          ${styles.dot}
          bg-primary 
          rounded-full 
          opacity-20 
          blur-sm
          translate-y-1
        `}
      />
    </div>
  );
};

export default CurrentLocationMarker;