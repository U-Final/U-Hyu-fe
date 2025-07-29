import type { ComponentType } from 'react';

/**
 * label: 탭에 표시될 텍스트
 * value: 탭의 고유 값
 * icon: 탭에 표시될 아이콘 컴포넌트 (선택사항)
 * color: 활성 상태 시 사용할 색상 (선택사항)
 */
export interface FilterTabItem {
  label: string;
  value: string;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
}

/** 스타일 종류 (variant) 타입 */
export type FilterTabVariant = 'gray' | 'white';

export interface FilterTabProps {
  /** 탭 목록 (label + value 쌍으로 구성) */
  tabs?: FilterTabItem[];

  /** 탭이 선택될 때 호출되는 콜백 */
  onChange?: (value: string) => void;

  /** 탭 스타일 타입 */
  variant?: FilterTabVariant;
}
