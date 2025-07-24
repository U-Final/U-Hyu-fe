import { addMyMap } from '@mymap/api/mymapApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddMyMapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMyMap,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mymaplist'] });
    },
  });
};
