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

export const addComment = async (lpId: number, content: string) => {
  const { data } = await axiosInstance.post(`v1/lps/${lpId}/comments`, { content })
  return data;
}

export const updateComment = async(lpId: number, commentId: number, content: string) => {
   const { data } = await axiosInstance.patch(`v1/lps/${lpId}/comments/${commentId}`, { content })
  return data;
}

export const deleteComment = async({lpId, commentId} : { lpId: number; commentId: number}) => {
   const { data } = await axiosInstance.delete(`v1/lps/${lpId}/comments/${commentId}`)
  return data;
}