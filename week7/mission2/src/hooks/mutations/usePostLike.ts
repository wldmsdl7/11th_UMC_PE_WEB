import { useMutation } from "@tanstack/react-query";
import { postlike } from "../../api/likes";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/keys";
import type { Likes, ResponseLPDTO } from '../../types/lp';
import type { ResponseMyInfoDTO } from '../../types/auth';

export function usePostLike(){
    return useMutation({
        mutationFn: postlike,
         onMutate: async(lp) => {
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            });

            // 내가 눌렀던 좋아요
            const previousLpPost = queryClient. getQueryData<ResponseLPDTO> ([
                QUERY_KEY.lps,
                lp.lpId,
            ]);

            // onMutate의 반환값
            const newLpPost = {...previousLpPost}

            const me = queryClient.getQueryData<ResponseMyInfoDTO>([
                QUERY_KEY.myInfo
            ]);

            const userId = Number(me?.data.id);

            const likedIndex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;

            if(likedIndex >= 0) {
                previousLpPost?.data.likes.splice(likedIndex, 1)
            }else{
                const newLike = {userId, lpId: lp.lpId} as Likes;
                previousLpPost?.data.likes.push(newLike);
            }

            // 업데이트된 게시글 데이터를 캐시에 저장
            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return {previousLpPost, newLpPost};
        },

        onError: (err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLp.lpId],
                context?.previousLpPost?.data.id
            )
        },

        onSettled: async (data, error, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId]
            })
        }
    })
}


