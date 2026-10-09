import { NavLink } from "react-router-dom";
import noProfileImg from "../../assets/image.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-black/70 backdrop-blur-md border-r border-gray-800
                    flex flex-col items-center py-10 z-30 transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-2xl font-bold mb-12 tracking-wider text-gray-100">
          LP ARCHIVE
        </h2>
        <div className="absolute bottom-6 right-6 ">
            <NavLink
                to="/me"
                onClick={onClose}
                className=" flex items-center justify-center z-40"
                >
                <div className="relative w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600">
                    <img
                    src={noProfileImg}
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                </div>
            </NavLink>
        </div>
        <nav className="flex flex-col gap-4 w-full px-6">
         
        </nav>
      </aside>
    </>
  );
}