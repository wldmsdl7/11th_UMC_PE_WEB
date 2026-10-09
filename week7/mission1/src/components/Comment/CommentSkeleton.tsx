export const CommentSkeleton = ({ showMeta = true }: { showMeta?: boolean }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow animate-pulse flex flex-col gap-2">
        <div className="h-4 w-24 bg-gray-700 rounded" />
        <div className="h-4 w-3/4 bg-gray-700 rounded" />
    </div>
  );
};