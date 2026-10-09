import useGetLpList from "../hooks/queries/useGetLpList";
import LPCard from "../components/LPCard";
import type { ResponseLpListDTO } from "../types/lp";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from "react";
import clsx from "clsx";
import { PAGINATION_ORDER } from "../enums/common";

export default function HomePage() {

const [order, setOrder] = useState(PAGINATION_ORDER.desc);
  const { data, isPending, isError } = useGetLpList({
    limit: 9,
    order: order
  },);
  const lpList: ResponseLpListDTO["data"]["data"] = data?.data?.data ?? [];

  if(isPending){
    return <LoadingSpinner />
  }

  if(isError){
    return <ErrorMessage message="데이터를 불러오는 도중 에러가 발생했습니다."/>
  }

  return (
   <div className="min-h-dvh bg-linear-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-start p-8">
    <div className="w-full max-w-6xl text-center mt-8">
      <h1 className="text-5xl font-extrabold mb-3 tracking-wide">
        LP ARCHIVE
      </h1>
      <p className="text-gray-400 text-lg">
        클래식한 감성, 오늘도 회전하는 음악의 세계
      </p>
    </div>

    <div className="w-full max-w-6xl mt-16">
      <h3 className="text-2xl font-semibold mb-8 text-center">
        LP를 감상해보세요 🎶
      </h3>
      {/* 정렬 버튼 */}
        <div className="flex justify-end mb-6 lg:mr-32 mr-10">
          <div className="flex gap-3">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={clsx(
                "px-4 py-2 rounded-lg font-semibold transition",
                order === PAGINATION_ORDER.desc
                  ? "bg-pink-700 text-white"
                  : "bg-gray-700 text-black hover:bg-gray-500"
              )}
            >
              최신순
            </button>

            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={clsx(
                "px-4 py-2 rounded-lg font-semibold transition",
                order === PAGINATION_ORDER.asc
                  ? "bg-pink-700 text-white"
                  : "bg-gray-3700 text- hover:bg-gray-500"
              )}
            >
              오래된순
            </button>
          </div>
        </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
     {lpList.map((lp) => (
        <LPCard
          key={lp.id}
          id={lp.id}
          thumbnail={lp.thumbnail}
          title={lp.title}
          tags={lp.tags}
          likes={lp.likes}
          content = {lp.content}
        />
      ))}
    </div>
  </div>
</div>
  );
}
