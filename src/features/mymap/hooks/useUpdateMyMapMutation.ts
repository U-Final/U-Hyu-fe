import { useMutation} from '@tanstack/react-query';
import { updateMyMap } from '@mymap/api/mymapApi';

export const useUpdateMyMapMutation = () => {
  return useMutation({
    mutationFn: updateMyMap,
  });
};