import type { SelectFilterItemValue } from '@/views/components/OrderFilter'

export interface EngineUserItem {
  id: string
  firstName: string
}
export type GetEngineUsersData = EngineUserItem[]

export interface User {
  userId: string
  userName: string
}
export interface OrderItem {
  id: string
  orderTitle: string
  flowName: string
  serialNum: string
  createUser: User
  orderStatus: number
  createTime: number
}
export type OrderListData = OrderItem[]
export type GetOrderQueryData = {
  items: OrderListData
  total: number
  maxPage: number
}

export interface OrderQueryCondition {
  createTimeRange: SelectFilterItemValue | undefined
  serviceId: SelectFilterItemValue | undefined
  orderStatus: SelectFilterItemValue | undefined
  createUserId: SelectFilterItemValue | undefined
  serialNum: SelectFilterItemValue | undefined
  flag: boolean
  isAccSystem: number
}
export interface GetOrderQueryParams {
  pageNo: number
  pageSize: number
  condition: OrderQueryCondition
}

export interface GetDraftOrderQueryParams {
  pageNo: number
  pageSize: number
  startDate: number
  endDate: number
  serviceId: string
  orderTitle: string
  serialNum: string
  key?: string
}

export interface DraftOrderItem {
  id: string
  createTime: number
  flowId: string // 实际显示的是工单流程名称
  orderTitle: string
  serviceId: string
  userId: string
  formData: string
}

export type DraftOrderListData = DraftOrderItem[]
