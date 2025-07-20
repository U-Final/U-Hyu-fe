import { useUserInfoQuery } from "@home/hooks/useUserInfo";

export const AuthHeader = () => {
  const { data: user, isLoading, isError } = useUserInfoQuery();
  
  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !user) return <p>로그인된 유저가 아닙니다.</p>;
  
  return (
    <div>
      <h2>{user.user_name}님, 안녕하세요!</h2>
      <p>당신의 등급: {user.grade}</p>
    </div>
  );
};
