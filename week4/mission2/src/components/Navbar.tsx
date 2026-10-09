import { NavLink } from "react-router-dom";

export default function Navbar() {

    const LINKS = [
        { to: '/', label: '홈'},
        { to: '/movies/popular', label: '인기 영화'},
        { to: '/movies/now_playing', label: '상영중'},
        { to: '/movies/top_rated', label: '평점높은'},
        { to: '/movies/upcoming', label: '개봉 예정'},
    ]
  return (
    <div className="flex gap-3 p-4 bg-gradient-to-b from-gray-900 to-black text-white">
            {LINKS.map(({ to, label }) => (
                <NavLink 
                    key={to} 
                    to={to} 
                    className={({ isActive }) =>
                        `px-3 py-2 rounded transition ${
                            isActive 
                                ? "bg-purple-600 text-white font-semibold" 
                                : "hover:bg-gray-700 hover:text-purple-300"
                        }`
                    }
                >
                    {label}
                </NavLink>
            ))}
        </div>
  )
}
