export interface QueryParams {
  category: string;
  brand_name: string;
  storeType: 'ONLINE' | 'OFFLINE' | '' | null;
  benefitType: 'DISCOUNT' | 'GIFT' | '' | null;
  page: number;
  size: number;
}
