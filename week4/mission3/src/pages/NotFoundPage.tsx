import HomeButton from "../components/HomeButton";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">페이지를 찾을 수 없습니다.</p>
      <p className="text-gray-400 mb-10">못 찾겠다 꾀꼬리</p>
      <HomeButton />
    </main>
  )
}
