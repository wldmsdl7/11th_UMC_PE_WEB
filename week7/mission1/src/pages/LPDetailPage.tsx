import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { MdDeleteOutline, MdOutlineEdit, MdClose } from "react-icons/md";
import useGetLPDetail from "../hooks/queries/useGetLpDetail";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { Likes } from "../types/lp";
import { PAGINATION_ORDER } from "../enums/common";
import { useGetInfiniteComments } from "../hooks/queries/useInfiniteCommentQuery";
import { CommentSkeleton } from "../components/Comment/CommentSkeleton";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useGetMyInfo from "../hooks/queries/useGetUserInfo";
import { useAuth } from "../context/AuthContext";
import { usePostLike } from "../hooks/mutations/usePostLike";
import { useDeleteLike } from "../hooks/mutations/useDeleteLike";
import { usePostComment } from '../hooks/mutations/usePostComment';
import { useUpdateComment } from '../hooks/mutations/useUpdateComment';
import { useDeleteComment } from '../hooks/mutations/useDeleteComment';
import { Comment } from '../components/Comment/Comment';
import { useUpdateLp } from '../hooks/mutations/useUpdateLp';
import { useDeleteLp } from '../hooks/mutations/useDeleteLp';

export default function LPDetailPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);
  const [commentInput, setCommentInput] = useState("");
  const { accessToken } = useAuth();

  const { data: lp, isLoading, isError } = useGetLPDetail(Number(lpId));

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetInfiniteComments(Number(lpId), order, 10);

  const { ref, inView } = useInView({ threshold: 0 });
  const skeletonCount = 5;

  const {data: me} = useGetMyInfo({enabled: !! accessToken});

  const [isEditingLp, setIsEditingLp] = useState(false);
  const [lpTitle, setLpTitle] = useState(lp?.data.title || "");
  const [lpContent, setLpContent] = useState(lp?.data.content || "");
  const [lpImage, setLpImage] = useState(lp?.data.thumbnail || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * mutate : 비동기 요청을 실행하고, 콜백 함수를 이용해 후속 작업을 처리
   * mutateAsync : Promise를 반환해서 await 사용 가능
   */
  const {mutate : likeMutate} = usePostLike();
  const {mutate: dislikeMutate} = useDeleteLike();
  const {mutate : addCommentMutate} = usePostComment(Number(lpId));
  const {mutate : editCommentMutate} = useUpdateComment(Number(lpId));
  const {mutate : deleteCommentMutate} = useDeleteComment(Number(lpId));
  const {mutate : editLpMutate} = useUpdateLp(Number(lpId));
  const {mutate : deleteLpMutate} = useDeleteLp(Number(lpId));

  const isLiked : boolean = lp?.data?.likes.
      map((like : Likes) => like.userId)
      .includes(me?.data.id as number)

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");


  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (lp?.data) {
      setLpTitle(lp.data.title);
      setLpContent(lp.data.content);
      setLpImage(lp.data.thumbnail || "");
    }
  }, [lp]);

  const handleLpClick = () => {
    if (isEditingLp) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLpImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!commentInput.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    handleAddComment(commentInput);
    setCommentInput("");
  };

  const handleLikeLp = () => {
    likeMutate({lpId : Number(lpId)});
  }

  const handleDislikeLp = () => {
    dislikeMutate({lpId : Number(lpId)});
  }

  const handleAddComment = (commentInput: string) => {
    addCommentMutate(commentInput)
  }

  const handleEditComment = (commentId: number) => {
    if(!editingContent.trim()) {
      alert(`댓글 내용을 입력해주세요.`);
      return;
    }

    editCommentMutate({commentId, content: editingContent})
  }

  const handleDeleteComment = (commentId: number) => {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      deleteCommentMutate({ lpId: Number(lpId), commentId });
    }
  }

  const handleEditLp = () => {
    if (!isEditingLp) {
      setIsEditingLp(true);
      return;
    }
    if (!lpTitle.trim() || !lpContent.trim()) return alert("제목과 내용을 입력해주세요.");
    
    editLpMutate({
      title: lpTitle || lp?.data.title,
      content: lpContent || lp?.data.content,
      thumbnail: lpImage || undefined, 
      tags: lp?.data.tags?.length ? lp.data.tags : [],
      published: lp?.data.published ?? true, 
      
    })
    setIsEditingLp(false);
  };

  const handleDeleteLp = () => {
  if (confirm("정말로 이 LP를 삭제하시겠습니까?")) {
    deleteLpMutate(Number(lpId));
  }
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

      {/* LP판 영역 */}
<div className="relative w-80 h-80 flex-shrink-0">
  <div 
    className="relative w-full h-full rounded-full overflow-hidden bg-gray-800 shadow-2xl cursor-pointer"
    onClick={handleLpClick} // 클릭 시 파일 선택
  >
    {lpImage ? (
      <img
        src={lpImage} // 수정된 이미지 반영
        alt={lpTitle}
        className="w-full h-full object-cover object-center"
      />
    ) : (
      <div className="text-gray-400 flex items-center justify-center h-full">
      </div>
    )}

    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="w-16 h-16 bg-black rounded-full opacity-80 shadow-inner" />
    </div>
  </div>

  {/* 숨겨진 input */}
  <input
    type="file"
    ref={fileInputRef}
    className="hidden"
    accept="image/*"
    onChange={handleFileChange}
  />
</div>
      {/* LP 내용 영역 */}
<div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-md mt-6 flex flex-col gap-4">
  <p className="text-gray-400 text-sm">
    작성자: {lp?.data.author.name || "알 수 없음"}
  </p>

  {/* 편집 모드이면 input/textarea 보여주기 */}
  {isEditingLp ? (
    <>
      <input
        type="text"
        value={lpTitle}
        onChange={(e) => setLpTitle(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-600"
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={lpContent}
        onChange={(e) => setLpContent(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-600 h-32 resize-none"
        placeholder="내용을 입력하세요"
      />
    </>
  ) : (
    <p className="text-gray-200">{lpContent}</p>
  )}
</div>
      <div className="flex gap-6 items-center">
      {/* 수정 버튼 */}
      {/* <button
        onClick={handleEditLp}
        className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
        title="수정"
      >
        <MdOutlineEdit size={22} />
        <span className="text-sm font-medium">
          {isEditingLp ? "저장" : "수정"}
        </span>
      </button> */}

      {/* 삭제 버튼 */}
      <button
        onClick={handleDeleteLp}
        className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition"
        title="삭제"
      >
        <MdDeleteOutline size={22} />
        <span className="text-sm font-medium">삭제</span>
      </button>

      {/* 좋아요 버튼 */}
      <button
        onClick={isLiked ? handleDislikeLp : handleLikeLp}
        className="flex items-center gap-2 text-gray-300 hover:text-pink-500 transition"
        title="좋아요"
      >
        {isLiked ? (
          <FaHeart size={22} /> ) : (
          <FaRegHeart size={22} />
          )
        }
        <span className="text-sm font-medium">좋아요</span>
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
            <Comment
              key={comment.id}
              comment={comment}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              editingContent={editingContent}
              setEditingContent={setEditingContent}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))
        )}

          {isFetchingNextPage &&
            Array.from({ length: skeletonCount }).map((_, i) => (
              <CommentSkeleton key={i} />
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