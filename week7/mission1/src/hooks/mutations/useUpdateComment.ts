import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/keys";
import { updateComment } from "../../api/comments";

export function useUpdateComment(lpId: number) {
  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(lpId, commentId, content),
    onSuccess: () => {
      alert("댓글 수정 완료!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, lpId],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("댓글 수정 실패", error);
      alert("댓글 수정 실패!");
    },
  });
}