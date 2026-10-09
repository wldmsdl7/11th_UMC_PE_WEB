interface CommentProps {
  comment: any;
  editingCommentId: number | null;
  setEditingCommentId: (id: number | null) => void;
  editingContent: string;
  setEditingContent: (content: string) => void;
  handleEditComment: (commentId: number) => void;
  handleDeleteComment: (commentId: number) => void;
}

export const Comment = ({
  comment,
  editingCommentId,
  setEditingCommentId,
  editingContent,
  setEditingContent,
  handleEditComment,
  handleDeleteComment,
}: CommentProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">
          {comment.author?.name || "익명"} • {new Date(comment.createdAt).toLocaleString()}
        </p>
        <div className="flex gap-4">
          {/* 수정 버튼 */}
          <button
            onClick={() => {
              setEditingCommentId(comment.id);
              setEditingContent(comment.content);
            }}
            className="text-yellow-400 hover:text-yellow-300 text-sm"
          >
            수정
          </button>
          {/* 삭제 버튼 */}
          <button
            onClick={() => handleDeleteComment(comment.id)}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 수정 중이면 input 보여주기 */}
      {editingCommentId === comment.id ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            className="bg-gray-700 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleEditComment(comment.id)}
            className="px-4 py-2 bg-pink-700 hover:bg-pink-800 rounded-lg transition"
          >
            저장
          </button>
          <button
            onClick={() => {
              setEditingCommentId(null);
              setEditingContent("");
            }}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition"
          >
            취소
          </button>
        </div>
      ) : (
        <p className="text-gray-200">{comment.content}</p>
      )}
    </div>
  );
};