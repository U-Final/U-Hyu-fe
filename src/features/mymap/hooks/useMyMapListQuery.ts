import { useQuery } from "@tanstack/react-query";
import { getMyMapList } from "../api/mymapApi";
import type { MyMapListRes } from "../api/types";

export const useMyMapListQuery = () => {
  return useQuery<MyMapListRes[]>({
    queryKey: ['mymaplist'],
    queryFn: getMyMapList,
  });
};
