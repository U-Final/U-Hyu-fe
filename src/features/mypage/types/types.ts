import type { UserInfo as BaseUserInfo, UserGrade } from '@/features/user';

export interface UserInfo extends BaseUserInfo {
  favoriteBrands: string[];
  markers: string[];
}

export type { UserGrade };
