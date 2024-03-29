import { AxiosResponse } from 'axios';

const MOVIE_ENPOINTS_GET_LIST = 'getList';
const MOVIE_ENDPOINTS_GET_GENRES = 'getGenres';
const MOVIE_ENDPOINTS_GET_DETAIL = 'getDetail';
const MOVIE_ENDPOINTS_SEARCH = 'searchMovie';

export type MovieDiscover = {
  sort_by?: 'release_date.desc' | 'popularity.desc';
  include_adult?: boolean;
  include_video?: boolean;
  page?: number;
};

export type BuildEndpointFunc<P, R> = {
  (params: P): Promise<AxiosResponse<R>>;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  genres?: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ResponseMovieDiscover = {
  page: number;
  results: Movie[];
};

export type Genre = { id: number; name: string };

export type ResponseGenre = {
  genres: Genre[];
};

export type ResponseDetailMovie = Movie & {
  overview: string;
  imdb_id: string;
};

export type Endpoint = {
  [MOVIE_ENPOINTS_GET_LIST]: (params: MovieDiscover) => Promise<AxiosResponse<ResponseMovieDiscover>>;
  [MOVIE_ENDPOINTS_GET_GENRES]: () => Promise<AxiosResponse<ResponseGenre>>;
  [MOVIE_ENDPOINTS_GET_DETAIL]: (id: number) => Promise<AxiosResponse<ResponseDetailMovie>>;
  [MOVIE_ENDPOINTS_SEARCH]: (
    params: MovieDiscover & { query: string },
  ) => Promise<AxiosResponse<ResponseMovieDiscover>>;
};
