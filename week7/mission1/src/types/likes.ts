import type { CommonResponse } from "./common";

export type ResponseLikeLpDTO = CommonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>

