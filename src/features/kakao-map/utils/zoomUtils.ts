export const getSearchRadiusByZoomLevel = (zoomLevel: number): number => {
  if (zoomLevel <= 4) return 1000;
  if (zoomLevel <= 5) return 2000;
  if (zoomLevel <= 6) return 4000;
  if (zoomLevel <= 7) return 8000;
  if (zoomLevel <= 8) return 20000;
  return 20000;
};
