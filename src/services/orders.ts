import { http } from '@/utils/request'
import type {
  GetEngineUsersData,
  GetOrderQueryParams,
  GetOrderQueryData,
  GetDraftOrderQueryParams,
  DraftOrderListData,
} from './model/orderModel'

export const getOrders = (params: GetOrderQueryParams) => {
  return http.post<GetOrderQueryData>('/orders/_query', params)
}

export const getEngineUsers = <T = GetEngineUsersData>() => {
  return http.get<T>('/orders/engineUsers2')
}

export const getTotoItemTotal = () => {
  return http.get<number>('/orders/_countNoHandleOrderNum')
}

export const getDraftOrders = (params: GetDraftOrderQueryParams) => {
  return http.get<DraftOrderListData>('/drafts/query', { params })
}
