import { Endpoint } from '@/typings';
import movie from './movie';
import axios from './service/axios';

const endpoints: Endpoint = {
  ...movie,
};

export default axios(endpoints);
