import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/keys";
import { deleteLp } from '../../api/lp';
import { useNavigate } from 'react-router-dom';


export function useDeleteLp(lpId: number) {
    const navigate = useNavigate();
    return useMutation({
    mutationFn: (lpId: number) => deleteLp(lpId),
    onSuccess: () => {
      alert("Lp 삭제 완료!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpId],
        exact: false,
      });
      navigate(-1);
    },
    onError: (error) => {
      console.error("LP 삭제 실패", error);
      alert("LP 삭제 실패!");
    },
  });
}