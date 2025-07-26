export interface LocationParams {
  lat: number;
  lon: number;
  radius: number;
}

export interface NearbyStore {
  store_id: number;
  store_name: string;
}

export const BARCODE_IMAGE_QUERY_KEY = ['barcodeImage'] as const;
