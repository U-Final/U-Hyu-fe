import { BARCODE_IMAGE_QUERY_KEY } from '@barcode/api/barcode.type';
import { postUploadBarcodeImage } from '@barcode/api/image-upload/barcodeImage.Api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadBarcodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUploadBarcodeImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BARCODE_IMAGE_QUERY_KEY });
    },
  });
};
