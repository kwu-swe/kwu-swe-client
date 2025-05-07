export default function TableLoading() {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-kw-brown border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-300 font-medium">처리 중...</span>
      </div>
    </div>
  );
}
