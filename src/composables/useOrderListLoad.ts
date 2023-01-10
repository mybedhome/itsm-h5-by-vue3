import type {
  OrderListData,
  OrderQueryCondition,
} from '@/services/model/orderModel';
import { getOrders } from '@/services/orders';
import { ref, unref, type Ref, watch } from 'vue';

export function useOrderListLoad(condition: Ref<OrderQueryCondition>) {
  const loading = ref(false);
  const finished = ref(false);
  const data = ref<OrderListData>([]);

  const pagination = {
    pageNo: 1,
    pageSize: 10,
  };

  watch(condition, () => {
    pagination.pageNo = 1;
    data.value = [];
    // 将loading设置为true阻止van-list组件自动触发fetchData函数
    loading.value = true;
    finished.value = false;
    fetchData();
  });

  const fetchData = async () => {
    const params = { condition: unref(condition), ...pagination };
    const { items = [], maxPage } = await getOrders(params);
    loading.value = false;
    data.value.push(...items);
    if (pagination.pageNo < maxPage) {
      pagination.pageNo += 1;
    } else {
      finished.value = true;
    }
  };

  return { loading, finished, data, fetchData };
}
