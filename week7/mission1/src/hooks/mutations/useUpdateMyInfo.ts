import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { updateMyInfo } from '../../api/auth';
import type { RequestMyInfoDTO } from '../../types/auth';

export function useUpdateMyInfo() {
  return useMutation({
    mutationFn: (newInfo : RequestMyInfoDTO) => updateMyInfo(newInfo),
    onSuccess: () => {
      alert("프로필 수정 완료!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("프로필 수정 실패", error);
      alert("댓프로필글 수정 실패!");
    },
  });
}