import type { FC } from 'react';

import { BookmarkControlContainer } from '../bookmark/BookmarkControlContainer';
import { LocationControlContainer } from '../location/LocationControlContainer';

interface MapControlsContainerProps {
  /** 검색 결과 표시 여부 (검색 결과가 표시될 때 컨트롤 버튼들을 숨김) */
  hideWhenSearching?: boolean;
}

/**
 * 지도 우측 하단의 컨트롤 버튼들을 관리하는 컨테이너 컴포넌트
 * BookmarkButton과 LocationButton의 위치를 일관되게 관리
 */
export const MapControlsContainer: FC<MapControlsContainerProps> = ({
  hideWhenSearching = false,
}) => {
  if (hideWhenSearching) {
    return null;
  }

  return (
    <div className="absolute right-4 top-[6rem] z-[5] flex flex-col gap-2 md:right-6">
      {/* 북마크 버튼 (상단) */}
      <BookmarkControlContainer />

      {/* 위치 버튼 (하단) */}
      <LocationControlContainer />
    </div>
  );
};
