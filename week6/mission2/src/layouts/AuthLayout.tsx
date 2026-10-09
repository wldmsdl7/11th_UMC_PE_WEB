import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

export default function AuthLayout() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen h-screen bg-linear-to-b from-zinc-900 to-black text-white">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-20 bg-linear-to-b from-zinc-900 to-black">
          <Navbar isOpen={() => setIsOpen(true)} />
        </header>

        <main className="flex-1 p-6 justify-center overflow-y-auto">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}