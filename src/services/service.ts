import { http } from '@/utils/request'
import type { GetServicesParam, GetServicesData } from './model/serviceModel'

export const getServices = (data: GetServicesParam) => {
  return http.post<GetServicesData>('/service/data/findPage', data)
}
