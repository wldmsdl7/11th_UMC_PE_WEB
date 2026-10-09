import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { updateMyInfo } from '../../api/auth';
import type { RequestMyInfoDTO } from '../../types/auth';
import type { User } from '../../types/user';

export function useUpdateMyInfo() {
  return useMutation({
    mutationFn: (newInfo: RequestMyInfoDTO) => updateMyInfo(newInfo),

    onMutate: async (newInfo: RequestMyInfoDTO) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });
      const previousData = queryClient.getQueryData<User>(["user"]);

      queryClient.setQueryData<User>(["user"], (old) => {
        if (!old) return old;

        const updatedUser: User = { ...old };
        (Object.keys(newInfo) as (keyof RequestMyInfoDTO)[]).forEach((key) => {
          if (key in updatedUser) {
            // @ts-ignore
            updatedUser[key] = newInfo[key];
          }
        });

        return updatedUser;
      });

      return { previousData };
    },

    onError: (err, newInfo, context) => {
      // context가 undefined일 수도 있으므로 안전하게 체크
      if (context?.previousData) {
        queryClient.setQueryData(["user"], context.previousData);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}