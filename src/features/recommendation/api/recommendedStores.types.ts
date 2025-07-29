export interface RecommendStore {
  store_id: number;
  store_name: string;
  category_name: string;
  brand_name: string;
  addr_detail: string;
  description: string;
  geom: string;
  logoImage: string;
  favorite_count?: number; // 선택적으로 포함 (있을 수도, 없을 수도 있음)
}
