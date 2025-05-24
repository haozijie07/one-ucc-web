interface ICommonAxiosResponse<T> {
  code: number
  message: string
  data: T
}

interface IPageListData<T> {
  total: number
  data: T[]
}
