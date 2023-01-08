import { RouteName } from '@/router';
import { ref } from 'vue';
import { getServices } from '@/services/service';
import { getEngineUsers } from '@/services/orders';
import { OrderFilterKey, type Column } from '@/types/common';
import dayjs from 'dayjs';
import { ORDER_STATUS } from '@/constants';
import { useRoute } from 'vue-router';

function useOrderFilter() {
  const isDraftRoute = useRoute().name === RouteName.ORDERDRAFT;
  const prevMonth = dayjs().subtract(1, 'month');
  const columns = ref<Column[]>([
    { label: '服务', key: OrderFilterKey.SERVICE, data: [] },
    { label: '状态', key: OrderFilterKey.STATUS, data: ORDER_STATUS },
    { label: '发起人', key: OrderFilterKey.CREATOR, data: [] },
    {
      label: isDraftRoute ? '保存时间' : '发起时间',
      key: OrderFilterKey.CREATE_TIME,
      data: [prevMonth.toDate(), new Date()],
    },
  ]);

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

  if (isDraftRoute) {
    const filterColumn = columns.value.filter((column) =>
      [OrderFilterKey.SERVICE, OrderFilterKey.CREATE_TIME].includes(
        column.key as OrderFilterKey
      )
    );
    return { columns: ref(filterColumn) };
  } else {
    return {
      columns,
    };
  }
}

export { useOrderFilter };
