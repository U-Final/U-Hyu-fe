export interface Store {
  storeId: number;
  storeName: string;
  categoryName: string;
  addressDetail: string;
  benefit: string;
  logoImage: string;
  brandName: string;
  brandId?: number;
  latitude: number;
  longitude: number;
}
export interface FilterOption {
  key: string;
  label: string;
}
