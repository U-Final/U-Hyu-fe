export interface Store {
  storeId: number; // 매장 고유 식별자 (숫자)
  storeName: string; // 매장 이름
  categoryName: string; // 카테고리 이름 (백엔드에서 정규화됨)
  addressDetail: string; // 매장 상세 주소
  benefit: string; // 매장 혜택 정보
  logo_image: string; // 브랜드 로고 이미지 URL
  brandName: string; // 브랜드 이름 (백엔드에서 정규화됨)
  latitude: number; // 위도
  longitude: number; // 경도
}
export interface FilterOption {
  key: string;
  label: string;
}
