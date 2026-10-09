import { Link } from "react-router-dom"

function HomeButton() {
  return (
    <>
     <Link
        to="/"
        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
      >
        홈으로 돌아가기
      </Link> 
    </>
  )
}

export default HomeButton
