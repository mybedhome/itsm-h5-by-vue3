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
const active = ref(0);
const activeView = computed(() => {
  return active.value === 0 ? Workbench : Statistics;
});

onMounted(() => {});
</script>
<script lang="ts">
export default { name: 'HomeView' };
</script>
<style scoped></style>
