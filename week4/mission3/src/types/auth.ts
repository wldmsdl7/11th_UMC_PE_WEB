import type { CommonResponse } from "./common";

// 회원가입
export type RequestSignupDTO = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
}

export type ResponseSignupDTO = CommonResponse<{
    "id": number,
    "name": string,
    "email": string,
    "bio": string | null,
    "avatar": string | null,
    "createdAt": Date,
    "updatedAt": Date
  }>

  // 로그인
  export type RequestLoginDTO = {
    email: string;
    password: string;
  }

  export type ResponseLoginDTO = CommonResponse<{
    "id": number,
    "name": string,
    "accessToken": string,
    "refreshTokken": string
  }>;

  export type LoginStatusResponseDTO = CommonResponse< {
    id: number;
    name: string;
    email: string;
}>

  // 내 정보 조회
  export type ResponseMyInfoDTO = CommonResponse<{
    "id": number,
    "name": string,
    "email": string,
    "bio": string | null,
    "avatar": string | null,
    "createdAt": Date,
    "updatedAt": Date
  }>

