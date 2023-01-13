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
    <section
      :class="{
        'content-section': isWorkbenchRoute,
        'page-content-section': !isWorkbenchRoute,
      }"
      v-show="isShowContentSection"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :immediate-check="false"
        offset="50"
        @load="onLoad"
        finished-text="没有更多了"
      >
        <div>
          <div class="menu-block" v-if="isWorkbenchRoute">
            <van-grid :border="false" :icon-size="67">
              <van-grid-item
                v-for="{ icon, text, name } in menus"
                :key="text"
                :icon="icon"
                :text="text"
                :badge="text == '我的待办' ? count : ''"
                :badge-props="badgeProps"
                icon-prefix="workbench-menu-icon"
                @click="handleJump(name)"
              />
            </van-grid>
          </div>
          <ul class="filter-block" v-if="hasFilterParams">
            <li class="filter-header">
              <span>筛选条件：</span>
              <span
                ><van-icon name="close" size="18px" @click="handleFilterClear"
              /></span>
            </li>
            <li v-for="(item, index) in filterResult" :key="index">
              <span>{{ item.label }}: </span>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <OrderList :data="data" />
      </van-list>
      <OrderFilter
        ref="orderFilterRef"
        v-model:show="isShowOrderFilter"
        :columns="columns"
        @confirm="onConfirm"
      />
    </section>
  </div>
</template>

<script lang="ts">
export default { name: 'WorkbenchView' };
</script>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';
import OrderList from '../components/OrderList.vue';
import OrderFilter from '../components/OrderFilter.vue';
import createIcon from '@/assets/create.svg';
import todoIcon from '@/assets/todo.svg';
import draftIcon from '@/assets/draft.svg';
import { useOrderFilter } from '@/composables/useOrderFilter';
import type { OrderFilterConfirmEventParams } from '../components/OrderFilter';
import { useDebouncedRef } from '@/composables/useDebouncedRef';
import { useOrderListLoad } from '@/composables/useOrderListLoad';
import { getTotoItemTotal } from '@/services/orders';
import { RouteName } from '@/router';
import { useRouter } from 'vue-router';
type OrderFilterInstance = typeof OrderFilter;
type ActionButton = '筛选' | '取消';

const router = useRouter();
const props = defineProps(['isTodoRoute', 'isDraftRoute']);
const isWorkbenchRoute = !props.isDraftRoute && !props.isTodoRoute;

const menus = ref([
  {
    icon: createIcon,
    text: '新建工单',
    name: RouteName.ORDERSADD,
  },
  {
    icon: todoIcon,
    text: '我的待办',
    name: RouteName.ORDERTODO,
  },
  {
    icon: draftIcon,
    text: '草稿箱',
    name: RouteName.ORDERDRAFT,
  },
]);

const handleJump = (name: RouteName) => {
  router.push({ name });
};

const badgeProps = ref({
  showZero: false,
});
const count = ref(0);

(async () => {
  const total = await getTotoItemTotal();
  count.value = total;
})();

const isFocus = ref(false);
const isShowContentSection = computed(
  () => !isFocus.value || !!searchText.value
);

const { columns, filterResult, condition } = useOrderFilter({
  ...props,
  isWorkbenchRoute,
});
const { loading, finished, data, onLoad, isSearchMode } = useOrderListLoad(
  condition,
  props
);

onLoad();

const searchText = useDebouncedRef('', 500);

watch(searchText, () => {
  condition.value.serialNum = searchText.value;
});

const orderFilterRef = ref<OrderFilterInstance>(
  null as unknown as OrderFilterInstance
);
const handleFilterClear = () => {
  orderFilterRef.value?.clearState();
  filterResult.value = [];
};

const hasFilterParams = computed(() => filterResult.value.length > 0);

const onFocus = () => {
  isFocus.value = true;
  isSearchMode.value = true;
};

const isShowOrderFilter = ref(false);

const handleAction = async (action: ActionButton) => {
  if (action === '筛选') {
    isShowOrderFilter.value = true;
  } else {
    isSearchMode.value = false;
    searchText.value = '';
    isShowOrderFilter.value = false;
    isFocus.value = false;
  }
};

const onConfirm = (selected: OrderFilterConfirmEventParams) => {
  isShowOrderFilter.value = false;
  filterResult.value = selected;
};
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
.page-content-section {
  height: calc(100vh - 55px);
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
