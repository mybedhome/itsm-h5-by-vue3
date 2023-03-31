export const ORDER_STATUS = [
  { text: '处理中', value: 1 },
  { text: '已完成', value: 2 },
  { text: '已撤销', value: 3 },
] as const

export type OrderStatusCollection = typeof ORDER_STATUS
export type OrderStatusItem = OrderStatusCollection[number]
