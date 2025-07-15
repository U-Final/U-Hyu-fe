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
  favoriteBrands: string[]; //이미지 파일명들
  markers: string[];        //이미지 파일명들
}
