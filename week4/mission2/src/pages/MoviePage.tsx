import { useState } from 'react'
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { getMovies } from '../api/movie';
import HomeButton from '../components/HomeButton';
import useFetch from '../hooks/useFetch';

export default function MoviePage() {
  const [page, setPage] = useState(1);

  const { category }=useParams<{category: string}>();
  if(!category) return;

  const {data: movies, isPending, isError} = useFetch(()=> getMovies(category, page), [page, category])

  if(!movies){
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <p className="text-white text-2xl font-semibold p-4">
          해당 데이터가 존재하지 않습니다.
        </p>
        <HomeButton />
      </div>
    )
  }

  if(isError){
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <p className="text-red-400 text-2xl font-semibold p-4">
          에러가 발생했습니다.
        </p>
        <HomeButton />
      </div>
    )
  }

  /**
   * LoadingSpinner를 이 부분에 작성하면, 
   * 전체 페이지가 로딩됨 (모든 UI가 안 보임)
   */

  
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200">
      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-6 pt-8">
        {/* 이전 페이지 */}
        <button
          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold 
                     shadow-md hover:bg-purple-500 transition-colors 
                     disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev): number => prev - 1)}
        >
         {"< 이전"}
        </button>

        <span className="px-5 py-2 bg-gray-800 rounded-lg shadow font-medium text-gray-100 border border-gray-700">
          {page} 페이지
        </span>

        {/* 다음 페이지 */}
        <button
          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold 
                     shadow-md hover:bg-purple-500 transition-colors"
          onClick={() => setPage((prev): number => prev + 1)}
        >
          {"다음 >"}
        </button>
      </div>

      {/* 로딩 상태 */}
      {isPending ? (
        <div className="flex items-center justify-center h-[60vh]">
          <LoadingSpinner />
        </div>
      ) : (
        /* 영화 카드 그리드 */
        <div className="p-10 grid gap-6 
                        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                        lg:grid-cols-5 xl:grid-cols-6">
          {movies.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} category={category || "popular"} />
          ))}
        </div>
      )}
    </div>
    </>  
  )
}
