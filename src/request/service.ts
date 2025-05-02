import axios from 'axios'
import { ElMessageBox } from 'element-plus'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
})

service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code !== 200) {
      ElMessageBox({
        title: '请求异常',
        message: res.message,
        type: 'error',
      })
      return
    }

    return res.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
