import { BARCODE_IMAGE_QUERY_KEY } from '@barcode/api/barcode.type';
import { getBarcodeImage } from '@barcode/api/image-upload/barcodeImageApi';
import { useQuery } from '@tanstack/react-query';

export const useBarcodeImageQuery = () => {
  return useQuery({
    queryKey: BARCODE_IMAGE_QUERY_KEY,
    queryFn: getBarcodeImage,
    staleTime: 0, //업로드 후 반영
  });
};
