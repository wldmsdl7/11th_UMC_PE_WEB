import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiOutlineLike } from "react-icons/ai";
import useGetLPDtail from "../hooks/queries/useGetLpDetail";
import type { ResponseLPDTO } from "../types/lp";
import { MdDeleteOutline, MdOutlineEdit, MdClose} from "react-icons/md";
import ErrorMessage from "../components/ErrorMessage";

export default function LPDetailPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const { data, isLoading, isError } = useGetLPDtail(Number(lpId));
  const lp: ResponseLPDTO = data?.data ?? null;
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;
  if (isError || !lp) return <ErrorMessage message="데이터를 불러올 수 없습니다."/>

  return (
    <div className="min-h-dvh bg-linear-to-b from-zinc-900 to-black text-white p-8 flex flex-col items-center gap-8">
      <button
        onClick={() => navigate(-1)}
        className="self-end text-gray-300 hover:text-white transition mb-4 flex items-center gap-2"
        title="이전"
      >
        <MdClose size={28} />
      </button>
      <div className="relative w-80 h-80 rounded-full bg-gray-700 overflow-hidden shadow-2xl flex items-center justify-center group">
        {lp.thumbnail && (
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full object-cover rounded-full"
          />
        )}
      <div className="absolute w-16 h-16 bg-white rounded-full z-10" />

      </div>

      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-md flex flex-col gap-4">
        <p className="text-gray-400 text-sm">
          작성자: {lp.author?.name || "알 수 없음"}
        </p>
        <p className="text-gray-200">{lp.content}</p>
      </div>

      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
          <MdOutlineEdit />
        </button>
        <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition">
          <MdDeleteOutline />
        </button>
        <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">
          <AiOutlineLike />
        </button>
      </div>
    </div>
  );
}