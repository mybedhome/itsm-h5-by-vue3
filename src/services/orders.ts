import { http } from '@/utils/request';
export const getOrders = (id: number) => {
  console.log('请求参数', id);
  return http.get('/orders/_query', { params: { id } });
};
