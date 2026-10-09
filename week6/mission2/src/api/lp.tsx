import type { PaginationDTO } from "../types/common";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDTO : PaginationDTO) => {
    const {data} = await axiosInstance.get("/v1/lps", {
        params: paginationDTO,
    });
    return data;
};

export const getLpDetail = async (lpId: number) => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`)
    return data;
}