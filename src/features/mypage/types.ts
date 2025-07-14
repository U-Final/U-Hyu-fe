export interface UserInfo {
  userName: string;
  nickName: string;
  email: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  grade: 'VVIP' | 'VIP' | 'GENERAL';
  profileImage: string;
  updatedAt: string;
}
