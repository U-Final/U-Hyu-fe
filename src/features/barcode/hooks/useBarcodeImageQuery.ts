import { BARCODE_IMAGE_QUERY_KEY } from '@barcode/api/barcode.type';
import { getBarcodeImage } from '@barcode/api/image-upload/barcodeImageApi';
import { useQuery } from '@tanstack/react-query';

// API 에러 타입 가드
const hasStatusCode = (error: unknown): error is { statusCode: number } => {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
};

export const useBarcodeImageQuery = () => {
  return useQuery({
    queryKey: BARCODE_IMAGE_QUERY_KEY,
    queryFn: getBarcodeImage,
    staleTime: 0, //업로드 후 반영
    retry: (failureCount, error) => {
      // 바코드 이미지가 없는 경우(4103) 또는 서버 연결 실패는 재시도하지 않음
      if ((hasStatusCode(error) && error.statusCode === 4103) || failureCount >= 1) {
        return false;
      }
      return true;
    },
    retryDelay: 1000,
    // 에러가 발생해도 전역 에러 핸들러에서 토스트를 표시하지 않도록 설정
    meta: {
      suppressErrorToast: true,
    },
  });
};
