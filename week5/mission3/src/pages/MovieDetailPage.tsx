
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import noProfileImg from "../assets/image.png";
import { getCredit, getMovieData } from '../api/movie';
import useFetch from '../hooks/useFetch';
import HomeButton from '../components/HomeButton';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  if(!movieId) return ;

  //TODO: Promise.all 로 변경하기 (fetcher에 넣기)
  const { data: movieData, isPending:isMoviePending, isError: isMovieError } = useFetch(() => getMovieData(movieId), [movieId]);
  const { data: credit, isPending: isCreditPending, isError: isCreditError } = useFetch(()=> getCredit(movieId), [movieId]);

  if (isMovieError || isCreditError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <p className="text-red-400 text-2xl font-semibold p-4">
          영화 정보를 불러오지 못했습니다.
        </p>
        <HomeButton />
       
      </div>
    );
  }

  if (isMoviePending || isCreditPending || !movieData || !credit) {
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
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
          className="rounded-lg shadow-lg w-full md:w-1/3"
        />

        <div className="flex-1 flex flex-col gap-4">
         <section className="flex items-center gap-2">
            <h1 className="text-4xl font-bold">{movieData.title}</h1>
            {movieData.adult ? (
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
            {movieData.release_date}
          </p>
          <p className="text-gray-300">{movieData.overview}</p>
          <p className="text-gray-400">
            평점: <span className="text-yellow-400 font-semibold">{movieData.vote_average}</span> / 10
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