import { useMutation } from "@tanstack/react-query";
import { postlike } from "../../api/likes";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/keys";

export function usePostLike(){
    return useMutation({
        mutationFn: postlike,
        // data : API 성공 응답 데이터
        // variables : mutate에 전달한 값
        // context : onMutate에서 반환한 값
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, data.data.lpId],
                exact: true, 
                /**
                 * exact : true - 위에 정의해둔 쿼리키가 모두 일치할 때만 무효화 
                 *      즉, ["lps", lpId]면 무효화 X, ["lps"]만 무효화
                 */
            });
        },

        // error : 요청 실패시 발생한 에러
        // variables : muate에 전달한 값
        // context : onMutate에서 반환한 값
        onError: () => {},
        // 요청 직전에 실행되는 함수, Optimistic Update를 구현할 때 유용
        onMutate: () => {},
        // 요청이 끝난 후 항상 실행됨 (onSuccess, onError 후에 실행됨), 로딩 상태를 초기화할 때 유용
        onSettled: () => {}
    })
}


