import { RouteName } from '@/router';
import { computed, ref, watch, shallowRef } from 'vue';
import { getServices } from '@/services/service';
import { getEngineUsers } from '@/services/orders';
import { OrderFilterKey, type Column } from '@/types/common';
import dayjs from 'dayjs';
import { ORDER_STATUS } from '@/constants';
import { useRoute } from 'vue-router';
import type { OrderQueryCondition } from '@/services/model/orderModel';
import type { OrderFilterConfirmEventParams } from '@/views/components/OrderFilter';

function useOrderFilter(props: any) {
  console.log('props', props);
  const isDraftRoute = useRoute().name === RouteName.ORDERDRAFT;
  const columns = ref<Column[]>([
    { label: '服务', key: OrderFilterKey.SERVICE, data: [] },
    { label: '状态', key: OrderFilterKey.STATUS, data: ORDER_STATUS },
    { label: '发起人', key: OrderFilterKey.CREATOR, data: [] },
    {
      label: isDraftRoute ? '保存时间' : '发起时间',
      key: OrderFilterKey.CREATE_TIME,
      data: [],
    },
  ]);

  const defaultDate = [dayjs().subtract(1, 'month').toDate(), new Date()];
  // 默认过滤条件
  const filterResult = ref<OrderFilterConfirmEventParams>([
    {
      label: isDraftRoute ? '保存时间' : '发起时间',
      name: `${dayjs(defaultDate[0]).format('YYYY/MM/DD')} - ${dayjs(
        defaultDate[1]
      ).format('YYYY/MM/DD')}`,
      value: [defaultDate[0].getTime(), defaultDate[1].getTime()],
    },
  ]);

  const serviceFilterResult = computed(() => {
    return filterResult.value.find((item) => item.label === '服务');
  });
  const orderStatusFilterResult = computed(() => {
    return filterResult.value.find((item) => item.label === '状态');
  });
  const creatorFilterResult = computed(() => {
    return filterResult.value.find((item) => item.label === '发起人');
  });
  const timeFilterResult = computed(() => {
    return filterResult.value.find((item) =>
      ['发起时间', '保存时间'].includes(item.label)
    );
  });

  watch(filterResult, () => {
    condition.value = {
      ...condition.value,
      ...{
        serviceId: serviceFilterResult.value?.value,
        orderStatus: orderStatusFilterResult.value?.value,
        createUserId: creatorFilterResult.value?.value,
        createTimeRange: timeFilterResult.value?.value,
      },
    };
  });

  const condition = ref<OrderQueryCondition>({
    isAccSystem: 1,
    flag: true,
    serialNum: '',
    serviceId: '',
    orderStatus: props.isTodoRoute ? 1 : '',
    createUserId: '',
    createTimeRange: [defaultDate[0].getTime(), defaultDate[1].getTime()],
  });

  const initRequest = async () => {
    const services = await getServices({
      condition: { state: 1 },
      pageSize: 100000,
      pageNo: 1,
    });
    columns.value[0].data = services.items;
    const engineUsers = await getEngineUsers();
    columns.value[2].data = engineUsers;
  };
  initRequest();

  const expose = {
    columns,
    filterResult,
    condition,
  };
  if (isDraftRoute) {
    const filterColumn = columns.value.filter((column) =>
      [OrderFilterKey.SERVICE, OrderFilterKey.CREATE_TIME].includes(
        column.key as OrderFilterKey
      )
    );
    return { ...expose, columns: ref(filterColumn) };
  } else {
    return expose;
  }
}

export { useOrderFilter };
