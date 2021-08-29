import { AxiosResponse } from 'axios';

const MOVIE_ENPOINTS_GET_LIST = 'getList';

export type MovieGetListParams = {
  sort_by: 'release_date.desc';
  include_adult: boolean;
  include_video: boolean;
  page: 1;
};

export type BuildEndpointFunc<P> = {
  (params: P): Promise<AxiosResponse<any>>;
};

export type Endpoint = {
  [MOVIE_ENPOINTS_GET_LIST]: BuildEndpointFunc<MovieGetListParams>;
};
