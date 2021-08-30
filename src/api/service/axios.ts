import { Endpoint } from '@/typings';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: '958e8d6c6c49bcc9e0ae5aab01192167' },
});

export default (endpoints: any): Endpoint => {
  (Object.keys(endpoints) as Array<keyof typeof endpoints>).forEach((key) => {
    endpoints[key] = endpoints[key].bind(axiosInstance);
  });
  return endpoints;
};
