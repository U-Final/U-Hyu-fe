import { type UserInfo } from '@mypage/api';

interface Props {
  user: UserInfo;
}

const MyPageUserInfo = ({ user }: Props) => {
  return (
    <div>
      <p>닉네임 : {user.nickname}</p>
      <p>등급 : {user.grade}</p>
      <p>수정일 : {user.updatedAt}</p>
    </div>
  );
};

export default MyPageUserInfo;
