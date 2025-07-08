import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@shared/store/userStore';
import { authService } from '@features/auth/authService';
import { type SignupData, type ProfileUpdateData } from '@features/auth/auth.type';

export const useAuthActions = () => {
  const queryClient = useQueryClient();
  const { setCredentials, removeCredentials, updateProfile: updateStoreProfile } = useUserStore();

  // 회원가입 뮤테이션
  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      setCredentials(data.user);
      queryClient.invalidateQueries({ queryKey: ['auth'] as const });
    },
  });

  // 로그아웃 뮤테이션
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      removeCredentials();
      queryClient.clear();
    },
    onError: () => {
      // 서버 에러여도 로컬 정리
      removeCredentials();
      queryClient.clear();
    },
  });

  // 프로필 업데이트 뮤테이션
  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      updateStoreProfile(data.user);
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] as const });
    },
  });

  // 회원 탈퇴 뮤테이션
  const deleteAccountMutation = useMutation({
    mutationFn: authService.deleteAccount,
    onSuccess: () => {
      removeCredentials();
      queryClient.clear();
    },
  });

  const signup = useCallback(
    (userData: SignupData) => {
      return signupMutation.mutateAsync(userData);
    },
    [signupMutation]
  );

  const logout = useCallback(() => {
    return logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const updateProfile = useCallback(
    (profileData: ProfileUpdateData) => {
      return updateProfileMutation.mutateAsync(profileData);
    },
    [updateProfileMutation]
  );

  const deleteAccount = useCallback(() => {
    return deleteAccountMutation.mutateAsync();
  }, [deleteAccountMutation]);

  return {
    // 액션 함수들
    signup,
    logout,
    updateProfile,
    deleteAccount,

    // 로딩 상태들
    isSigningUp: signupMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,

    // 에러 상태들
    signupError: signupMutation.error,
    logoutError: logoutMutation.error,
    updateProfileError: updateProfileMutation.error,
    deleteAccountError: deleteAccountMutation.error,
  };
};
