import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function HomeLayout() {

  const { accessToken } = useAuth();
  if(!accessToken){
    /**
     * replace : history가 남지 않음 
     * -> 뒤로가기를 눌렀을 때 뒤로가기가 실행 안 됨
     */
    return <Navigate to = {"/login"} replace/>
  }
  return (
    <div className="min-h-dvh bg-gray-900 text-white">
      <header>  
        <Navbar />
      </header>
      <main className="p-6 flex-grow">
        {/**
         * Outlet : children이 rendering 되는 부분
         */}
        <Outlet />
      </main>
      <footer className="text-center text-sm text-gray-500 py-4">
        © 2025 Movie Jingni
      </footer>
    </div>
  )
}