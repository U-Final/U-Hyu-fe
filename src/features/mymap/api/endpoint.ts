const MYMAP = '/mymap';

export const MYMAP_ENDPOINTS = {
  MYMAP: {
    ROOT: MYMAP,
    LIST: `${MYMAP}/list`,
    DELETE: (myMapListId: number) => `/mymap/${myMapListId}`,
    DELETE_MSW: (myMapListId: number | string = ':myMapListId') =>
      `/mymap/${myMapListId}`,
    VIEW: (uuid: string) => `/mymap/${uuid}`,
    VIEW_MSW: (uuid: string = ':uuid') => `/mymap/${uuid}`,
    STATE: (store_id: number) => `/mymap/list/${store_id}`,
    STATE_MSW: (store_id: number | string = ':store_id') =>
      `/mymap/list/${store_id}`,
    TOGGLE_STORE: (myMapListId: number, store_id: number) =>
      `/mymap/${myMapListId}/store/${store_id}`,
    TOGGLE_STORE_MSW: (
      myMapListId: number | string = ':myMapListId',
      store_id: number | string = ':store_id'
    ) => `/mymap/${myMapListId}/store/${store_id}`,
  },
};
