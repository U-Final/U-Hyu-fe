import { BARCODE_ENDPOINTS } from '@barcode/api/endpoints';

import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';

export const postUploadBarcodeImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await client.post<ApiResponse<string>>(
    BARCODE_ENDPOINTS.IMAGE,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return res.data.data;
};

export const getBarcodeImage = async (): Promise<string> => {
  const res = await client.get<ApiResponse<string>>(BARCODE_ENDPOINTS.IMAGE);

  return res.data.data;
};
