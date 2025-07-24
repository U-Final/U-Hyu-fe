import { deleteMyMap } from "@mymap/api/mymapApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMyMapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMyMap,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mymaplist'] }),
  });
};
