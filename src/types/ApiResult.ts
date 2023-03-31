export type ApiErrorResult = {
  message: string
  name: string
  data: any
}

export type ApiSuccessResult<D> = {
  statusCode: number
  success: boolean
  data: D
}
