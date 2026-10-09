import { useEffect, useState } from "react";
import { getMyInfo } from "../api/auth";
import noProfileImg from "../assets/image.png";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";

export const MyPage = () => {
  const [data, setData] = useState<User | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response.data);
    };

    getData();
  }, []);

  if (!data) {
    return (
        <div 
          className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-gray-900 to-black"
        >
          <p className="text-red-400 text-2xl font-semibold p-4">
            데이터를 불러오던 중 오류가 발생했습니다.
          </p>
        </div>
      )
  }

  return (
    <div className="min-h-dvh bg-linear-to-b from-zinc-900 to-black flex flex-col items-center justify-start p-8 gap-10 text-white">
      <section className="relative w-30 h-50 rounded-full flex flex-col items-center gap-4 mt-8">
        <img
          src={noProfileImg} 
          alt="프로필 이미지"
          className="w-32 h-32 rounded-full object-cover shadow-lg"
        />
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-gray-300">{data.email}</p>
      </section>

      <section className="mt-4 w-full max-w-xl p-4 bg-zinc-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">소개</h2>
        <p className="text-gray-200">{data.bio || "자기소개가 없습니다."}</p>
      </section>

       <button 
        onClick={()=>{navigate("/")}}
        className="px-6 py-3 bg-pink-800 rounded-lg hover:bg-pink-900 transition text-white "
        >
        홈으로 돌아가기
        </button>
    </div>
  );
};

export default MyPage;