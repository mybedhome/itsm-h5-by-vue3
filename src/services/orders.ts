import { http } from '@/utils/request';
export const getOrders = async (id: number) => {
  console.log('请求参数', id);
  return http.post('/orders/_query', id);
};
