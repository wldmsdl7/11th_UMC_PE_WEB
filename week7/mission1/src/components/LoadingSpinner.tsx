export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div
        className="w-12 h-12 animate-spin rounded-full border-6 border-t-transparent border-gray-300"
        role="status"
      >
        <span className="sr-only">로딩 중 ...</span>
      </div>
    </div>
  );
}