import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/keys";
import { deleteComment } from "../../api/comments";

export function useDeleteComment(lpId: number) {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      alert("댓글 삭제 완료!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패", error);
      alert("댓글 삭제 실패!");
    },
  });
}