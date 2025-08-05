import type { Position } from '../store/types';

/**
 * 지역 정보 인터페이스
 */
export interface RegionInfo {
  /** 지역 키 */
  key: string;
  /** 지역 표시 이름 */
  label: string;
  /** 지역 중심 좌표 */
  center: Position;
  /** 기본 줌 레벨 */
  defaultZoom?: number;
}

/**
 * 한국 주요 지역별 중심 좌표 정의
 * 각 지역의 대표적인 중심점 좌표를 하드코딩
 */ export const REGION_COORDINATES: Record<string, RegionInfo> = {
  all: {
    key: 'all',
    label: '지역',
    center: { lat: 37.54699, lng: 127.09598 }, // 서울 강남역 (기본값)
    defaultZoom: 10,
  },
  seoul: {
    key: 'seoul',
    label: '서울',
    center: { lat: 37.5663, lng: 126.9779 }, // 서울시청 기준
    defaultZoom: 11,
  },
  busan: {
    key: 'busan',
    label: '부산',
    center: { lat: 35.1796, lng: 129.0756 }, // 부산시청 기준
    defaultZoom: 11,
  },
  incheon: {
    key: 'incheon',
    label: '인천',
    center: { lat: 37.4563, lng: 126.7052 }, // 인천시청 기준
    defaultZoom: 11,
  },
  ulsan: {
    key: 'ulsan',
    label: '울산',
    center: { lat: 35.5384, lng: 129.3114 },
    defaultZoom: 11,
  },
  pohang: {
    key: 'pohang',
    label: '포항',
    center: { lat: 36.019, lng: 129.3435 },
    defaultZoom: 11,
  },
  gwangju: {
    key: 'gwangju',
    label: '광주',
    center: { lat: 35.1595, lng: 126.8526 },
    defaultZoom: 11,
  },
  daejeon: {
    key: 'daejeon',
    label: '대전',
    center: { lat: 36.3504, lng: 127.3845 },
    defaultZoom: 11,
  },
};
/**
 * 지역 키 배열 (순서대로)
 */
export const REGION_KEYS = Object.keys(REGION_COORDINATES) as Array<
  keyof typeof REGION_COORDINATES
>;

/**
 * 지역 정보 배열 (드롭다운에서 사용)
 */
export const REGIONS: RegionInfo[] = REGION_KEYS.map(
  key => REGION_COORDINATES[key]
);

/**
 * 지역 키로 지역 정보 조회
 */
export const getRegionInfo = (regionKey: string): RegionInfo | null => {
  return REGION_COORDINATES[regionKey] || null;
};

/**
 * 유효한 지역 키인지 검증
 */
export const isValidRegionKey = (regionKey: string): boolean => {
  return regionKey in REGION_COORDINATES;
};
