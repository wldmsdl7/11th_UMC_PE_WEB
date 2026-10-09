export const LPcardSkeleton = ({ showMeta = true }: { showMeta?: boolean }) => {
  return (
    <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="bg-gray-700 w-full aspect-square" />
      {showMeta && (
        <div className="p-3">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>
      )}
    </div>
  );
};