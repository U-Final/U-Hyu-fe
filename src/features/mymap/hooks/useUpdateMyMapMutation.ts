import { updateMyMap } from '@mymap/api/mymapApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateMyMapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyMap,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mymaplist'] });
    },
  });
};
