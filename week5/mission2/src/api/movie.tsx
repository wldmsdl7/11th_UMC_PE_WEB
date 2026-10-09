
import type { Movie, MovieResponse } from "../types/movie";
import type { Credit } from "../types/credit";
import { tmdb } from "./axios";

export const getMovies = async (category: string, page:number=1) => {
  console.log("TMDB_KEY:", import.meta.env.VITE_TMDB_KEY);
  const { data } = await tmdb.get<MovieResponse>(`/movie/${category}`, {
    params: { page },
  });
  console.log("TMDB_KEY:", import.meta.env.VITE_TMDB_KEY);
  return data;
}

export const getMovieData = async (movieId: string) => {
  const { data } = await tmdb.get<Movie>(
    `/movie/${movieId}?language=ko-KR`,
  );
  console.log("TMDB_KEY:", import.meta.env.VITE_TMDB_KEY);
  return data;
}

export const getCredit = async (movieId: string) => {
  const { data } = await tmdb.get<Credit>(
    `/movie/${movieId}/credits?language=ko-KR`,
  );
  console.log("TMDB_KEY:", import.meta.env.VITE_TMDB_KEY);
  return data;
}