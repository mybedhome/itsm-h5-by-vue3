<template>
  <div>
    <keep-alive><component :is="activeView"></component></keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">工作台</van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o">统计</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Workbench from './workbench/index.vue';
import Statistics from './statistics/index.vue';
import { pick } from 'radash';
const active = ref(0);
const activeView = computed(() => {
  return active.value === 0 ? Workbench : Statistics;
});

onMounted(() => {
  const fish = {
    name: 'Bass',
    weight: 8,
    source: 'lake',
    barckish: false,
    users: [{ name: 'rose', id: 1 }],
    order: {
      orderName: '电视剧',
      orderTitle: '第十九届',
    },
  };
  const f = pick(fish, ['barckish', 'source', 'users', 'order']);
  console.log('f', f.order.orderName);
});
</script>
<script lang="ts">
export default { name: 'HomeView' };
</script>
<style scoped></style>
