/**
 * 공통 타입들의 인덱스 파일
 * 모든 공통 타입을 여기서 re-export하여 일관된 import 경로 제공
 */

// 사용자 관련 타입들
export type {
  UserRole,
  UserGrade,
  UserGender,
  Marker,
  UserInfo,
  UserInfoData,
  SimpleUserInfo,
  UpdateUserRequest,
  UserExtraInfoRequest,
  CheckEmailRequest,
} from './user';
