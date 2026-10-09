import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../api/likes";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/keys";

export function useDeleteLike(){
    return useMutation({
        mutationFn: deleteLike,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps],
                // exact : true - 위에 정의해둔 쿼리키가 모두 일치할 때만 무효화 (즉, ["lps", lpId]면 무효화 X, ["lps"]만 무효화)
                exact: false, 
            });
        },
    })
}


