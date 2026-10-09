import type { ResponseLikeLpDTO } from "../types/likes";
import type { RequestLpDTO } from "../types/lp";
import { axiosInstance } from "./axios";

export const postlike = async ({lpId} : RequestLpDTO) : Promise<ResponseLikeLpDTO> => {
    const { data } = await axiosInstance.post(`v1/lps/${lpId}/likes`);

    return data;
}

export const deleteLike = async ({lpId} : RequestLpDTO) : Promise<ResponseLikeLpDTO> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

    return data;
}