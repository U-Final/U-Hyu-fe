export interface UserInfoProps {
  name: string;
  nickname: string;
  gender: '남성' | '여성';
  age: number;
  email: string;
  onEdit: () => void;
}
