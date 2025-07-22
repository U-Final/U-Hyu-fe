const BENEFIT = '/brand-list';

export const BENEFIT_ENDPOINTS = {
  BENEFIT: {
    ROOT: BENEFIT,
    DETAIL_MSW: '/brand-list/:brandId',
    DETAIL: (brandId: number) => `${BENEFIT}/${brandId}`,
  },
};