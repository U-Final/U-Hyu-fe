const BENEFIT = '/brand-list';

export const BENEFIT_ENDPOINTS = {
  BENEFIT: {
    ROOT: BENEFIT,
    DETAIL: (brandId: number) => `/brand-list/${brandId}`,
    DETAIL_MSW: (brandId: number | string = ':brandId') =>
      `/brand-list/${brandId}`,
  },
};
