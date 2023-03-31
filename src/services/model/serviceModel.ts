export interface GetServicesParam {
  condition: { state: number }
  pageNo: number
  pageSize: number
}

export interface ServiceItem {
  serviceName: string
  serviceId: string
}
export type GetServicesData = {
  items: ServiceItem[]
  total: number
}
