import { useQuery } from "@tanstack/react-query";
import type { PaginationDTO } from "../../types/common";
import { getLpList } from "../../api/lp";
import { QUERY_KEY } from "../../constants/keys";


function useGetLpList ({cursor, search, order, limit} : PaginationDTO) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, order, limit],
        queryFn: ()=>getLpList({limit, order}),
        staleTime : 1000*60*5, // 5분
        gcTime : 1000*60*10, // 10분
        
    });
}

export default useGetLpList;

