import type {
  OrderListData,
  OrderQueryCondition,
} from '@/services/model/orderModel';
import { getOrders } from '@/services/orders';
import { ref, unref, type Ref } from 'vue';

export function useOrderListLoad() {
  const loading = ref(false);
  const finished = ref(false);
  const data = ref<OrderListData>([]);
  const pagination = ref({
    pageNo: 1,
    pageSize: 10,
  });

  const fetchData = async (
    condition: OrderQueryCondition | Ref<OrderQueryCondition>
  ) => {
    const params = { condition: unref(condition), ...pagination.value };
    const { items = [], maxPage } = await getOrders(params);
    loading.value = false;
    data.value = items;
    if (pagination.value.pageNo < maxPage) {
      pagination.value.pageNo += 1;
    } else {
      finished.value = true;
    }
  };
  return { loading, finished, data, fetchData };
}
