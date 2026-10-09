import { useNavigate } from "react-router-dom";

import { FaBars, FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import useGetMyInfo from "../../hooks/queries/useGetUserInfo";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import { usePostLogout } from '../../hooks/mutations/usePostLogout';

interface NavbarProps {
    isOpen: () => void;
}


export default function Navbar({isOpen} : NavbarProps) {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const {mutate: logoutMutate} = usePostLogout();

    const {data, isFetching, isError} = useGetMyInfo({ enabled: !! accessToken});

    const handleLogout = async () => {
      logoutMutate();
    }

    if(isFetching) return <LoadingSpinner />
    if(isError) return <ErrorMessage message="사용자 정보를 불러오는 데 실패했습니다."/>

  return (
    <div className="flex items-center justify-between w-full p-4 bg-linear-to-b from-gray-900 to-black text-white">
        <div className="flex items-center gap-3">
            <button onClick={isOpen} className="flex items-center justify-center">
            <FaBars size={22} />
            </button>
            <h3 className="text-2xl font-extrabold text-pink-600">
            돌려 돌려 LP판
            </h3>
        </div>
        <div>
            {!accessToken&&(
                <>
                    <button
                        onClick={() => navigate("/login")} 
                        className="px-4 py-2 bg-black rounded-lg hover:text-pink-500 transition text-white"
                    >
                        로그인
                    </button>
                    <button
                        onClick={() => navigate("/signup")} 
                        className="px-4 py-2 bg-black rounded-lg hover:text-pink-500 transition text-white"
                    >
                        회원가입
                    </button>
                </>
            )}
            {accessToken && data?.data && (
                <div className="flex items-center p-4">
                    <div className="p-4">
                        <FaSearch />
                    </div>
                    <h3 className="flex flex-row">
                        <span className="font-extrabold">{data.data.name}</span>님 반갑습니다 !
                    </h3>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 font-extrabold bg-black rounded-lg hover:text-pink-500 transition text-white"
                    >
                        로그아웃
                    </button>
                </div>
            )}
        </div>
     </div>
  )
}
