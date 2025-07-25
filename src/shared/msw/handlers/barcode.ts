import { BARCODE_ENDPOINTS } from '@barcode/api/endpoints';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

let barcodeImageUrl: string | null = null; // 이미지 상태 저장용 (mock DB)

export const barcodeHandlers = [
  // ✅ 바코드 이미지 조회 (GET /barcode)
  http.get(BARCODE_ENDPOINTS.IMAGE, () => {
    if (!barcodeImageUrl) {
      return createErrorResponse('바코드가 존재하지 않습니다', 404);
    }
    return createResponse(barcodeImageUrl, '바코드 이미지 조회 성공');
  }),

  // ✅ 바코드 이미지 업로드 (POST /barcode)
  http.post(BARCODE_ENDPOINTS.IMAGE, async ({ request }) => {
    const formData = await request.formData();
    const image = formData.get('image');

    const shouldFail = false;
    if (shouldFail || !image) {
      return createErrorResponse('이미지 업로드 실패', 400);
    }

    barcodeImageUrl = 'https://cdn.mock-barcode.com/test-barcode.png'; // 저장된 이미지
    return createResponse(barcodeImageUrl, '바코드 이미지가 저장되었습니다.');
  }),

  // ✅ 바코드 이미지 수정 (PATCH /barcode)
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
