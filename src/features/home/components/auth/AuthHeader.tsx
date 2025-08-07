import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { useUserInfoQuery } from "@home/hooks/useUserInfoQuery";

export const AuthHeader = () => {
  const { data: user, isLoading, error } = useUserInfoQuery();
  
  if (isLoading) return <p>로딩 중...</p>;
  if (!user) {
    return <p>❌ 에러 발생: {getErrorMessage(error)}</p>;
  }
  
  return (
    <div>
      <h2>{user.userName}님, 안녕하세요!</h2>
      <p>당신의 등급: {user.grade}</p>
    </div>
  );
};
