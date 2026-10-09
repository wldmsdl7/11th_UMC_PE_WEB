
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Movie } from '../types/movie';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Credit } from '../types/credit';
import noProfileImg from "../assets/image.png";
import { tmdb } from '../api/tmdb';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credit, setCredit] = useState<Credit | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsPending(true);
      try {
        /**
         * Promise.all : 2가지 비동기 요청 한 번에 실행
         */
       const [movieResponse, creditResponse] = await Promise.all([
        tmdb.get<Movie>(
          `/movie/${movieId}?language=ko-KR`,
        ),
        tmdb.get<Credit>(
          `/movie/${movieId}/credits?language=ko-KR`,
        )
      ]);
        setMovie(movieResponse.data);
        setCredit(creditResponse.data);

      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

  }, [movieId]);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <span className="text-red-400 text-2xl font-semibold">
          영화 정보를 불러오지 못했습니다.
        </span>
      </div>
    );
  }

  if (isPending || !movie || !credit) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <LoadingSpinner />
      </div>
    );
  }

  const director = credit.crew.find((c) => c.job === "Director");
  const actors = credit.cast.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 p-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-full md:w-1/3"
        />

        <div className="flex-1 flex flex-col gap-4">
         <section className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            {movie.adult ? (
              <div className="bg-red-600 text-white font-bold px-2 py-1 rounded-md text-sm">
                19
              </div>
            ) : (
              <div className="bg-green-600 text-white font-bold px-2 py-1 rounded-md text-sm">
                전체 연령
              </div>
            )}
          </section>

          <p className="text-gray-400 font-bold">
            <span className="text-lg mr-2">
              개봉일자 |
            </span>
            {movie.release_date}
          </p>
          <p className="text-gray-300">{movie.overview}</p>
          <p className="text-gray-400">
            평점: <span className="text-yellow-400 font-semibold">{movie.vote_average}</span> / 10
          </p>

          {director && (
            <section className="flex items-center gap-4 mt-4">
              <img
                src={
                  director.profile_path
                    ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                    : noProfileImg
                }
                alt={director.name}
                className="w-20 h-28 object-cover rounded-md shadow"
              />
              <p className="text-gray-300">
                <span className="font-bold">감독:</span> {director.name}
              </p>
            </section>
          )}

          <section className="mt-6">
            <p className="font-bold mb-3 text-lg">주요 출연진</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {actors.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : noProfileImg
                    }
                    alt={actor.name}
                    className="w-24 h-36 object-cover rounded-md shadow mb-2"
                  />
                  <p className="text-sm font-semibold">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}