import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/keys";
import { getMyInfo } from "../../api/auth";

export function useGetInfo() {
    return useQuery ({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
    });
}

