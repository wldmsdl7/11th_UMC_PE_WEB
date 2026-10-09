import type { PAGINATION_ORDER } from "../enums/common";
import { axiosInstance } from "./axios";

export const getComments = async (lpId: number, pageParam:number, limit: number, order: PAGINATION_ORDER) =>  {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      page: pageParam,
      limit,
      order,
    },
  });
  return data;
}