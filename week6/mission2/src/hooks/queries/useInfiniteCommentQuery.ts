import { useInfiniteQuery } from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../../enums/common";
import { getComments } from "../../api/comment";

export function useGetInfiniteComments(
  lpId: number,
  order: PAGINATION_ORDER,
  limit: number
) {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam }) =>
      getComments(lpId, pageParam, limit, order),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage,allPages);

        return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}