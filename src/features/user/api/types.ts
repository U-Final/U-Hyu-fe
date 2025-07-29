// 공통 타입들은 @/shared/types에서 import하여 사용
export type {
  UserGrade,
  UserGender,
  UserRole,
  UserExtraInfoRequest,
  CheckEmailRequest,
} from '@/shared/types';

// UserInfomation은 UserInfoData로 통합 (기존 호환성 유지를 위해 alias 제공)
export type { UserInfoData as UserInfomation } from '@/shared/types';
