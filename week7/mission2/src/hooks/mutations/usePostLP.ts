import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/keys";
import { addLp } from '../../api/lp';

export function usePostLP(){
    return useMutation({
        mutationFn: addLp,
        onSuccess: (data) => {
            console.log(`LP 등록 완료 !`, data);
            alert('LP 등록 완료 !');

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps],
                exact: false, 
                /**
                 * exact : true - 위에 정의해둔 쿼리키가 모두 일치할 때만 무효화 
                 *      즉, ["lps", lpId]면 무효화 X, ["lps"]만 무효화
                 */
            });
        },
        onError: (error: unknown) => {
            console.log(`LP 등록 실패 !`, error);
            alert('LP 등록 실패 !');
        }
    })
}