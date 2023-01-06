<template>
  <div>
    <div>
      <div class="search-block">
        <TheSearch
          placeholder="请输入流水号或标题"
          v-model="searchText"
          @focus="onFocus"
          @action="handleAction"
        />
      </div>
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
        <!-- <li>
          <span>服务: </span>
          <span>测试的服务</span>
        </li>
        <li>
          <span>状态: </span>
          <span>测试的服务</span>
        </li>
        <li>
          <span>发起人: </span>
          <span>测试的服务</span>
        </li> -->
        <li>
          <span>发起时间: </span>
          <span>2022-10-23到2023-01-06</span>
        </li>
      </ul>
    </div>
    <TheTabbar />
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/router/index';
import { ref } from 'vue';
import createIcon from '@/assets/create.svg';
import todoIcon from '@/assets/todo.svg';
import draftIcon from '@/assets/draft.svg';
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
const onFocus = () => {
  console.log('focus2');
};
const handleAction = (action: string) => {
  console.log('action', action);
};
</script>
<script lang="ts">
export default { name: 'WorkbenchView' };
</script>
<style scoped lang="scss">
.container {
  height: 800px;
  background-color: orange;
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
    color: #2e2f30;
  }
  li {
    color: #828283;
    margin-bottom: 4px;
  }
}
</style>
<style>
.workbench-menu-icon img {
  border-radius: 50%;
}
</style>
