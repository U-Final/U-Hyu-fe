import { useUser } from '@/shared/store/userStore';

const LoggedInContent = () => {
  const user = useUser();
  return (
    <div>
      <p>{user?.userName}님 반가워요!</p>
      <p>등급: {user?.grade}</p>
      <p>유저 롤: {user?.role}</p>
      <img src={user?.profileImage} alt="프로필 이미지" />
    </div>
  );
};

export default LoggedInContent;
