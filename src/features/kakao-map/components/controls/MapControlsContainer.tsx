import type { FC } from 'react';

import { BookmarkControlContainer } from '../bookmark/BookmarkControlContainer';
import { LocationControlContainer } from '../location/LocationControlContainer';

interface MapControlsContainerProps {
  /** 지도 중심 변경 콜백 */
  onCenterChange?: (center: { lat: number; lng: number; _forceUpdate?: number }) => void;
}

/**
 * 지도 우측 하단의 컨트롤 버튼들을 관리하는 컨테이너 컴포넌트
 * BookmarkButton과 LocationButton의 위치를 일관되게 관리
 */
export const MapControlsContainer: FC<MapControlsContainerProps> = ({
  onCenterChange
}) => {
  return (
    <div className="fixed right-4 bottom-[7rem] z-40 flex flex-col gap-3 md:right-6">
      {/* 북마크 버튼 (상단) */}
      <BookmarkControlContainer />
      
      {/* 위치 버튼 (하단) */}
      <LocationControlContainer onCenterChange={onCenterChange} />
    </div>
  );
};