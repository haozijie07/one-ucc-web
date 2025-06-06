import { createAxiosInstance } from './baseRequest'

export const uccAxios = createAxiosInstance({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
})
