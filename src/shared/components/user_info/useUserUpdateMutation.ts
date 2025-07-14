import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@user/api/userApi';

interface UpdateUserRequest {
  nickname: string;
  age: number; 
  email: string;
}

export const useUserUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      await userApi.updateUserInfo(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
