const BENEFIT = '/brand-list';

export const BENEFIT_ENDPOINTS = {
  BENEFIT: {
    ROOT: BENEFIT,
    DETAIL: (brandId: number) => `${BENEFIT}/${brandId}`,
  },
};