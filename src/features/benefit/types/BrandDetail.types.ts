export interface BrandDetail {
  brand_id: number;
  brand_name: string;
  logo_url: string;
  benefits: {
    grade: string;
    description: string;
  }[];
  usage_limit: string;
  usage_method: string;
}