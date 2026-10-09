import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header>  
        <Navbar />
      </header>
      <main className="p-6">
        <Outlet />
      </main>
      <footer className="text-center text-sm text-gray-500 py-4">
        © 2025 Movie Jingni
      </footer>
    </div>
  )
}