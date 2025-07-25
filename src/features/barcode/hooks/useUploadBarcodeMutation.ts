import { BARCODE_IMAGE_QUERY_KEY } from '@barcode/api/barcode.type';
import {
  patchBarcodeImage,
  postUploadBarcodeImage,
} from '@barcode/api/image-upload/barcodeImageApi';
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

export const usePatchBarcodeImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchBarcodeImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BARCODE_IMAGE_QUERY_KEY });
    },
  });
};
