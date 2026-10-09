import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { AiOutlineLike } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineEdit, MdClose } from "react-icons/md";
import useGetLPDetail from "../hooks/queries/useGetLpDetail";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import clsx from "clsx";
import type { ResponseLPDTO } from "../types/lp";
import { PAGINATION_ORDER } from "../enums/common";
import { useGetInfiniteComments } from "../hooks/queries/useInfiniteCommentQuery";
import { CommentSkeleton } from "../components/Comment/CommentSkeleton";

export default function LPDetailPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);
  const [commentInput, setCommentInput] = useState("");

  const { data, isLoading, isError } = useGetLPDetail(Number(lpId));
  const lp: ResponseLPDTO = data?.data ?? null;

  console.log(data);

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetInfiniteComments(Number(lpId), order, 10);

  const { ref, inView } = useInView({ threshold: 0 });
  const skeletonCount = 5;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmit = async () => {
    if (!commentInput.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }
    alert("댓글 등록 완료!");
    setCommentInput("");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !lp)
    return <ErrorMessage message="데이터를 불러올 수 없습니다." />;

  return (
    <div className="min-h-dvh bg-linear-to-b from-zinc-900 to-black text-white p-8 flex flex-col items-center gap-8">
      <button
        onClick={() => navigate(-1)}
        className="self-end text-gray-300 hover:text-white transition mb-4 flex items-center gap-2"
        title="이전"
      >
        <MdClose size={28} />
      </button>

      {/* LP 썸네일 */}
      <div className="relative w-80 h-80 rounded-full bg-gray-800 shadow-2xl flex items-center justify-center">
  {lp.thumbnail && (
    <img
      src={lp.thumbnail}
      alt={lp.title}
      className="w-full h-full object-cover rounded-full"
    />
  )}
  {/* CD 중앙 구멍 */}
  <div className="absolute w-16 h-16 bg-white rounded-full z-10 opacity-80" />
</div>

      {/* LP 내용 */}
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-md flex flex-col gap-4">
        <p className="text-gray-400 text-sm">
          작성자: {lp.author?.name || "알 수 없음"}
        </p>
        <p className="text-gray-200">{lp.content}</p>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
          <MdOutlineEdit />
        </button>
        <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition">
          <MdDeleteOutline />
        </button>
        <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">
          <AiOutlineLike />
        </button>
      </div>

      {/* 댓글 영역 */}
      <div className="w-full max-w-3xl mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold"> 💬 댓글</h2>

          {/* 정렬 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={clsx(
                "px-3 py-1 rounded font-medium transition",
                order === PAGINATION_ORDER.desc
                  ? "bg-pink-700 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              )}
            >
              최신순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={clsx(
                "px-3 py-1 rounded font-medium transition",
                order === PAGINATION_ORDER.asc
                  ? "bg-pink-700 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              )}
            >
              오래된순
            </button>
          </div>
        </div>

        {/* 댓글 작성란 */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-pink-700 hover:bg-pink-800 rounded-lg transition"
          >
            등록
          </button>
        </div>

        {/* 댓글 리스트 */}
        <div className="flex flex-col gap-4">
          {commentPages?.pages?.flatMap((page) =>
            page.data?.data?.map((comment: any) => (
              <div
                key={comment.id}
                className="bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2"
              >
                <p className="text-sm text-gray-400">
                  {comment.author?.name || "익명"} •{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-200">{comment.content}</p>
              </div>
            ))
          )}

          {isFetchingNextPage &&
            Array.from({ length: skeletonCount }).map((_, i) => (
              <CommentSkeleton />
            ))
          }
        </div>

        {/* 무한 스크롤 트리거 */}
        <div ref={ref} className="h-10 mt-6 flex justify-center items-center">
          {isFetching && <div>로딩 중 ...</div>}
        </div>
      </div>
    </div>
  );
}