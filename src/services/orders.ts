import { http } from '@/utils/request';
import type { GetEngineUsersData } from './model/orderModel';
export const getOrders = (id: number) => {
  console.log('请求参数', id);
  return http.get('/orders/_query', { params: { id } });
};

export const getEngineUsers = () => {
  return http.get<GetEngineUsersData>('/orders/engineUsers');
};

export const getTotoItemTotal = () => {
  return http.get<number>('/orders/_countNoHandleOrderNum');
};
