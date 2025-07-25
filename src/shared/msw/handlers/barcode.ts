import { BARCODE_ENDPOINTS } from '@barcode/api/endpoints';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

export const barcodeHandlers = [
  http.post(BARCODE_ENDPOINTS.IMAGE, async ({ request }) => {
    const formData = await request.formData();
    const image = formData.get('image');

    const shouldFail = false;
    if (shouldFail || !image) {
      return createErrorResponse('이미지 업로드 실패', 400);
    }

    return createResponse(
      'https://cdn.mock-barcode.com/test-barcode.png',
      '바코드 이미지가 저장되었습니다.'
    );
  }),
];
