import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { addComment } from '../../api/comments';
import { QUERY_KEY } from '../../constants/keys';

export function usePostComment(lpId: number){
    return useMutation({
        mutationFn: (commentInput: string) => addComment(lpId, commentInput),
        onSuccess: (data) => {
            console.log(`댓글 등록 완료 !`, data);
            alert('댓글 등록 완료 !');

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lpComments,lpId],
                exact: false, 
                /**
                 * exact : true - 위에 정의해둔 쿼리키가 모두 일치할 때만 무효화 
                 *      즉, ["lps", lpId]면 무효화 X, ["lps"]만 무효화
                 */
            });
        },
        onError: (error: unknown) => {
            console.log(`댓글 등록 실패 !`, error);
            alert('댓글 등록 실패 !');
        }
    })
}