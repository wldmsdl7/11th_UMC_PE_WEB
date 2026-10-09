import axios from 'axios';
import { useEffect, useState } from 'react'
import { type MovieResponse, type Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';

export default function MoviePage() {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect((): void => {
        const fetchMovies = async () : Promise<void> => {
            /** fetch로 데이터 불러오기
             * - fetch로 데이터를 불러오면 실질적인 데이터 값들은 response의 json에 저장된다.
             *   -> response.json으로 풀어줘야 한다.
             * - 불러올 때 마다 json을 푸는 과정이 귀찮다
             *   -> axios 라이브러리 사용
            */
           
            //  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
            //       headers: {
            //          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            //       },
            //   });
            //  console.log(response.json())
            
            const {data} = await axios.get<MovieResponse>('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                },
            });
            setMovies(data.results);
            
        };
        
        fetchMovies();
    }, []);

  return (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {movies.map((movie) => 
        <MovieCard key={movie.id} movie={movie} />
      )}
    </div>
  )
}
