import { addMyMap } from '@mymap/api/mymapApi';
import { useMutation } from '@tanstack/react-query';

export const useAddMyMapMutation = () => {
  return useMutation({
    mutationFn: addMyMap,
  });
};
