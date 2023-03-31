import type {
  OrderListData,
  OrderQueryCondition,
} from '@/services/model/orderModel'
import { getOrders } from '@/services/orders'
import { ref, unref, type Ref, watch } from 'vue'

export function useOrderListLoad(
  condition: Ref<OrderQueryCondition>,
  props: any
) {
  const loading = ref(false)
  const finished = ref(false)
  const data = ref<OrderListData>([])
  const isSearchMode = ref(false)
  const pagination = {
    pageNo: 1,
    pageSize: 10,
  }

  watch(
    condition,
    () => {
      console.log('condition change', condition.value)
      if (
        isSearchMode.value &&
        !condition.value.serialNum &&
        data.value.length > 0
      ) {
        return
      }
      pagination.pageNo = 1
      data.value = []
      // 将loading设置为true阻止van-list组件自动触发fetchData函数
      loading.value = true
      finished.value = false
      onLoad()
    },
    { deep: true }
  )

  const fetchData = async (
    params: {
      condition?: Ref<OrderQueryCondition>
      pageNo?: number
      pageSize?: number
    } = {}
  ) => {
    const requestParams = {
      condition: unref(params.condition || condition),
      pageNo: params.pageNo || pagination.pageNo,
      pageSize: params.pageSize || pagination.pageSize,
    }
    return await getOrders(requestParams)
  }

  const onLoad = async () => {
    const res = await fetchData()
    const { items = [], maxPage } = res.data
    loading.value = false
    data.value.push(...items)
    if (pagination.pageNo < maxPage) {
      pagination.pageNo += 1
    } else {
      finished.value = true
    }
  }

  return { loading, finished, data, isSearchMode, fetchData, onLoad }
}
