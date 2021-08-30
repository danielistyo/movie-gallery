import { Endpoint } from '@/typings';
import { AxiosInstance } from 'axios';

const endpoint: Endpoint = {
  getList(params) {
    return (this as unknown as AxiosInstance).get('/discover/movie', { params });
  },
  getGenres() {
    return (this as unknown as AxiosInstance).get('/genre/movie/list');
  },
  getDetail(id) {
    return (this as unknown as AxiosInstance).get(`/movie/${id}`);
  },
  searchMovie(params) {
    return (this as unknown as AxiosInstance).get(`search/movie`, { params });
  },
};

export default endpoint;
