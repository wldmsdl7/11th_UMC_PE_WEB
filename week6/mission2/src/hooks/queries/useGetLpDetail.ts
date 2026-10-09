import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../api/lp";

function useGetLpDetail (lpId: number) {
    return useQuery({
        queryKey: [lpId],
        queryFn: ()=>getLpDetail(lpId),
        staleTime : 1000*60*5, // 5분
        gcTime : 1000*60*10, // 10분
        
    });
}

export default useGetLpDetail;

