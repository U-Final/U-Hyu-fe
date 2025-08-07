import { BARCODE_ENDPOINTS } from '@barcode/api/endpoints';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

let barcodeImageUrl: string | null = null;

export const barcodeHandlers = [
  http.get(BARCODE_ENDPOINTS.IMAGE, () => {
    if (!barcodeImageUrl) {
      return createErrorResponse('바코드가 존재하지 않습니다', 404);
    }
    return createResponse(barcodeImageUrl, '바코드 이미지 조회 성공');
  }),

  http.post(BARCODE_ENDPOINTS.IMAGE, async ({ request }) => {
    const formData = await request.formData();
    const image = formData.get('image');

    const shouldFail = false;
    if (shouldFail || !image) {
      return createErrorResponse('이미지 업로드 실패', 400);
    }

    barcodeImageUrl = 'https://cdn.mock-barcode.com/test-barcode.png';
    return createResponse(barcodeImageUrl, '바코드 이미지가 저장되었습니다.');
  }),

  http.patch(BARCODE_ENDPOINTS.IMAGE, async ({ request }) => {
    const formData = await request.formData();
    const image = formData.get('image');

    const shouldFail = false;
    if (shouldFail || !image) {
      return createErrorResponse('이미지 수정 실패', 400);
    }

    barcodeImageUrl = 'https://cdn.mock-barcode.com/test-barcode-patched.png';
    return createResponse(barcodeImageUrl, '바코드 이미지가 수정되었습니다.');
  }),
];
