import { BARCODE_IMAGE_QUERY_KEY } from '@barcode/api/barcode.type';
import { getBarcodeImage } from '@barcode/api/image-upload/barcodeImageApi';
import { useQuery } from '@tanstack/react-query';

const hasStatusCode = (error: unknown): error is { statusCode: number } => {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
};

export const useBarcodeImageQuery = () => {
  return useQuery({
    queryKey: BARCODE_IMAGE_QUERY_KEY,
    queryFn: getBarcodeImage,
    staleTime: 0,
    retry: (failureCount, error) => {
      if ((hasStatusCode(error) && error.statusCode === 4103) || failureCount >= 1) {
        return false;
      }
      return true;
    },
    retryDelay: 1000,
    meta: {
      suppressErrorToast: true,
    },
  });
};
