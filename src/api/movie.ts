import { Endpoint } from '@/typings';
import { AxiosInstance } from 'axios';

const endpoint: Endpoint = {
  getList(params) {
    return (this as unknown as AxiosInstance).get('/discover/movie', { params });
  },
};

export default endpoint;
