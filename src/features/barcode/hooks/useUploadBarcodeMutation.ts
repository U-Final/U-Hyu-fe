import { postUploadBarcodeImage } from '@barcode/api/image-upload/barcodeImage.Api';
import { useMutation } from '@tanstack/react-query';

export const useUploadBarcodeMutation = () => {
  return useMutation({
    mutationFn: postUploadBarcodeImage,
  });
};
