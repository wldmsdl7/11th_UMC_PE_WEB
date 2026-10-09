import { tmdb } from "./tmdb";
import type { Movie, MovieResponse } from "../types/movie";
import type { Credit } from "../types/credit";

export const getMovies = async (category: string, page:number=1) => {
  const { data } = await tmdb.get<MovieResponse>(`/movie/${category}`, {
    params: { page },
  });

  return data;
}

export const getMovieData = async (movieId: string) => {
  const { data } = await tmdb.get<Movie>(
    `/movie/${movieId}?language=ko-KR`,
  );

  return data;
}

export const getCredit = async (movieId: string) => {
  const { data } = await tmdb.get<Credit>(
    `/movie/${movieId}/credits?language=ko-KR`,
  );

  return data;
}