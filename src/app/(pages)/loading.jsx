export default function PageLoading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-92px)]">
      <div
        className="w-20 h-20 border-4 border-transparent text-blush-700 text-4xl animate-spin flex items-center justify-center border-t-blush-700 rounded-full"
      >
        <div
          className="w-16 h-16 border-4 border-transparent text-blush-400 text-2xl animate-spin flex items-center justify-center border-t-blush-400 rounded-full"
        ></div>
      </div>
    </div>
  )
}
