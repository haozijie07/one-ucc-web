import { createAxiosInstance } from './baseRequest'

export const axios = createAxiosInstance({
  timeout: 10000,
})
