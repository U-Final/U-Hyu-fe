export interface UserInfo {
  userName: string;
  grade: string;
}

export interface NearbyStore {
  store_name: string;
  addr_detail: string;
  description: string;
  logoImage?: string;
  latitude?: number;
  longitude?: number;
  isFavorite?: boolean;
}

export interface Benefit {
  benefit_type: 'DISCOUNT' | 'GIFT';
  description: string;
  logoImage?: string;
}

export interface Recommendation {
  brand_id: number;
  brand_name: string;
  benefit_title: string;
  description: string;
  logoImage: string;
  tags: string[];
}
