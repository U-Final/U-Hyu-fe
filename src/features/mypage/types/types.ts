export type UserGrade = 'VVIP' | 'VIP' | 'GOOD';

export interface UserInfo {
  name: string;
  nickname: string;
  gender: string;
  age: number;
  email: string;
  updatedAt: string;
  grade: UserGrade;
  profileImage: string;
  favoriteBrands: string[];
  markers: string[];
}
