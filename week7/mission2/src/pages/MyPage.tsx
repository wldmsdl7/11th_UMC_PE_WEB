import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateMyInfo } from "../hooks/mutations/useUpdateMyInfo";
import useGetMyInfo from "../hooks/queries/useGetUserInfo";
import noProfileImg from "../assets/image.png";
import type { RequestMyInfoDTO } from '../types/auth';

export const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { data, isFetching, isError } = useGetMyInfo({ enabled: true });
  const { mutate: updateInfoMutate } = useUpdateMyInfo();

  const user = data?.data;

  // 로컬 편집 상태 초기화
  const startEditing = () => {
    if (!user) return;
    setName(user.name || "");
    setBio(user.bio || "");
    setAvatar(user.avatar || "");
    setIsEditing(true);
  };

  const handleSave = () => {
     const requestMyInfoData: RequestMyInfoDTO = { name, bio, avatar };
    updateInfoMutate(requestMyInfoData);
    setIsEditing(false);
  };

  const handleProfileImgClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (isFetching) return <p>로딩 중...</p>;
  if (isError || !user)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-gray-900 to-black">
        <p className="text-red-400 text-2xl font-semibold p-4">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );

  return (
    <div className="min-h-dvh bg-linear-to-b from-zinc-900 to-black flex flex-col items-center justify-start p-8 gap-10 text-white">
      {/* 프로필 영역 */}
      <section className="relative w-30 h-70 rounded-full flex flex-col items-center gap-4 mt-8">
        <div
          className="w-32 h-32 rounded-full overflow-hidden shadow-lg cursor-pointer"
          onClick={handleProfileImgClick}
        >
          <img
            src={avatar || noProfileImg}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>

        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-3xl font-bold text-white rounded px-2 w-full text-center"
          />
        ) : (
          <h1 className="text-3xl font-bold">{user.name}</h1>
        )}
        <p className="text-gray-300">{user.email}</p>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </section>

      {/* 자기소개 영역 */}
      <section className="mt-4 w-full max-w-xl p-4 bg-zinc-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">소개</h2>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="자기소개를 입력하세요"
            className="w-full p-2 rounded-lg text-gray-200 h-24"
          />
        ) : (
          <p className="text-gray-200">{user.bio || "자기소개가 없습니다."}</p>
        )}
      </section>

      {/* 버튼 영역 */}
      <div className="flex gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-pink-800 rounded-lg hover:bg-pink-900 transition text-white"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-white"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={startEditing}
              className="px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition text-white"
            >
              수정
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-pink-800 rounded-lg hover:bg-pink-900 transition text-white"
            >
              홈으로 돌아가기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;