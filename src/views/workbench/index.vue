<template>
  <div>
    <section class="search-section">
      <TheSearch
        placeholder="请输入流水号或标题"
        v-model="searchText"
        @focus="onFocus"
        @action="handleAction"
      />
    </section>
    <section class="content-section">
      <div class="menu-block">
        <van-grid :border="false" :icon-size="67">
          <van-grid-item
            v-for="{ icon, text } in menus"
            :key="text"
            :icon="icon"
            :text="text"
            icon-prefix="workbench-menu-icon"
          />
        </van-grid>
      </div>
      <ul class="filter-block">
        <li class="filter-header">
          <span>筛选条件：</span>
          <span><van-icon name="close" size="18px" /></span>
        </li>
        <li v-for="(item, index) in filterData" :key="index">
          <span>{{ item.label }}: </span>
          <span>{{ item.name }}</span>
        </li>
        <!-- <li>
          <span>发起时间: </span>
          <span>2022-10-23到2023-01-06</span>
        </li> -->
      </ul>
      <OrderList />
      <OrderFilter
        v-model:show="isShowOrderFilter"
        :columns="columns"
        @confirm="onConfirm"
      />
    </section>
    <!-- <TheTabbar /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OrderList from '../components/OrderList.vue';
import OrderFilter, {
  type OrderFilterConfirmEventParams,
} from '../components/OrderFilter.vue';
import createIcon from '@/assets/create.svg';
import todoIcon from '@/assets/todo.svg';
import draftIcon from '@/assets/draft.svg';
import { getOrders } from '@/services/orders';
import { useOrderFilter } from '@/composables/useOrderFilter';

const searchText = ref('');
const menus = ref([
  {
    icon: createIcon,
    text: '新建工单',
  },
  {
    icon: todoIcon,
    text: '我的待办',
  },
  {
    icon: draftIcon,
    text: '草稿箱',
  },
]);

const filterData = ref<OrderFilterConfirmEventParams>([]);

const { columns } = useOrderFilter();

const onFocus = () => {
  console.log('focus2');
};

const isShowOrderFilter = ref(false);
const handleAction = (action: string) => {
  isShowOrderFilter.value = action === '筛选' ? true : false;
};

const onConfirm = (selected: OrderFilterConfirmEventParams) => {
  isShowOrderFilter.value = false;
  console.log('selected order', selected);
  filterData.value = selected;
};
</script>

<script lang="ts">
export default { name: 'WorkbenchView' };
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.search-section {
  display: flex;
  align-items: center;
  height: 55px;
}
.content-section {
  height: calc(100vh - 105px);
  overflow: auto;
}
.menu-block {
  background-color: #fff;
}

.filter-block {
  margin-top: 10px;
  padding: 10px 0 5px 15px;
  background-color: #fff;
  font-size: 15px;
  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5px;
    color: $primaryTextColor;
  }
  li {
    color: $secondaryTextColor;
    margin-bottom: 4px;
    padding-right: 40px;
  }
}
</style>
<style>
.workbench-menu-icon img {
  border-radius: 50%;
}
</style>
