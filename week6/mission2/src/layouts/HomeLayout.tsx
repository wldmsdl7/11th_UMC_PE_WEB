import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";


export default function HomeLayout() {

  const [isOpen, setIsOpen] = useState(false);
  const { accessToken } = useAuth();
  const location = useLocation();

   if (!accessToken) {
    alert("로그인이 필요합니다.");
    // 로그인 안되면 /login으로 이동하고 원래 페이지 정보 전달
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="h-dvh flex flex-col bg-linear-to-b from-zinc-900 to-black text-white overflow-hidden">
      <header className="shrink-0">
        <Navbar isOpen={() => setIsOpen(true)} />
      </header>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main className="flex-1 flex flex-col p-6 overflow-auto">
        <Outlet />
      </main>

      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  )
}