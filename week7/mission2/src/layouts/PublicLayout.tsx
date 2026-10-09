import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import Footer from "../components/Layout/Footer";

export default function PublicLayout() {
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