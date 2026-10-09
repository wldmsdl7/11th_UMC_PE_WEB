import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../api/auth";


function useGetMyInfo ({enabled = true} ) {
    return useQuery({
        queryKey: ["user"],
        queryFn: ()=>getMyInfo(),
        staleTime : 1000*60*5, // 5분
        gcTime : 1000*60*10, // 10분

        enabled
    });
}

export default useGetMyInfo;

