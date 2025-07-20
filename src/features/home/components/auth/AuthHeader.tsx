import type { ApiErrorResponse } from "@/shared/client/ApiErrorResponse";
import { useUserInfoQuery } from "@home/hooks/useUserInfo";

export const AuthHeader = () => {
  const { data: user, isLoading, error } = useUserInfoQuery();
  
  if (isLoading) return <p>로딩 중...</p>;
  if (!user) {
    const apiError = error as ApiErrorResponse;
    return <p>❌ 에러 발생: {apiError.message}</p>;
  }
  
  return (
    <div>
      <h2>{user.user_name}님, 안녕하세요!</h2>
      <p>당신의 등급: {user.grade}</p>
    </div>
  );
};
