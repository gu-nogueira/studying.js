import axios from 'axios';

export const api = axios.create({
  // baseURL can be just the route, because it is the same url
  baseURL: '/api',
});
