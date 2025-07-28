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
 */
export const REGION_COORDINATES: Record<string, RegionInfo> = {
  all: {
    key: 'all',
    label: '지역',
    center: { lat: 37.54699, lng: 127.09598 }, // 서울 강남역 (기본값)
    defaultZoom: 10,
  },
  seoul: {
    key: 'seoul',
    label: '서울',
    center: { lat: 37.5665, lng: 126.978 }, // 서울 중심 (명동)
    defaultZoom: 11,
  },
  gyeonggi: {
    key: 'gyeonggi',
    label: '경기',
    center: { lat: 37.4138, lng: 127.5183 }, // 수원시
    defaultZoom: 10,
  },
  incheon: {
    key: 'incheon',
    label: '인천',
    center: { lat: 37.4563, lng: 126.7052 }, // 인천 중구
    defaultZoom: 11,
  },
  busan: {
    key: 'busan',
    label: '부산',
    center: { lat: 35.1796, lng: 129.0756 }, // 부산 중구
    defaultZoom: 11,
  },
  jeju: {
    key: 'jeju',
    label: '제주',
    center: { lat: 33.4996, lng: 126.5312 }, // 제주시
    defaultZoom: 10,
  },
  gangwon: {
    key: 'gangwon',
    label: '강원',
    center: { lat: 37.8228, lng: 128.1555 }, // 춘천시
    defaultZoom: 9,
  },
  chungcheong: {
    key: 'chungcheong',
    label: '충청',
    center: { lat: 36.5184, lng: 126.8 }, // 대전 중구
    defaultZoom: 10,
  },
  jeollanam: {
    key: 'jeollanam',
    label: '전라',
    center: { lat: 35.1595, lng: 126.8526 }, // 광주 동구
    defaultZoom: 10,
  },
  gyeongsang: {
    key: 'gyeongsang',
    label: '경상',
    center: { lat: 35.8714, lng: 128.6014 }, // 대구 중구
    defaultZoom: 10,
  },
  jeonbuk: {
    key: 'jeonbuk',
    label: '전북',
    center: { lat: 35.8242, lng: 127.148 }, // 전주시
    defaultZoom: 10,
  },
  jeonnam: {
    key: 'jeonnam',
    label: '전남',
    center: { lat: 34.8679, lng: 126.991 }, // 목포시
    defaultZoom: 9,
  },
  gyeongbuk: {
    key: 'gyeongbuk',
    label: '경북',
    center: { lat: 36.4919, lng: 128.8889 }, // 안동시
    defaultZoom: 9,
  },
} as const;

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
