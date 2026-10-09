import type { PaginationDTO } from "../types/common";
import type { newLp, RequestUpdateLpDTO } from '../types/lp';
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

export const addLp = async (newLp: newLp) => {
    const { data } = await axiosInstance.post("/v1/lps", newLp);
    return data;
}

export const deleteLp = async (lpId: number) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`)
    return data;
}

export const updateLp = async (lpId: number, updateData : RequestUpdateLpDTO) => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, updateData)
    return data;
}
