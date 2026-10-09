import type { RequestLoginDTO, RequestSignupDTO } from "../types/auth"
import { axiosInstance } from "./axios";

export const postSignup = async (body: RequestSignupDTO) => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);

    return data;
}

export const postLogin = async (body: RequestLoginDTO) => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);

    return data;
}

export const getMyInfo = async() => {
    const { data } = await axiosInstance.get("/v1/users/me");
    return data;
} 

export const postLogout = async () => {
    const {data} = await axiosInstance.post("/v1/auth/signout");
    return data;
}