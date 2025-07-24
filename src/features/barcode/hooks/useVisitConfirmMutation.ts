import { postVisitStore } from '@barcode/api/visitStoreApi';
import { useMutation } from '@tanstack/react-query';

export const useVisitConfirmMutation = () => {
  return useMutation({
    mutationFn: postVisitStore,
  });
};
