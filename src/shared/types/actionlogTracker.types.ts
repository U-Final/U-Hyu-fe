export interface UserAction {
  actionType: 'MARKER_CLICK' | 'FILTER_USED';
  storeId?: number | null;
  categoryId?: number | null;
}

export interface CounterData {
  markerClicks: Record<number, number>;
  filterClicks: Record<number, number>;
}
