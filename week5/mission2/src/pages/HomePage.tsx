import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getMovies } from "../api/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const navigate = useNavigate();
  const { data: movies, isPending, isError } = useFetch(() => getMovies("popular", 1), []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [navigate]);

    if (isPending) {
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black">
          <LoadingSpinner />
        </div>
      );
    }
  if (isError || !movies?.results) 
    return (
        <div 
          className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black"
        >
          <p className="text-red-400 text-2xl font-semibold p-4">
            데이터를 불러오던 중 오류가 발생했습니다.
          </p>
        </div>
      )

  const topMovie = movies.results[0]; 
  const otherMovies = movies.results.slice(1, 6); 

  return (
    <div className="min-h-dvh bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-start p-8">
      {/* 헤더 */}
      <div className="w-full max-w-5xl text-center mt-8">
        <h1 className="text-4xl font-bold mb-2">🎬 WELCOME</h1>
        <p className="text-gray-300 text-lg">
          오늘도 인기 있는 영화를 만나보세요 !!
        </p>
      </div>

      {topMovie && (
        <div className="w-full max-w-5xl mt-8 flex flex-col">
          <h2 className="text-3xl font-bold mb-4 ">🔥 오늘의 BEST 영화 </h2>
          <MovieCard movie={topMovie} size={780} category="popular"/>
        </div>
      )}

      <div className="w-full max-w-5xl mt-12">
        <h3 className="text-xl font-semibold mb-4">오늘의 나머지 인기 영화도 만나보세요 ‼️</h3>

        {/**
         * FIXME: 이 Movie Card들 가운데 정렬하고 싶은데 아무리 해도 가운데 정렬이 되지 않늗다 ..
         */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {otherMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer flex items-center justify-center w-full h-full"
            >
              <div className="flex items-center justify-center w-full h-full">
                <MovieCard movie={movie} category="popular" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}