/**
 * 공통 사용자 관련 타입 정의
 * 중복 정의 방지를 위해 중앙화된 위치에서 관리
 * 
 * "profileImage": "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
        "userName": "한동찬",
        "nickName": null,
        "email": "ehdcks1256@kakao.com",
        "age": null,
        "gender": "MALE",
        "grade": null,
        "updatedAt": "2025-07-20T05:17:08.734511"
 */

// 기본 사용자 타입들
export type UserRole = 'USER' | 'ADMIN';
export type UserGrade = 'GOOD' | 'VIP' | 'VVIP';
export type UserGender = 'MALE' | 'FEMALE' | 'OTHER';

// 마커 관련 타입
export interface Marker {
  id: number;
  createdAt: string;
  updatedAt: string;
  markerImage: string;
}

// 기본 사용자 정보 인터페이스
export interface UserInfo {
  profileImage: string;
  userName: string;
  nickName: string | null;
  email: string;
  age: number | null;
  gender: UserGender | null;
  grade: UserGrade | null;
  updatedAt: string;
  role?: UserRole;
}

// API 응답용 사용자 정보
export interface UserInfoData {
  profileImage: string;
  userName: string;
  nickName: string | null;
  email: string;
  age: number | null;
  gender: UserGender | null;
  grade: UserGrade | null;
  interestedBrandList?: number[];
  updatedAt: string;
  role?: UserRole;
}

// 간단한 사용자 정보 (스토어용)
export interface SimpleUserInfo {
  userName: string;
  grade: UserGrade | null;
  profileImage: string;
  role?: UserRole;
}

// 사용자 정보 업데이트 요청
export interface UpdateUserRequest {
  updatedNickName?: string;
  updatedGrade?: UserGrade;
  updatedBrandIdList?: number[];
}

// 사용자 추가 정보 요청
export interface UserExtraInfoRequest {
  age: number;
  gender: UserGender;
  grade: UserGrade;
  recentBrands: number[];
  interestedBrands: number[];
}

// 이메일 중복 확인 요청
export interface CheckEmailRequest {
  email: string;
}
