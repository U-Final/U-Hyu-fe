import { BRANDS } from '../constants/brands';
import { MEMBERSHIP_GRADES } from '../constants/membership';

export function getBrandById(id: string) {
  return BRANDS.find((brand) => brand.id === id);
}

export function getBrandNamesByIds(ids: string[]): string {
  return (
    ids
      .map((id) => getBrandById(id)?.name)
      .filter(Boolean)
      .join(', ') || '없음'
  );
}

export function getMembershipGradeLabel(value: string): string {
  return MEMBERSHIP_GRADES.find((grade) => grade.value === value)?.label || 'VVIP';
}
