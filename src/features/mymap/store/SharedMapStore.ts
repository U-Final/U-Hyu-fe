import type { Store } from '@kakao-map/types/store';
import { create } from 'zustand';

interface SharedMapState {
  isMine: boolean;
  uuid: string | null;
  myMapListId: number | null;
  title: string;
  markerColor: string;
  stores: Store[];
  setSharedMap: (payload: {
    uuid: string;
    myMapListId: number;
    title: string;
    markerColor: string;
    isMine: boolean;
    stores: Store[];
  }) => void;
  clearSharedMap: () => void;
  addStore: (store: Store) => void;
  removeStore: (storeId: number) => void;
}

export const useSharedMapStore = create<SharedMapState>(set => ({
  isMine: false,
  uuid: null,
  myMapListId: null,
  title: '',
  markerColor: 'RED',
  stores: [],
  setSharedMap: payload => set({ ...payload }),
  clearSharedMap: () =>
    set({
      isMine: false,
      uuid: null,
      myMapListId: null,
      title: '',
      markerColor: 'RED',
      stores: [],
    }),
  addStore: store =>
    set(state => {
      if (state.stores.find(s => s.storeId === store.storeId)) return state;
      return { stores: [...state.stores, store] };
    }),
  removeStore: storeId =>
    set(state => ({
      stores: state.stores.filter(s => s.storeId !== storeId),
    })),
}));
