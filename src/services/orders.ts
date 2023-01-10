import { http } from '@/utils/request';
import type {
  GetEngineUsersData,
  GetOrderQueryParams,
  GetOrderQueryData,
} from './model/orderModel';

export const getOrders = (params: GetOrderQueryParams) => {
  return http.post<GetOrderQueryData>('/orders/_query', params);
};

export const getEngineUsers = () => {
  return http.get<GetEngineUsersData>('/orders/engineUsers');
};

export const getTotoItemTotal = () => {
  return http.get<number>('/orders/_countNoHandleOrderNum');
};
